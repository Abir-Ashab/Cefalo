import { locationModel } from "../repositories/location.repository"
import {
  Location,
  CreateLocationRequest,
  UpdateLocationRequest
} from "../interfaces/location.interface"

interface GetAllLocationsOptions {
  page: number;
  limit: number;
  country?: string;
  region?: string;
}

const getAllLocations = async (options: GetAllLocationsOptions): Promise<Location[]> => {
  return await locationModel.findAll(options);
};

const searchLocations = async (query: string): Promise<Location[]> => {
  return await locationModel.search(query);
};

const getLocationById = async (locationId: string): Promise<Location | null> => {
  return await locationModel.findById(locationId);
};

const createLocation = async (locationData: CreateLocationRequest): Promise<Location> => {
  if (locationData.latitude < -90 || locationData.latitude > 90) {
    throw new Error('Latitude must be between -90 and 90');
  }
  
  if (locationData.longitude < -180 || locationData.longitude > 180) {
    throw new Error('Longitude must be between -180 and 180');
  }
  const existingLocation = await locationModel.findByNameAndCountry(
    locationData.name, 
    locationData.country
  );
  
  if (existingLocation) {
    throw new Error('Location with this name already exists in the specified country');
  }

  const locationId = await locationModel.create(locationData);

  const createdLocation = await locationModel.findById(locationId);
  if (!createdLocation) {
    throw new Error('Location not found after creation');
  }
  
  return createdLocation;
};

const updateLocation = async (
  locationId: string,
  updateData: UpdateLocationRequest
): Promise<Location | null> => {
  const location = await locationModel.findById(locationId);
  if (!location) {
    return null;
  }

  if (updateData.latitude !== undefined && (updateData.latitude < -90 || updateData.latitude > 90)) {
    throw new Error('Latitude must be between -90 and 90');
  }
  
  if (updateData.longitude !== undefined && (updateData.longitude < -180 || updateData.longitude > 180)) {
    throw new Error('Longitude must be between -180 and 180');
  }
  
  if (updateData.name || updateData.country) {
    const name = updateData.name || location.name;
    const country = updateData.country || location.country;
    
    const existingLocation = await locationModel.findByNameAndCountry(name, country);
    if (existingLocation && existingLocation.id !== locationId) {
      throw new Error('Location with this name already exists in the specified country');
    }
  }

  await locationModel.update(locationId, updateData);
  return await locationModel.findById(locationId);
};

const deleteLocation = async (locationId: string): Promise<boolean> => {
  const location = await locationModel.findById(locationId);
  if (!location) {
    return false;
  }

  return await locationModel.delete(locationId);
};

export const LocationService = {
  getAllLocations,
  searchLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
};
