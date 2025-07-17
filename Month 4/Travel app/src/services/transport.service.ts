import { transportModel } from "../repositories/transport.repository"
import { postModel } from '../repositories/post.repository';
import {
  Transport,
  CreateTransportRequest,
  UpdateTransportRequest
} from '../interfaces/transport.interface';

const getTransportsByPost = async (postId: string): Promise<Transport[]> => {
  return await transportModel.findByPostId(postId);
};

const getTransportById = async (transportId: string): Promise<Transport | null> => {
  return await transportModel.findById(transportId);
};

const createTransport = async (
  postId: string,
  transportData: CreateTransportRequest
): Promise<Transport> => {
  
  const post = await postModel.findById(postId);

  const transportId = await transportModel.create({
    post_id: postId,
    ...transportData
  });

  const createdTransport = await transportModel.findById(transportId);
  if (!createdTransport) {
    throw new Error('Transport not found after creation');
  }
  
  return createdTransport;
};

const updateTransport = async (
  transportId: string,
  updateData: UpdateTransportRequest
): Promise<Transport | null> => {
  const transport = await transportModel.findById(transportId);
  if (!transport) {
    return null;
  }
  const post = await postModel.findById(transport.post_id);
  await transportModel.update(transportId, updateData);
  return await transportModel.findById(transportId);
};

const deleteTransport = async (transportId: string): Promise<boolean> => {
  const transport = await transportModel.findById(transportId);
  if (!transport) {
    return false;
  }
  const post = await postModel.findById(transport.post_id);
  return await transportModel.delete(transportId);
};

export const TransportService = {
  getTransportsByPost,
  getTransportById,
  createTransport,
  updateTransport,
  deleteTransport
};
