import { wishlistModel } from "../repositories/wishlist.repository";
import { locationModel } from "../repositories/location.repository";

import {
  Wishlist,
  WishlistItem,
  WishlistWithItems,
  CreateWishlistRequest,
  UpdateWishlistRequest,
  CreateWishlistItemRequest,
  UpdateWishlistItemRequest,
  WishlistFilters,
  WishlistShareResponse
} from '../interfaces/wishlist.interface';

const createWishlist = async (userId: string, data: CreateWishlistRequest): Promise<Wishlist> => {
  const wishlistId = await wishlistModel.create(userId, data);
  const createdWishlist = await wishlistModel.findById(wishlistId);
  if (!createdWishlist) throw new Error('Wishlist not found after creation');
  return createdWishlist;
};

const getWishlistById = async (id: string, userId?: string): Promise<WishlistWithItems | null> => {
  const wishlist = await wishlistModel.findWithItems(id);
  if (!wishlist) return null;
  if (!wishlist.is_public && wishlist.user_id !== userId) return null;
  return wishlist;
};

const getUserWishlists = async (userId: string, filters: WishlistFilters = {}): Promise<Wishlist[]> => {
  return await wishlistModel.findByUserId(userId, filters);
};

const getPublicWishlists = async (filters: WishlistFilters = {}): Promise<Wishlist[]> => {
  return await wishlistModel.findPublic(filters);
};

const updateWishlist = async (id: string, userId: string, data: UpdateWishlistRequest): Promise<Wishlist | null> => {
  const wishlist = await wishlistModel.findById(id);
  if (!wishlist) return null;
  const hasOwnership = await wishlistModel.checkOwnership(id, userId);
  if (!hasOwnership) return null;
  await wishlistModel.update(id, data);
  return await wishlistModel.findById(id);
};

const deleteWishlist = async (id: string, userId: string): Promise<boolean> => {
  const wishlist = await wishlistModel.findById(id);
  if (!wishlist) return false;
  const hasOwnership = await wishlistModel.checkOwnership(id, userId);
  if (!hasOwnership) return false;
  return await wishlistModel.delete(id);
};

const addWishlistItem = async (
  wishlistId: string,
  userId: string,
  data: CreateWishlistItemRequest
): Promise<WishlistItem | null> => {
  const hasOwnership = await wishlistModel.checkOwnership(wishlistId, userId);
  if (!hasOwnership) return null;
  let locationId = data.location_id;

  if (!locationId && data.location) {
    const locationData = {
      name: data.location.name,
      country: data.location.country || null,
      region: data.location.region || null,
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      timezone: data.location.timezone || 'UTC',
    };

    try {
      locationId = await locationModel.create(locationData);

      if (locationModel.update) {
        await locationModel.update(locationId, locationData);
      }
    } catch (error) {
      // console.error("Failed to create location:", error);
      return null;
    }
  }

  if (!locationId) return null;

  const locationExists = await wishlistModel.checkLocationExists(locationId);
  if (!locationExists) return null;

  const isDuplicate = await wishlistModel.checkDuplicateItem(wishlistId, locationId);
  if (isDuplicate) return null;

  const itemId = await wishlistModel.createItem(wishlistId, { ...data, location_id: locationId });

  const createdItem = await wishlistModel.findItemById(itemId);
  if (!createdItem) throw new Error("Wishlist item not found after creation");

  return createdItem;
};

const updateWishlistItem = async (id: string, userId: string, data: UpdateWishlistItemRequest): Promise<WishlistItem | null> => {
  const item = await wishlistModel.findItemById(id);
  if (!item) return null;
  const hasOwnership = await wishlistModel.checkItemOwnership(id, userId);
  if (!hasOwnership) return null;
  await wishlistModel.updateItem(id, data);
  return await wishlistModel.findItemById(id);
};

const deleteWishlistItem = async (id: string, userId: string): Promise<boolean> => {
  const item = await wishlistModel.findItemById(id);
  if (!item) return false;
  const hasOwnership = await wishlistModel.checkItemOwnership(id, userId);
  if (!hasOwnership) return false;
  return await wishlistModel.deleteItem(id);
};

const shareWishlist = async (id: string, userId: string): Promise<WishlistShareResponse | null> => {
  const hasOwnership = await wishlistModel.checkOwnership(id, userId);
  if (!hasOwnership) return null;
  const wishlist = await wishlistModel.findById(id);
  if (!wishlist) return null;
  if (!wishlist.is_public) await wishlistModel.update(id, { is_public: true });

  const wishlistWithItems = await wishlistModel.findWithItems(id);
  if (!wishlistWithItems) return null;

  const shareUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/wishlists/shared/${id}`;

  return {
    share_url: shareUrl,
    wishlist: wishlistWithItems
  };
};

const getSharedWishlist = async (id: string): Promise<WishlistWithItems | null> => {
  const wishlist = await wishlistModel.findWithItems(id);
  if (!wishlist || !wishlist.is_public) return null;
  return wishlist;
};

export const WishlistService = {
  createWishlist,
  getWishlistById,
  getUserWishlists,
  getPublicWishlists,
  updateWishlist,
  deleteWishlist,
  addWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
  shareWishlist,
  getSharedWishlist
};


