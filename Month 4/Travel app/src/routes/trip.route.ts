import { Router } from 'express';
import { TripController } from "../controllers/trip.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { USER_Role } from "../interfaces/user.interface";
import { TripValidations } from "../validations/trip.validation";
import validateRequest from "../middlewares/validateRequest";

const router = Router();

router.post(
    '/',
    validateRequest(TripValidations.createTripValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.createTrip
);

router.get(
    '/my-trips',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.getUserTrips
);

router.get(
    '/invites',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.getUserInvites
);

router.get(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.getTripById
);

router.put(
    '/:id',
    validateRequest(TripValidations.updateTripValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.updateTrip
);

router.delete(
    '/:id',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.deleteTrip
);

router.post(
    '/:id/invite',
    validateRequest(TripValidations.inviteParticipantsValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.inviteParticipants
);

router.put(
    '/:id/status',
    validateRequest(TripValidations.updateParticipantStatusValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.updateParticipantStatus
);

router.delete(
    '/:id/leave',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.leaveTrip
);

router.delete(
    '/:id/participants/:participantId',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.removeParticipant
);

router.get(
    '/:id/participants',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.getTripParticipants
);

router.post(
    '/:id/messages',
    validateRequest(TripValidations.sendMessageValidation),
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.sendMessage
);

router.get(
    '/:id/messages',
    authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
    TripController.getTripMessages
);

export { router as tripRoutes };
