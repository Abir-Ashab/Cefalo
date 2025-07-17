import { attractionModel } from '../repositories/attraction.repository';
import { postModel } from '../repositories/post.repository';
import {
  Attraction,
  CreateAttractionRequest,
  UpdateAttractionRequest
} from '../interfaces/attraction.interface';

const getAttractionsByPost = async (postId: string): Promise<Attraction[]> => {
  return await attractionModel.findByPostId(postId);
};

const getAttractionById = async (attractionId: string): Promise<Attraction | null> => {
  return await attractionModel.findById(attractionId);
};

const createAttraction = async (
  postId: string,
  attractionData: CreateAttractionRequest
): Promise<Attraction> => {
  const post = await postModel.findById(postId);
  if (attractionData.rating < 1 || attractionData.rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  if (attractionData.time_spent_hours < 0) {
    throw new Error('Time spent must be a positive number');
  }

  const attractionId = await attractionModel.create({
    post_id: postId,
    ...attractionData
  });

  const createdAttraction = await attractionModel.findById(attractionId);
  if (!createdAttraction) {
    throw new Error('Attraction not found after creation');
  }
  
  return createdAttraction;
};

const updateAttraction = async (
  attractionId: string,
  updateData: UpdateAttractionRequest
): Promise<Attraction | null> => {
  const attraction = await attractionModel.findById(attractionId);
  if (!attraction) {
    return null;
  }

  const post = await postModel.findById(attraction.post_id);
  if (updateData.rating && (updateData.rating < 1 || updateData.rating > 5)) {
    throw new Error('Rating must be between 1 and 5');
  }

  if (updateData.time_spent_hours && updateData.time_spent_hours < 0) {
    throw new Error('Time spent must be a positive number');
  }

  await attractionModel.update(attractionId, updateData);
  return await attractionModel.findById(attractionId);
};

const deleteAttraction = async (attractionId: string): Promise<boolean> => {
  const attraction = await attractionModel.findById(attractionId);
  if (!attraction) {
    return false;
  }
  const post = await postModel.findById(attraction.post_id);
  return await attractionModel.delete(attractionId);
};

export const AttractionService = {
  getAttractionsByPost,
  getAttractionById,
  createAttraction,
  updateAttraction,
  deleteAttraction
};