import config from "../config";
import { catchAsync } from "../utils/catchAsync.util";
import { AuthServices } from "../services/auth.service";

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.register(req.body);
  res.status(200).json({
    success: true,
    message: "User registered successfully!",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthServices.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    // sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully!",
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { cookie } = req.headers;
  const refreshToken = cookie?.split("refreshToken=")[1];
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "No refresh token provided",
    });
  }

  const { accessToken } = await AuthServices.refreshToken(refreshToken);

  res.status(200).json({
    success: true,
    message: "Access token refreshed successfully!",
    data: {
      accessToken,
    },
  });
});

export const authControllers = {
  register,
  login,
  refreshToken,
};
