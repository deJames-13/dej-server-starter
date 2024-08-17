export const ALIASES = {
  ID: 'id',
  EDIT: 'edit',
  ROOT: '/',
  REGISTER: 'register',
  AUTHENTICATE: 'authenticate',
  LOGOUT: 'logout',
  RESTORE: 'restore',
  DELETED: 'deleted',
  DELETE: 'delete',
  FORCE_DELETE: 'forceDelete',
  EMAIL_OTP: 'emailOTP',
  CHANGE_PASSWORD: 'changePassword',
  RESTORE_PASSWORD: 'resetPassword',
  WITH_PASSWORD: '+password',
  WITHOUT_PASSWORD: '-password',
};

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  RETURNED: 'returned',
  REFUNDED: 'refunded',
};

export const INDICATORS = {
  FAILED: 'failed',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  DANGER: 'danger',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
  WHITE: 'white',
  BLACK: 'black',
};

export const FEATURES_URL = {
  // BEFORE STARTING A PROJECT, MAKE SURE TO DECLARE THIS OR CHANGE THE PRE DEFINED URLS
  USERS: '/users',
  PRODUCTS: '/products',
  CARTS: '/carts',
  ORDERS: '/orders',
  BRANDS: '/brands',
  CATEGORIES: '/categories',
  REVIEWS: '/reviews',
};

export const RESOURCES = {
  ALIASES,
  FEATURES_URL,
};
