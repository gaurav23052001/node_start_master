const userCommonExcludes = {
  is_deleted: 0,
  social_media_provider: 0,
  social_media_provider_id: 0,
  email_verification_otp: 0,
  email_verification_otp_created_time: 0,
  phone_verification_otp: 0,
  phone_verification_otp_created_time: 0,
  forgot_password_otp: 0,
  forgot_password_otp_created_time: 0,
  stripe_customer_id: 0,
  __v: 0,
};

export const USER_PROJECTION = {
  ALL: {},
  LOGIN: userCommonExcludes,
  DETAILS: { ...userCommonExcludes, ...{ password: 0} },
  LIST: { first_name: 1, last_name: 1, name: 1, email: 1, phone: 1, is_active: 1 },
  BASIC: { first_name: 1, last_name: 1, name: 1, email: 1 },
};