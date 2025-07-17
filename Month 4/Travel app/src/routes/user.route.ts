import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import validateRequest from "../middlewares/validateRequest";
import { USER_Role } from "../interfaces/user.interface";
import { userControllers } from "../controllers/user.controller";
import { UserValidations } from "../validations/user.validation";
import { PostController } from '../controllers/post.controller';

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(UserValidations.createAdminValidations),
  authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  userControllers.createAdmin
);


router.delete(
  "/account",
  authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  userControllers.deleteUser
);

router.put(
  "/upgrade",
  authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER),
  userControllers.upgradeToTraveler
);

router.get('/reports', authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN), PostController.getReports);
router.put('/reports/:reportId', PostController.resolveReport);
router.delete('/reports/:reportId', PostController.deleteReportedPost);

router.put(
  "/status",
  authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  userControllers.updateUserStatus
);

router.put(
  "/profile",
  validateRequest(UserValidations.updateUserProfileValidation),
  authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
  userControllers.updateUser
);

router.get(
  "/profile",
  authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER),
  userControllers.getUserProfile
);

router.delete(
  "/profile",
  authMiddleware(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  userControllers.deleteUser
);

export const UserRoutes = router;
