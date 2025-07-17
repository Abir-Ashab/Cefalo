import { TUser } from "../interfaces/user.interface";
import { userModel } from "../repositories/user.repository";
import { USER_Role } from "../interfaces/user.interface";

const createAdminIntoDB = async (payload: TUser) => {
  const admin = await userModel.create(payload);
  return admin;
};
const updateUserStatus = async (_id: string, payload: TUser) => {
  const user = await userModel.updateById(_id, payload);
  return user;
};

const updateUser = async (_id: string, payload: TUser) => {
  const user = await userModel.findById(_id);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.role === USER_Role.EXPLORER || user.role === USER_Role.TRAVELER) {
    const { status, ...rest } = payload;
    payload = rest as TUser;
  }
  const updatedUser = await userModel.updateById(_id, payload);
  return updatedUser;
};

const getUserProfile = async (userId: string) => {
  const user = await userModel.findById(userId);
  return user;
};

const deleteUser = async (userId: string) => {
  await userModel.deleteById(userId);
};

const upgradeToTraveler = async (userId: string) => {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  await userModel.updateById(userId, {
    role: USER_Role.TRAVELER,
  });

  return {
    ...user,
    role: USER_Role.TRAVELER,
  };
};

export const UserServices = {
  createAdminIntoDB,
  updateUser,
  getUserProfile,
  deleteUser,
  upgradeToTraveler,
  updateUserStatus
};
