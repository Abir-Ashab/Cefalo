import { Router } from 'express';
import { LocationController } from "../controllers/location.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { USER_Role } from "../interfaces/user.interface";   
import { LocationValidations } from "../validations/location.validation";
import validateRequest from "../middlewares/validateRequest";

const router = Router();

router.get('/', authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER), LocationController.getAllLocations);

router.get('/search', authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER), LocationController.searchLocations);

router.get('/:id', authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER), LocationController.getLocationById);

router.post('/', validateRequest(LocationValidations.createLocationValidation), authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER), LocationController.createLocation);

router.put('/:id', validateRequest(LocationValidations.updateLocationValidation), authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER), LocationController.updateLocation);

router.delete('/:id', authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER), LocationController.deleteLocation);

export { router as locationRoutes };