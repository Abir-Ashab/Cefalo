import { Request, Response } from 'express';
import { ProximityService } from "../services/proximity.service";
import {
  CreateProximitySettingsRequest,
  UpdateLocationRequest,
  GetProximityAlertsRequest
} from "../interfaces/proximity.interface";
import { catchAsync } from "../utils/catchAsync.util";

const getProximitySettings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.user_id; 
  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const settings = await ProximityService.getProximitySettings(userId);
  
  res.json({
    success: true,
    data: settings
  });
});

const createProximitySettings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.user_id;
  const settingsData: CreateProximitySettingsRequest = req.body;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const settings = await ProximityService.createProximitySettings(userId, settingsData);

  res.status(201).json({
    success: true,
    data: settings,
    message: 'Proximity settings created successfully'
  });
});

const updateProximitySettings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.user_id;
  const updateData: CreateProximitySettingsRequest = req.body;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const settings = await ProximityService.updateProximitySettings(userId, updateData);

  if (!settings) {
    return res.status(404).json({
      success: false,
      message: 'Proximity settings not found'
    });
  }

  res.json({
    success: true,
    data: settings,
    message: 'Proximity settings updated successfully'
  });
});

const updateUserLocation = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.user_id;
  const locationData: UpdateLocationRequest = req.body;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const location = await ProximityService.updateUserLocation(userId, locationData);

  ProximityService.processProximityAlerts(userId).catch(console.error);

  res.json({
    success: true,
    data: location,
    message: 'Location updated successfully'
  });
});

const getUserLocation = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.query.user_id);
  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const location = await ProximityService.getUserLocation(userId);

  if (!location) {
    return res.status(404).json({
      success: false,
      message: 'User location not found'
    });
  }

  res.json({
    success: true,
    data: location
  });
});

const getProximityAlerts = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.query.user_id);
    if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  const queryParams: GetProximityAlertsRequest = req.query;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const alerts = await ProximityService.getProximityAlerts(userId, queryParams);

  res.json({
    success: true,
    data: alerts
  });
});

const getProximityHistory = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.user_id;
  const { limit = 50, offset = 0 } = req.query;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const history = await ProximityService.getProximityHistory(userId, Number(limit), Number(offset));

  res.json({
    success: true,
    data: history
  });
});

const deleteProximityAlert = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.user_id;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const success = await ProximityService.deleteProximityAlert(id, userId);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: 'Proximity alert not found or unauthorized'
    });
  }

  res.json({
    success: true,
    message: 'Proximity alert deleted successfully'
  });
});

const getNearbyWishlistLocations = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.query.user_id);
  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const nearbyItems = await ProximityService.getNearbyWishlistLocations(userId);

  res.json({
    success: true,
    data: nearbyItems
  });
});

const getNearbyTripParticipants = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.query.user_id);
    if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const nearbyParticipants = await ProximityService.getNearbyTripParticipants(userId);

  res.json({
    success: true,
    data: nearbyParticipants
  });
});

const getNearbyFeaturedPosts = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.query.user_id);
    if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const nearbyPosts = await ProximityService.getNearbyFeaturedPosts(userId);

  res.json({
    success: true,
    data: nearbyPosts
  });
});

const getNearbyAttractions = catchAsync(async (req: Request, res: Response) => {
  let userId = String(req.query.user_id);
  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const nearbyAttractions = await ProximityService.getNearbyAttractions(userId);

  res.json({
    success: true,
    data: nearbyAttractions
  });
});

const getNearbyAccommodations = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.query.user_id);
    if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const nearbyAccommodations = await ProximityService.getNearbyAccommodations(userId);

  res.json({
    success: true,
    data: nearbyAccommodations
  });
});

const getNearbyDining = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.query.user_id);
    if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  const nearbyDining = await ProximityService.getNearbyDining(userId);

  res.json({
    success: true,
    data: nearbyDining
  });
});

const processProximityAlerts = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.user_id;

  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  await ProximityService.processProximityAlerts(userId);

  res.json({
    success: true,
    message: 'Proximity alerts processed successfully'
  });
});

export const ProximityController = {
  getProximitySettings,
  createProximitySettings,
  updateProximitySettings,
  updateUserLocation,
  getUserLocation,
  getProximityAlerts,
  getProximityHistory,
  deleteProximityAlert,
  getNearbyWishlistLocations,
  getNearbyTripParticipants,
  getNearbyFeaturedPosts,
  getNearbyAttractions,
  getNearbyAccommodations,
  getNearbyDining,
  processProximityAlerts
};