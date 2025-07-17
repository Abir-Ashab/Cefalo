import { Router } from 'express';
import { WishlistController } from '../controllers/wishlist.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { USER_Role } from '../interfaces/user.interface';
import { WishlistValidations } from '../validations/wishlist.validation';
import validateRequest from '../middlewares/validateRequest';

const router = Router();

router.post(
    '/',
    validateRequest(WishlistValidations.createWishlistValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    WishlistController.createWishlist
);

router.get(
    '/my-wishlists',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    WishlistController.getUserWishlists
);

router.get(
    '/public',
    WishlistController.getPublicWishlists
);

router.get(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    WishlistController.getWishlistById
);

router.put(
    '/:id',
    validateRequest(WishlistValidations.updateWishlistValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    WishlistController.updateWishlist
);

router.delete(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    WishlistController.deleteWishlist
);

router.post(
    '/:id/share',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    WishlistController.shareWishlist
);

router.get(
    '/shared/:id',
    WishlistController.getSharedWishlist
);

router.post(
    '/:wishlistId/items',
    validateRequest(WishlistValidations.createWishlistItemValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    WishlistController.addWishlistItem
);

router.put(
    '/items/:itemId',
    validateRequest(WishlistValidations.updateWishlistItemValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    WishlistController.updateWishlistItem
);

router.delete(
    '/items/:itemId',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    WishlistController.deleteWishlistItem
);

export { router as wishlistRoutes };
