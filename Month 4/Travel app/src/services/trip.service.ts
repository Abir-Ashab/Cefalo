import { tripModel } from "../repositories/trip.repository";
import {
  TravelPlan,
  TravelParticipant,
  Message,
  CreateTripRequest,
  UpdateTripRequest,
  InviteParticipantsRequest,
  SendMessageRequest,
  TripListResponse,
  TripDetailsResponse,
  InviteResponse
} from "../interfaces/trip.interface";

const createTrip = async (
  userId: string,
  tripData: CreateTripRequest
): Promise<TravelPlan> => {
  const startDate = new Date(tripData.start_date);
  const endDate = new Date(tripData.end_date);
  const today = new Date();
  
  if (startDate <= today) {
    throw new Error('Start date must be in the future');
  }
  
  if (endDate <= startDate) {
    throw new Error('End date must be after start date');
  }

  if (tripData.total_budget !== undefined && tripData.total_budget <= 0) {
    throw new Error('Total budget must be greater than 0');
  }

  if (tripData.max_participants !== undefined && tripData.max_participants < 1) {
    throw new Error('Maximum participants must be at least 1');
  }

  const planningStatus = await tripModel.getStatusByName('planning');
  if (!planningStatus) {
    throw new Error('Planning status not found');
  }

  const tripId = await tripModel.create({
    creator_id: userId,
    location_id: tripData.location_id,
    trip_name: tripData.trip_name,
    start_date: startDate,
    end_date: endDate,
    total_budget: tripData.total_budget,
    status_id: planningStatus.id,
    max_participants: tripData.max_participants
  });

  await tripModel.addParticipants(tripId, [userId]);
  await tripModel.updateParticipantStatus(tripId, userId, 'joined');
  await tripModel.updateParticipantRole(tripId, userId, 'creator');

  const createdTrip = await tripModel.findById(tripId);
  if (!createdTrip) {
    throw new Error('Trip not found after creation');
  }
  
  return createdTrip;
};

