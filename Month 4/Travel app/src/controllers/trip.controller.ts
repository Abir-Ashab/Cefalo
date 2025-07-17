import { Request, Response } from 'express';
import { TripService } from "../services/trip.service";
import {
    CreateTripRequest,
    UpdateTripRequest,
    InviteParticipantsRequest,
    SendMessageRequest,
    UpdateParticipantStatusRequest
} from "../interfaces/trip.interface";
import { catchAsync } from '../utils/catchAsync.util';

const createTrip = catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.user_id; 
    const tripData: CreateTripRequest = req.body;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    const trip = await TripService.createTrip(userId, tripData);

    res.status(201).json({
        success: true,
        data: trip,
        message: 'Trip created successfully'
    });
});

const getUserTrips = catchAsync(async (req: Request, res: Response) => {
    const userId = String(req.query.user_id); 
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!userId || userId === 'undefined') {
        return res.status(401).json({
        success: false,
        message: 'User not authenticated'
        });
    }

    const result = await TripService.getUserTrips(userId, page, limit);

    res.json({
        success: true,
        data: result
    });
});

const getTripById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = String(req.query.user_id); 

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    const trip = await TripService.getTripById(id, userId);

    if (!trip) {
        return res.status(404).json({
            success: false,
            message: 'Trip not found'
        });
    }

    res.json({
        success: true,
        data: trip
    });
});

const updateTrip = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id; 
    const updateData: UpdateTripRequest = req.body;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    const trip = await TripService.updateTrip(id, userId, updateData);

    if (!trip) {
        return res.status(404).json({
            success: false,
            message: 'Trip not found'
        });
    }

    res.json({
        success: true,
        data: trip,
        message: 'Trip updated successfully'
    });
});

const deleteTrip = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id; 

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    const success = await TripService.deleteTrip(id, userId);

    if (!success) {
        return res.status(404).json({
            success: false,
            message: 'Trip not found'
        });
    }

    res.json({
        success: true,
        message: 'Trip deleted successfully'
    });
});

const inviteParticipants = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id; 
    const inviteData: InviteParticipantsRequest = req.body;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    if (!inviteData.user_ids || !Array.isArray(inviteData.user_ids) || inviteData.user_ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'user_ids array is required and cannot be empty'
        });
    }

    await TripService.inviteParticipants(id, userId, inviteData);

    res.json({
        success: true,
        message: 'Participants invited successfully'
    });
});

const updateParticipantStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id; 
    const { status }: UpdateParticipantStatusRequest = req.body;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    if (!status || !['joined', 'declined'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Valid status (joined or declined) is required'
        });
    }

    const success = await TripService.updateParticipantStatus(id, userId, status);

    if (!success) {
        return res.status(404).json({
            success: false,
            message: 'Trip invitation not found'
        });
    }

    res.json({
        success: true,
        message: `Trip invitation ${status} successfully`
    });
});

const leaveTrip = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id; 

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    const success = await TripService.leaveTrip(id, userId);

    if (!success) {
        return res.status(404).json({
            success: false,
            message: 'Trip not found or user not a participant'
        });
    }

    res.json({
        success: true,
        message: 'Left trip successfully'
    });
});

const removeParticipant = catchAsync(async (req: Request, res: Response) => {
    const { id, participantId } = req.params;
    const userId = req.body.user_id; 

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    const success = await TripService.removeParticipant(id, userId, participantId);

    if (!success) {
        return res.status(404).json({
            success: false,
            message: 'Participant not found or cannot be removed'
        });
    }

    res.json({
        success: true,
        message: 'Participant removed successfully'
    });
});

const sendMessage = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user_id; 
    const messageData: SendMessageRequest = req.body;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    if (!messageData.message || !messageData.message.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Message content is required'
        });
    }

    const message = await TripService.sendMessage(id, userId, messageData);

    res.status(201).json({
        success: true,
        data: message,
        message: 'Message sent successfully'
    });
});

const getTripMessages = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = String(req.query.user_id); 
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
    const messages = await TripService.getTripMessages(id, userId, page, limit);
    res.json({
        success: true,
        data: messages
    });
});

const getUserInvites = catchAsync(async (req: Request, res: Response) => {
    const userId = String(req.query.user_id); 

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    const invites = await TripService.getUserInvites(userId);

    res.json({
        success: true,
        data: invites
    });
});

const getTripParticipants = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = String(req.query.user_id); 

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

    const participants = await TripService.getTripParticipants(id, userId);

    res.json({
        success: true,
        data: participants
    });
});

export const TripController = {
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