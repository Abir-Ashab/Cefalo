import { catchAsync } from '../utils/catchAsync.util';
import { UserServices } from "../services/user.services";

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: "Admin is created successfully!",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const { user_id, ...rest } = req.body;
  const result = await UserServices.updateUserStatus(user_id, rest);

  res.status(200).json({
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { user_id, ...rest } = req.body;
  const result = await UserServices.updateUser(user_id, rest);

  res.status(200).json({
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const user_id  = String(req.query.user_id);
  const result = await UserServices.getUserProfile(user_id);

  res.status(200).json({
    success: true,
    message: "User profile fetched successfully!",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { user_id } = req.body;
  await UserServices.deleteUser(user_id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
  });
});

const upgradeToTraveler = catchAsync(async (req, res) => {
  const { user_id } = req.body;
  const result = await UserServices.upgradeToTraveler(user_id);

  res.status(200).json({
    success: true,
    message: "User upgraded to traveler successfully!",
    data: result,
  });
});

export const userControllers = {
  createAdmin,
  updateUser,
  getUserProfile,
  deleteUser,
  upgradeToTraveler,
  updateUserStatus
};
