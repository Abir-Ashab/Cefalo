import { Router } from 'express';
import { AccommodationController } from "../controllers/accommodation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { USER_Role } from "../interfaces/user.interface";
import { AccommodationValidations } from "../validations/accommodation.validation";
import validateRequest from "../middlewares/validateRequest";

const router = Router();

router.get(
    '/post/:postId',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    AccommodationController.getAccommodationsByPost
);

router.get(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    AccommodationController.getAccommodationById
);

router.post(
    '/post/:postId',
    validateRequest(AccommodationValidations.createAccommodationValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    AccommodationController.createAccommodation
);

router.put(
    '/:id',
    validateRequest(AccommodationValidations.updateAccommodationValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    AccommodationController.updateAccommodation
);

router.delete(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    AccommodationController.deleteAccommodation
);

export { router as accommodationRoutes };