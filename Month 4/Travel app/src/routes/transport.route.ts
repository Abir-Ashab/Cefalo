import { Router } from 'express';
import { TransportController } from "../controllers/transport.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { USER_Role } from "../interfaces/user.interface";
import { TransportValidations } from "../validations/transport.validation";
import validateRequest from "../middlewares/validateRequest";

const router = Router();

router.get(
    '/post/:postId',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TransportController.getTransportsByPost
);

router.get(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TransportController.getTransportById
);

router.post(
    '/post/:postId',
    validateRequest(TransportValidations.createTransportValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TransportController.createTransport
);

router.put(
    '/:id',
    validateRequest(TransportValidations.updateTransportValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TransportController.updateTransport
);

router.delete(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TransportController.deleteTransport
);

export { router as transportRoutes };