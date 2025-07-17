import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { authMiddleware } from "../middlewares/auth.middleware";
import { USER_Role } from "../interfaces/user.interface";   
import { PostValidations } from "../validations/post.validation";
import validateRequest from "../middlewares/validateRequest";

const router = Router();

router.get(
    '/',
    validateRequest(PostValidations.postFiltersValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.getPosts
);

router.get(
    '/featured',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.getFeaturedPosts
);

router.get(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.getPostById
);

router.get(
    '/:id/details',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.getPostWithDetails
);

router.post(
    '/',
    validateRequest(PostValidations.createPostValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN,  USER_Role.TRAVELER),
    PostController.createPost
);

router.put(
    '/:id',
    validateRequest(PostValidations.updatePostValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN,  USER_Role.TRAVELER),
    PostController.updatePost
);

router.delete(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN,  USER_Role.TRAVELER),
    PostController.deletePost
);

router.post(
    '/:id/like',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.likePost
);

router.delete(
    '/:id/like',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.unlikePost
);

router.post(
    '/:id/save',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.savePost
);

router.delete(
    '/:id/save',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.unsavePost
);

router.post(
    '/:id/share',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.sharePost
);

router.get(
    '/user/my-posts',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.getUserPosts
);

router.get(
    '/user/liked-posts',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.getUserLikedPosts
);

router.get(
    '/user/saved-posts',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    PostController.getUserSavedPosts
);

router.post(
    '/:id/report',
    validateRequest(PostValidations.reportPostValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.TRAVELER),
    PostController.reportPost
);

router.patch(
    '/:id/feature',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN,  USER_Role.TRAVELER),
    PostController.toggleFeaturePost
);

export const createPostRoutes = router;
