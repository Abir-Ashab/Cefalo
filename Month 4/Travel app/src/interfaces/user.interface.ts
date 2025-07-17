export const USER_Role = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  EXPLORER: "explorer",
  TRAVELER: "traveler",
} as const;

export const USER_STATUS = {
  ACTIVE: "active",
  BLOCKED: "blocked",
} as const;

export type TUser = {
  name: string;
  role: typeof USER_Role[keyof typeof USER_Role];
  email: string;
  password: string;
  status: typeof USER_STATUS[keyof typeof USER_STATUS];
  passwordChangedAt?: Date;
};

