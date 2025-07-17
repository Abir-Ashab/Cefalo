import { Request, Response } from 'express';
import { WishlistService } from '../services/wishlist.service';
import {
  CreateWishlistRequest,
  UpdateWishlistRequest,
  CreateWishlistItemRequest,
  UpdateWishlistItemRequest,
  WishlistFilters
} from '../interfaces/wishlist.interface';
import { catchAsync } from '../utils/catchAsync.util';

const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.user_id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const data: CreateWishlistRequest = req.body;
  if (!data.name || !data.grouping_type) {
    return res.status(400).json({ success: false, message: 'Name and grouping_type are required' });
  }

  const wishlist = await WishlistService.createWishlist(userId, data);
  res.status(201).json({ success: true, data: wishlist, message: 'Wishlist created successfully' });
});

const getWishlistById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = String(req.query.user_id);
  const wishlist = await WishlistService.getWishlistById(id, userId);
  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  if (!wishlist) {
    return res.status(404).json({ success: false, message: 'Wishlist not found' });
  }

  res.json({ success: true, data: wishlist });
});

const getUserWishlists = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.query.user_id);
  if (!userId || userId === 'undefined') {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  const filters: WishlistFilters = {
    grouping_type: req.query.grouping_type as any,
    is_public: req.query.is_public === 'true' ? true : req.query.is_public === 'false' ? false : undefined,
    search: req.query.search as string,
    limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    offset: req.query.offset ? parseInt(req.query.offset as string) : undefined
  };

  const wishlists = await WishlistService.getUserWishlists(userId, filters);
  res.json({ success: true, data: wishlists });
});

const getPublicWishlists = catchAsync(async (req: Request, res: Response) => {
  const filters: WishlistFilters = {
    grouping_type: req.query.grouping_type as any,
    search: req.query.search as string,
    limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    offset: req.query.offset ? parseInt(req.query.offset as string) : undefined
  };

  const wishlists = await WishlistService.getPublicWishlists(filters);
  res.json({ success: true, data: wishlists });
});

const updateWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.user_id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const data: UpdateWishlistRequest = req.body;
  const updatedWishlist = await WishlistService.updateWishlist(id, userId, data);

  if (!updatedWishlist) {
    return res.status(404).json({ success: false, message: 'Wishlist not found or unauthorized' });
  }

  res.json({ success: true, data: updatedWishlist, message: 'Wishlist updated successfully' });
});

const deleteWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.user_id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const deleted = await WishlistService.deleteWishlist(id, userId);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Wishlist not found or unauthorized' });
  }

  res.json({ success: true, message: 'Wishlist deleted successfully' });
});

const addWishlistItem = catchAsync(async (req: Request, res: Response) => {
  const { wishlistId } = req.params;
  const userId = req.body.user_id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const data: CreateWishlistItemRequest = req.body;
  if (!data.priority_level || (!data.location_id && !data.location)) {
    return res.status(400).json({ success: false, message: 'Priority level and location data are required' });
  }

  const item = await WishlistService.addWishlistItem(wishlistId, userId, data);
  if (!item) {
    return res.status(400).json({ success: false, message: 'Invalid location or duplicate entry' });
  }

  res.status(201).json({ success: true, data: item, message: 'Item added to wishlist successfully' });
});

const updateWishlistItem = catchAsync(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const userId = req.body.user_id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const data: UpdateWishlistItemRequest = req.body;
  const updatedItem = await WishlistService.updateWishlistItem(itemId, userId, data);

  if (!updatedItem) {
    return res.status(404).json({ success: false, message: 'Wishlist item not found or unauthorized' });
  }

  res.json({ success: true, data: updatedItem, message: 'Wishlist item updated successfully' });
});

const deleteWishlistItem = catchAsync(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const userId = req.body.user_id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const deleted = await WishlistService.deleteWishlistItem(itemId, userId);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Wishlist item not found or unauthorized' });
  }

  res.json({ success: true, message: 'Wishlist item deleted successfully' });
});

const shareWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.user_id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const shareData = await WishlistService.shareWishlist(id, userId);
  if (!shareData) {
    return res.status(400).json({ success: false, message: 'Unable to share wishlist' });
  }

  res.json({ success: true, data: shareData, message: 'Wishlist shared successfully' });
});

const getSharedWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const wishlist = await WishlistService.getSharedWishlist(id);

  if (!wishlist) {
    return res.status(404).json({ success: false, message: 'Shared wishlist not found or private' });
  }

  res.json({ success: true, data: wishlist });
});

export const WishlistController = {
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
