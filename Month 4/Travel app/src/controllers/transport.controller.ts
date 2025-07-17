import { Request, Response } from 'express';
import { TransportService } from '../services/transport.service';
import { CreateTransportRequest, UpdateTransportRequest } from '../interfaces/transport.interface';
import { catchAsync } from '../utils/catchAsync.util';

const getTransportsByPost = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const transports = await TransportService.getTransportsByPost(postId);
  res.json({
    success: true,
    data: transports,
  });
});

const getTransportById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const transport = await TransportService.getTransportById(id);

  if (!transport) {
    return res.status(404).json({
      success: false,
      message: 'Transport not found',
    });
  }

  res.json({
    success: true,
    data: transport,
  });
});

const createTransport = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const transportData: CreateTransportRequest = req.body;
  const transport = await TransportService.createTransport(postId, transportData);

  res.status(201).json({
    success: true,
    data: transport,
    message: 'Transport created successfully',
  });
});

const updateTransport = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateTransportRequest = req.body;
  const userId = req.body.user_id;

  // if (!userId) {
  //   return res.status(401).json({
  //     success: false,
  //     message: 'User not authenticated',
  //   });
  // }

  const transport = await TransportService.updateTransport(id, updateData);

  if (!transport) {
    return res.status(404).json({
      success: false,
      message: 'Transport not found or unauthorized',
    });
  }

  res.json({
    success: true,
    data: transport,
    message: 'Transport updated successfully',
  });
});

const deleteTransport = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.user_id;

  // if (!userId) {
  //   return res.status(401).json({
  //     success: false,
  //     message: 'User not authenticated',
  //   });
  // }

  const success = await TransportService.deleteTransport(id);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: 'Transport not found or unauthorized',
    });
  }

  res.json({
    success: true,
    message: 'Transport deleted successfully',
  });
});

export const TransportController = {
  getTransportsByPost,
  getTransportById,
  createTransport,
  updateTransport,
  deleteTransport,
};
