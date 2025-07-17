import { isPasswordMatched } from "../utils/auth.util";
import { USER_Role } from "../interfaces/user.interface";
import { TUser } from "../interfaces/user.interface";
import { TLoginUser } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";
import config from "../config";
import { userModel } from "../repositories/user.repository";

const register = async (payload: TUser): Promise<any> => {
  const email = payload.email;
  const user = await userModel.findByEmail(email);
  if (user) {
    throw new Error("User already exists");
  }
  payload.role = USER_Role.EXPLORER; // Default role for registration

  const newUser = await userModel.create(payload);

  return newUser;
};

const login = async (payload: TLoginUser) => {
  const email = payload.email;
  const user = await userModel.findByEmailWithPassword(email);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.status === "blocked") {
    throw new Error("User is blocked");
  }

  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Password not matched");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: parseInt(config.jwt_access_expires_in as string),
  });

  const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, {
    expiresIn: parseInt(config.jwt_refresh_expires_in as string),
  });

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<{ accessToken: string }> => {
  if (!token) {
    throw new Error("No refresh token provided");
  }

  try {
    const decoded = jwt.verify(token, config.jwt_refresh_secret as string);
    const { email, role } = decoded as { email: string; role: string };

    const newAccessToken = jwt.sign({ email, role }, config.jwt_access_secret as string, {
      expiresIn: parseInt(config.jwt_access_expires_in as string),
    });

    return { accessToken: newAccessToken };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const AuthServices = {
  register,
  login,
  refreshToken,
};
