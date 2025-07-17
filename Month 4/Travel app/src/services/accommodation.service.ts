import { accommodationModel } from "../repositories/accommodation.repository"
import { postModel } from '../repositories/post.repository';
import {
  Accommodation,
  CreateAccommodationRequest,
  UpdateAccommodationRequest
} from "../interfaces/accommodation.interface"

const getAccommodationsByPost = async (postId: string): Promise<Accommodation[]> => {
  return await accommodationModel.findByPostId(postId);
};

const getAccommodationById = async (accommodationId: string): Promise<Accommodation | null> => {
  return await accommodationModel.findById(accommodationId);
};

const createAccommodation = async (
  postId: string,
  accommodationData: CreateAccommodationRequest
): Promise<Accommodation> => {
  if (accommodationData.rating < 1 || accommodationData.rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  const checkIn = new Date(accommodationData.check_in_date);
  const checkOut = new Date(accommodationData.check_out_date);
  
  if (checkOut <= checkIn) {
    throw new Error('Check-out date must be after check-in date');
  }

  const accommodationId = await accommodationModel.create({
    post_id: postId,
    ...accommodationData
  });

  const createdAccommodation = await accommodationModel.findById(accommodationId);
  if (!createdAccommodation) {
    throw new Error('Accommodation not found after creation');
  }
  
  return createdAccommodation;
};

const updateAccommodation = async (
  accommodationId: string,
  updateData: UpdateAccommodationRequest
): Promise<Accommodation | null> => {
  const accommodation = await accommodationModel.findById(accommodationId);
  if (!accommodation) {
    return null;
  }

  const post = await postModel.findById(accommodation.post_id);
  if (updateData.rating !== undefined && (updateData.rating < 1 || updateData.rating > 5)) {
    throw new Error('Rating must be between 1 and 5');
  }

  if (updateData.check_in_date && updateData.check_out_date) {
    const checkIn = new Date(updateData.check_in_date);
    const checkOut = new Date(updateData.check_out_date);
    
    if (checkOut <= checkIn) {
      throw new Error('Check-out date must be after check-in date');
    }
  }

  await accommodationModel.update(accommodationId, updateData);
  return await accommodationModel.findById(accommodationId);
};

const deleteAccommodation = async (accommodationId: string): Promise<boolean> => {
  const accommodation = await accommodationModel.findById(accommodationId);
  if (!accommodation) {
    return false;
  }
  const post = await postModel.findById(accommodation.post_id);
  return await accommodationModel.delete(accommodationId);
};

export const AccommodationService = {
  getAccommodationsByPost,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation
};
