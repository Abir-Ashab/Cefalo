import { Router } from 'express';
import { DiningController } from '../controllers/dining.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { USER_Role } from '../interfaces/user.interface';
import { DiningValidations } from '../validations/dining.validation';
import validateRequest from '../middlewares/validateRequest';

const router = Router();

router.get(
    '/post/:postId',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    DiningController.getDiningsByPost
);

router.get(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    DiningController.getDiningById
);

router.post(
    '/post/:postId',
    validateRequest(DiningValidations.createDiningValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    DiningController.createDining
);

router.put(
    '/:id',
    validateRequest(DiningValidations.updateDiningValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    DiningController.updateDining
);

router.delete(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    DiningController.deleteDining
);

export { router as diningRoutes };