const getUserTrips = async (
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<TripListResponse> => {
  const result = await tripModel.findByUserId(userId, page, limit);
  
  return {
    trips: result.trips,
    total: result.total,
    page,
    limit
  };
};

const getTripById = async (
  tripId: string,
  userId: string
): Promise<TripDetailsResponse | null> => {
  const trip = await tripModel.findById(tripId);
  if (!trip) {
    return null;
  }

  const isParticipant = await tripModel.isUserParticipant(tripId, userId);
  if (!isParticipant) {
    throw new Error('Unauthorized access to trip');
  }

  const participants = await tripModel.getParticipants(tripId);
  const recentMessages = await tripModel.getMessages(tripId, 1, 10);

  return {
    ...trip,
    participants,
    recent_messages: recentMessages
  };
};

const updateTrip = async (
  tripId: string,
  userId: string,
  updateData: UpdateTripRequest
): Promise<TravelPlan | null> => {

  const isCreator = await tripModel.isUserCreator(tripId, userId);
  if (!isCreator) {
    throw new Error('Only trip creator can update trip details');
  }

  const trip = await tripModel.findById(tripId);
  if (!trip) {
    return null;
  }

  if (updateData.start_date || updateData.end_date) {
    const startDate = updateData.start_date ? new Date(updateData.start_date) : trip.start_date;
    const endDate = updateData.end_date ? new Date(updateData.end_date) : trip.end_date;
    
    if (endDate <= startDate) {
      throw new Error('End date must be after start date');
    }
  }

  if (updateData.total_budget !== undefined && updateData.total_budget <= 0) {
    throw new Error('Total budget must be greater than 0');
  }

  if (updateData.max_participants !== undefined && updateData.max_participants < 1) {
    throw new Error('Maximum participants must be at least 1');
  }

  if (updateData.max_participants !== undefined) {
    const currentCount = await tripModel.getParticipantCount(tripId);
    if (updateData.max_participants < currentCount) {
      throw new Error('Cannot reduce max participants below current participant count');
    }
  }

  await tripModel.update(tripId, updateData);
  return await tripModel.findById(tripId);
};

const deleteTrip = async (tripId: string, userId: string): Promise<boolean> => {
  const isCreator = await tripModel.isUserCreator(tripId, userId);
  if (!isCreator) {
    throw new Error('Only trip creator can delete the trip');
  }

  return await tripModel.delete(tripId);
};

const inviteParticipants = async (
  tripId: string,
  userId: string,
  inviteData: InviteParticipantsRequest
): Promise<void> => {
  const isCreator = await tripModel.isUserCreator(tripId, userId);
  if (!isCreator) {
    throw new Error('Only trip creator can invite participants');
  }

  const trip = await tripModel.findById(tripId);
  if (!trip) {
    throw new Error('Trip not found');
  }

  const currentCount = await tripModel.getParticipantCount(tripId);
  const newTotalCount = currentCount + inviteData.user_ids.length;
  
  if (newTotalCount > trip.max_participants) {
    throw new Error(`Cannot invite ${inviteData.user_ids.length} users. Would exceed maximum participants limit.`);
  }

  const existingParticipants = await tripModel.getParticipants(tripId);
  const existingUserIds = existingParticipants.map(p => p.user_id);
  const newUserIds = inviteData.user_ids.filter(id => !existingUserIds.includes(id));

  if (newUserIds.length === 0) {
    throw new Error('All specified users are already participants');
  }

  await tripModel.addParticipants(tripId, newUserIds);
};

const updateParticipantStatus = async (
  tripId: string,
  userId: string,
  status: 'joined' | 'declined'
): Promise<boolean> => {
  const isParticipant = await tripModel.isUserParticipant(tripId, userId);
  if (!isParticipant) {
    throw new Error('User is not invited to this trip');
  }

  return await tripModel.updateParticipantStatus(tripId, userId, status);
};

const leaveTrip = async (tripId: string, userId: string): Promise<boolean> => {
  const isCreator = await tripModel.isUserCreator(tripId, userId);
  if (isCreator) {
    throw new Error('Trip creator cannot leave the trip. Transfer ownership or delete the trip instead.');
  }

  return await tripModel.removeParticipant(tripId, userId);
};

const removeParticipant = async (
  tripId: string,
  creatorId: string,
  participantId: string
): Promise<boolean> => {
  const isCreator = await tripModel.isUserCreator(tripId, creatorId);
  if (!isCreator) {
    throw new Error('Only trip creator can remove participants');
  }
  const isParticipantCreator = await tripModel.isUserCreator(tripId, participantId);
  if (isParticipantCreator) {
    throw new Error('Cannot remove trip creator');
  }

  return await tripModel.removeParticipant(tripId, participantId);
};

const sendMessage = async (
  tripId: string,
  userId: string,
  messageData: SendMessageRequest
): Promise<Message> => {
  const isParticipant = await tripModel.isUserParticipant(tripId, userId);
  if (!isParticipant) {
    throw new Error('Only trip participants can send messages');
  }

  if (!messageData.message.trim()) {
    throw new Error('Message cannot be empty');
  }

  const messageId = await tripModel.createMessage({
    trip_plan_id: tripId,
    sender_id: userId,
    message: messageData.message.trim(),
    attachments: messageData.attachments || null
  });

  const messages = await tripModel.getMessages(tripId, 1, 1);
  return messages[0];
};

const getTripMessages = async (
  tripId: string,
  userId: string,
  page: number = 1,
  limit: number = 50
): Promise<Message[]> => {
  const isParticipant = await tripModel.isUserParticipant(tripId, userId);
  if (!isParticipant) {
    throw new Error('Only trip participants can view messages');
  }

  return await tripModel.getMessages(tripId, page, limit);
};

const getUserInvites = async (userId: string): Promise<InviteResponse[]> => {
  return await tripModel.getUserInvites(userId);
};

const getTripParticipants = async (
  tripId: string,
  userId: string
): Promise<TravelParticipant[]> => {
  const isParticipant = await tripModel.isUserParticipant(tripId, userId);
  if (!isParticipant) {
    throw new Error('Only trip participants can view participant list');
  }

  return await tripModel.getParticipants(tripId);
};

export const TripService = {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  inviteParticipants,
  updateParticipantStatus,
  leaveTrip,
  removeParticipant,
  sendMessage,
  getTripMessages,
  getUserInvites,
  getTripParticipants
};