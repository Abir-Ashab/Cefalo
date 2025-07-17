import { Router } from 'express';
import { ProximityController } from "../controllers/proximity.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { USER_Role } from "../interfaces/user.interface";
import { ProximityValidations } from "../validations/proximity.validation";
import validateRequest from "../middlewares/validateRequest";

const router = Router();

router.get(
    '/settings',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.getProximitySettings
);

router.post(
    '/settings',
    validateRequest(ProximityValidations.createProximitySettingsValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.createProximitySettings
);

router.put(
    '/settings',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.updateProximitySettings
);

router.put(
    '/location',
    validateRequest(ProximityValidations.updateLocationValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.updateUserLocation
);

router.get(
    '/location',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.getUserLocation
);

router.get(
    '/alerts',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.getProximityAlerts
);

router.get(
    '/alerts/history',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.getProximityHistory
);

router.delete(
    '/alerts/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.deleteProximityAlert
);

router.get(
    '/nearby/wishlists',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.getNearbyWishlistLocations
);

router.get(
    '/nearby/participants',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.getNearbyTripParticipants
);

router.get(
    '/nearby/posts',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.getNearbyFeaturedPosts
);

router.get(
    '/nearby/attractions',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.getNearbyAttractions
);

router.get(
    '/nearby/accommodations',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.getNearbyAccommodations
);

router.get(
    '/nearby/dining',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.getNearbyDining
);

router.post(
    '/process',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    ProximityController.processProximityAlerts
);

export { router as proximityRoutes };