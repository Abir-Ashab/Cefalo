import express from "express";
import { authControllers } from "../controllers/auth.controller";
import { AuthValidations } from "../validations/auth.validation";
import validateRequest from "../middlewares/validateRequest";

const router = express.Router();

router.post("/register", validateRequest(AuthValidations.createUserValidation), authControllers.register);
router.post("/login", validateRequest(AuthValidations.loginValidation), authControllers.login);
router.get("/refresh-token", authControllers.refreshToken);

export const AuthRoutes = router;

