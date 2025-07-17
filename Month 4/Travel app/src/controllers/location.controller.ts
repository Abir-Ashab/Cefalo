import { Request, Response } from 'express';
import { LocationService } from "../services/location.service";
import { CreateLocationRequest, UpdateLocationRequest } from "../interfaces/location.interface";
import { catchAsync } from '../utils/catchAsync.util';

const getAllLocations = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, country, region } = req.query;
  
  const locations = await LocationService.getAllLocations({
    page: Number(page),
    limit: Number(limit),
    country: country as string,
    region: region as string
  });
  
  res.json({
    success: true,
    data: locations
  });
});

const searchLocations = catchAsync(async (req: Request, res: Response) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }
  
  const locations = await LocationService.searchLocations(q as string);
  
  res.json({
    success: true,
    data: locations
  });
});

const getLocationById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const location = await LocationService.getLocationById(id);

  if (!location) {
    return res.status(404).json({
      success: false,
      message: 'Location not found'
    });
  }

  res.json({
    success: true,
    data: location
  });
});

const createLocation = catchAsync(async (req: Request, res: Response) => {
  const locationData: CreateLocationRequest = req.body;

  const location = await LocationService.createLocation(locationData);

  res.status(201).json({
    success: true,
    data: location,
    message: 'Location created successfully'
  });
});

const updateLocation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateLocationRequest = req.body;

  const location = await LocationService.updateLocation(id, updateData);

  if (!location) {
    return res.status(404).json({
      success: false,
      message: 'Location not found'
    });
  }

  res.json({
    success: true,
    data: location,
    message: 'Location updated successfully'
  });
});

const deleteLocation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const success = await LocationService.deleteLocation(id);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: 'Location not found'
    });
  }

  res.json({
    success: true,
    message: 'Location deleted successfully'
  });
});

export const LocationController = {
  getAllLocations,
  searchLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
};
