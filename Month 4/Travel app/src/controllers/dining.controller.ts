import { Request, Response } from 'express';
import { DiningService } from '../services/dining.sevice';
import { CreateDiningRequest, UpdateDiningRequest } from '../interfaces/dining.interface';
import { catchAsync } from '../utils/catchAsync.util';
const getDiningsByPost = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const dinings = await DiningService.getDiningsByPost(postId);
  res.json({
    success: true,
    data: dinings,
  });
});

const getDiningById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const dining = await DiningService.getDiningById(id);

  if (!dining) {
    return res.status(404).json({
      success: false,
      message: 'Dining experience not found',
    });
  }

  res.json({
    success: true,
    data: dining,
  });
});

const createDining = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const diningData: CreateDiningRequest = req.body;
  const userId = req.body.user_id;
  const dining = await DiningService.createDining(postId, diningData);

  res.status(201).json({
    success: true,
    data: dining,
    message: 'Dining experience created successfully',
  });
});

const updateDining = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateDiningRequest = req.body;
  const userId = req.body.user_id;
  const dining = await DiningService.updateDining(id, updateData);

  if (!dining) {
    return res.status(404).json({
      success: false,
      message: 'Dining experience not found or unauthorized',
    });
  }

  res.json({
    success: true,
    data: dining,
    message: 'Dining experience updated successfully',
  });
});

const deleteDining = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.user_id;
  const success = await DiningService.deleteDining(id);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: 'Dining experience not found or unauthorized',
    });
  }

  res.json({
    success: true,
    message: 'Dining experience deleted successfully',
  });
});

export const DiningController = {
  getDiningsByPost,
  getDiningById,
  createDining,
  updateDining,
  deleteDining,
};
