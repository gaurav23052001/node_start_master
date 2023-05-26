export const APP_CONSTANTS = {
  API_VERSION: '/v1',
};

export const PAGINATION = {
  PAGE_SIZE: 20,
  INITIAL_PAGE: 1,
}

export const BULK_ACTIONS = {
  ACTIVATE: 'activate',
  DEACTIVATE: 'deactivate',
  DELETE: 'delete',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  AUTHOR: 'authOr',
  PUBLIC: 'public',
};

export const NUMBERS = {
  ONE: 1,
  EIGHT: 8,
  SIXTEEN: 16,
  ZERO: 0,
  TWENTY: 20,
  THOUSAND: 1000,
  TWO: 2,
  HUNDRED: 100,
};

export const SOCIAL_MEDIA = {
  PROVIDERS: {
    FACEBOOK: 'facebook',
    GOOGLE: 'google',
    TWITTER: 'twitter',
  },
  FACEBOOK_GRAPH_URL: process.env.FACEBOOK_GRAPH_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
};

export const GENDER_TYPES = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};

export const MARITAL_STATUS = {
  SINGLE: 'Single',
  MARRIED: 'Married',
  WIDOWED: 'Widowed',
  SEPARATED: 'Separated',
  DIVORCED: 'Divorced',
};

export const EXPIRATION_TIME = {
  FORGOT_PASSWORD: '60', // minutes
  EMAIL_VERIFICATION_OTP: '60', // minutes
  PHONE_VERIFICATION_OTP: '60', // minutes
};
