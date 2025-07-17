import { Router } from 'express';
import { AttractionController } from "../controllers/attraction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { USER_Role } from "../interfaces/user.interface";
import { AttractionValidations } from "../validations/attraction.validation";
import validateRequest from "../middlewares/validateRequest";

const router = Router();

router.get(
    '/post/:postId',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    AttractionController.getAttractionsByPost
);

router.get(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    AttractionController.getAttractionById
);

router.post(
    '/post/:postId',
    validateRequest(AttractionValidations.createAttractionValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    AttractionController.createAttraction
);

router.put(
    '/:id',
    validateRequest(AttractionValidations.updateAttractionValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    AttractionController.updateAttraction
);

router.delete(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    AttractionController.deleteAttraction
);

export { router as attractionRoutes };