export const ALIASES = {
  ID: 'id',
  EDIT: 'edit',
  ROOT: 'root',
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

export const FEATURES = {
  USERS: 'Users', // User, url = /users
};

export const FEATURES_URL = Object.keys(FEATURES).reduce((acc, key) => {
  acc[key] = `/${FEATURES[key].toLowerCase()}`;
  return acc;
}, {});

export const RESOURCES = {
  ALIASES,
  FEATURES,
  FEATURES_URL,
};
