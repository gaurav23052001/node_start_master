import {
  saveUser,
  getUser,
  getUserById,
  isUserExist,
  updateUser
} from '../dao';
import validationMessages from '../messages/validationMessages';
import responseMessages from '../messages/responseMessages';
import {
  UN_PROCESSABLE_ENTITY,
  NOT_FOUND,
  UNAUTHORIZED,
  USER_PROJECTION,
  BAD_REQUEST,
  SOCIAL_MEDIA,
  EXPIRATION_TIME,
} from '../constants';
import {
  currentUTCDateTime,
  generateOTP,
  generatePasswordHash,
  createJWT,
  comparePasswordHash,
  isOTPExpired,
  CustomError,
  sendRegistrationEmail,
  sendForgotPasswordEmail,
  sendResetPasswordEmail,
  sendEmailVerificationOTPEmail,
} from '../utils';

export const userRegister = async (requestData) => {
  const userData = {
    email: requestData.email.toLowerCase(),
    name: requestData.name,
    phone: requestData.phone,
  };
  const currentDateTime = currentUTCDateTime();

  // Check is email already exists
  const isEmailExists = await isUserExist({ email: userData.email });
  if (isEmailExists) {
    throw new CustomError(validationMessages.EMAIL_ALREADY_EXISTS, UN_PROCESSABLE_ENTITY);
  }

  // Check is phone already exists
  // const isPhoneExists = await isUserExist({ phone: userData.phone });
  // if (isPhoneExists) {
  //   throw new CustomError(validationMessages.PHONE_ALREADY_EXISTS, UN_PROCESSABLE_ENTITY);
  // }

  // Generate phone verification OTP
  userData.phone_verification_otp = await generateOTP();
  userData.phone_verification_otp_created_time = currentDateTime;

  // Generate email verification OTP
  userData.email_verification_otp = await generateOTP();
  userData.email_verification_otp_created_time = currentDateTime;

  // Password set true
  userData.has_password_set = true;

  // Generate password
  userData.password = await generatePasswordHash(requestData.password);

  // Save user details
  const user = await saveUser(userData);

  // Get details
  const userDetails = await getUserById(user._id, USER_PROJECTION.DETAILS);

  // Generate and set JWT auth token
  const token = await createJWT({ email: userDetails.email, _id: userDetails._id });

  // Send email verification token
  sendRegistrationEmail(userDetails);

  // Send OTP on mobile
  // smsUtils.sendOTP(userDetails);

  // Return response
  return {
    status: true,
    message: responseMessages.USER_REGISTERED_SUCCESSFULLY,
    token,
    data: userDetails,
  };
};

export const userLogin = async (requestData) => {
  requestData.email = requestData.email.toLowerCase();
  const { email, password } = requestData;

  const user = await getUser({ email }, USER_PROJECTION.LOGIN);
  if (!user) {
    throw new CustomError(validationMessages.INVALID_LOGIN_CREDENTIALS, UNAUTHORIZED);
  }

  // Check is user inactive
  if (user.is_active === false) {
    throw new CustomError(validationMessages.ACCOUNT_INACTIVE, UNAUTHORIZED);
  }

  // Check password
  const passwordHash = await comparePasswordHash(password, user.password);
  if (!passwordHash) {
    throw new CustomError(validationMessages.INVALID_LOGIN_CREDENTIALS, UNAUTHORIZED);
  }

  // Generate and set JWT auth token
  const token = await createJWT({ email: user.email, _id: user._id });

  // remove password key
  delete user['password'];

  return {
    status: true,
    message: responseMessages.OK,
    token,
    data: user,
  };
};

export const userForgotPassword = async (requestData) => {
  requestData.email = requestData.email.toLowerCase();
  const { email } = requestData;
  const currentDateTime = currentUTCDateTime();

  const user = await getUser({ email }, USER_PROJECTION.DETAILS)
  if (!user) {
    throw new CustomError(validationMessages.EMAIL_NOT_FOUND, NOT_FOUND);
  }

  // Generate forgot password OTP
  const updatedData = {
    forgot_password_otp: await generateOTP(),
    forgot_password_otp_created_time: currentDateTime,
  }

  // Save user details
  await updateUser(user._id, updatedData);

  // Send forgot password email
  user.forgot_password_otp = updatedData.forgot_password_otp;
  sendForgotPasswordEmail(user);

  const response = {
    status: true,
    message: responseMessages.FORGOT_PASSWORD_OTP_SENT
  };

  // For testing purpose only
  if (process.env.NODE_ENV === 'test') {
    response.otp = user.forgot_password_otp;
  }

  return response;
};

export const userResetPassword = async (requestData) => {
  const { email, forgot_password_otp, password } = requestData;
  const user = await getUser({ email }, USER_PROJECTION.ALL);

  // validate user
  if (!user) {
    throw new CustomError(validationMessages.EMAIL_NOT_FOUND, NOT_FOUND);
  }

  // Validate forgot password OTP
  if (forgot_password_otp !== user.forgot_password_otp) {
    throw new CustomError(validationMessages.FORGOT_PASSWORD_OTP_INVALID, BAD_REQUEST);
  }

  // Check expiry
  const hasOTPExpired = await isOTPExpired(user.forgot_password_otp_created_time, EXPIRATION_TIME.FORGOT_PASSWORD);
  if (hasOTPExpired) {
    throw new CustomError(validationMessages.FORGOT_PASSWORD_OTP_EXPIRED, BAD_REQUEST);
  }

  // Generate password and reset forgot password OTP
  const updatedData = {
    forgot_password_otp: null,
    forgot_password_otp_created_time: null,
    password: await generatePasswordHash(password),
  }

  // Save user details
  await updateUser(user._id, updatedData);

  // Send reset password email
  sendResetPasswordEmail(user);

  return {
    status: true,
    message: responseMessages.PASSWORD_RESET_SUCCESS,
  };
};

export const sendEmailVerificationOTP = async (requestData) => {
  const email = requestData.email.toLowerCase();
  const currentDateTime = currentUTCDateTime();

  const user = await getUser({ email }, USER_PROJECTION.ALL);
  // Validate user
  if (!user) {
    throw new CustomError(validationMessages.EMAIL_NOT_FOUND, NOT_FOUND);
  }

  // Generate email verification OTP
  const updatedData = {
    email_verification_otp: await generateOTP(),
    email_verification_otp_created_time: currentDateTime,
  }

  // Update user details
  await updateUser(user._id, updatedData);

  // Send email verification OTP email
  user.email_verification_otp = updatedData.email_verification_otp;
  sendEmailVerificationOTPEmail(user);

  const response = {
    status: true,
    message: responseMessages.EMAIL_VERIFICATION_OTP_SENT
  };

  // For testing purpose only
  if (process.env.NODE_ENV === 'test') {
    response.otp = updatedData.email_verification_otp;
  }

  return response;
};

export const userEmailVerification = async (requestData) => {
  const { email, otp } = requestData;
  const user = await getUser({ email }, USER_PROJECTION.ALL);

  // Validate user with the email
  if (!user) {
    throw new CustomError(validationMessages.EMAIL_NOT_FOUND, NOT_FOUND);
  }

  // Validate OTP
  if (otp !== user.email_verification_otp) {
    throw new CustomError(validationMessages.EMAIL_VERIFICATION_OTP_INVALID, BAD_REQUEST);
  }

  // Check OTP expiry
  const hasOTPExpired = await isOTPExpired(user.email_verification_otp_created_time, EXPIRATION_TIME.EMAIL_VERIFICATION_OTP);
  if (hasOTPExpired) {
    throw new CustomError(validationMessages.EMAIL_VERIFICATION_OTP_EXPIRED, BAD_REQUEST);
  }

  // Generate password and reset forgot password OTP
  const updatedData = {
    email_verification_otp: null,
    email_verification_otp_created_time: null,
  }

  // Save user details
  await updateUser(user._id, updatedData);

  // Send reset password email
  // sendResetPasswordEmail(user);

  return {
    status: true,
    message: responseMessages.EMAIL_VERIFIED_SUCCESS,
  };
};

export const sendPhoneVerificationOTP = async (requestData) => {
  const { phone } = requestData;
  const currentDateTime = currentUTCDateTime();

  const user = await getUser({ phone }, USER_PROJECTION.ALL);
  // Validate user
  if (!user) {
    throw new CustomError(validationMessages.PHONE_NOT_FOUND, NOT_FOUND);
  }

  // Generate email verification OTP
  const updatedData = {
    phone_verification_otp: await generateOTP(),
    phone_verification_otp_created_time: currentDateTime,
  }

  // Update user details
  await updateUser(user._id, updatedData);

  // Send OTP on phone for phone verification
  user.phone_verification_otp = updatedData.phone_verification_otp;
  // sendPhoneVerificationOTP(user);

  const response = {
    status: true,
    message: responseMessages.PHONE_VERIFICATION_OTP_SENT
  };

  // For testing purpose only
  if (process.env.NODE_ENV === 'test') {
    response.otp = updatedData.phone_verification_otp;
  }

  return response;

};

export const userPhoneVerification = async (requestData) => {
  const { phone, otp } = requestData;
  const user = await getUser({ phone }, USER_PROJECTION.ALL);

  // Validate user with the email
  if (!user) {
    throw new CustomError(validationMessages.PHONE_NOT_FOUND, NOT_FOUND);
  }

  // Validate OTP
  if (otp !== user.phone_verification_otp) {
    throw new CustomError(validationMessages.PHONE_VERIFICATION_OTP_INVALID, BAD_REQUEST);
  }

  // Check OTP expiry
  const hasOTPExpired = await isOTPExpired(user.phone_verification_otp_created_time, EXPIRATION_TIME.PHONE_VERIFICATION_OTP);
  if (hasOTPExpired) {
    throw new CustomError(validationMessages.PHONE_VERIFICATION_OTP_EXPIRED, BAD_REQUEST);
  }

  // Generate password and reset forgot password OTP
  const updatedData = {
    phone_verification_otp: null,
    phone_verification_otp_created_time: null,
  }

  // Save user details
  await updateUser(user._id, updatedData);

  // Send phone verification email
  // sendResetPasswordEmail(user);

  return {
    status: true,
    message: responseMessages.PHONE_VERIFIED_SUCCESS,
  };
};

const socialResponse = async (user) => {
  user.token = await CommonUtils.createJWT({ email: user.email, _id: user._id });
  return { message: validationMessages.LOGIN_SUCCESSFUL, data: user };
};

const isValidFacebookToken = async (facebookId, accessToken) => {
  try {
    const verificationURL = `${SOCIAL_MEDIA.FACEBOOK_GRAPH_URL}${facebookId}/?access_token=${accessToken}`;
    const response = await axios.get(verificationURL);
    return response.data.id ? true : false;
  } catch (err) {
    return false;
  }
};

const isValidGoogleToken = async (googleId, accessToken) => {
  try {
    const response = await client.verifyIdToken({
      idToken: accessToken,
      audience: SOCIAL_MEDIA.GOOGLE_CLIENT_ID,
    });
    const { sub } = response.getPayload();
    return sub === googleId;
  } catch (err) {
    return false;
  }
};

export const userSocialLogin = async (requestData) => {
  let user = {};
  let isValidSocialToken = false;
  const {
    providerId, provider, accessToken, email, name, phone,
  } = requestData;

  switch (provider) {
    case SOCIAL_MEDIA.PROVIDERS.FACEBOOK:
      isValidSocialToken = await isValidFacebookToken(providerId, accessToken);
      break;
    case SOCIAL_MEDIA.PROVIDERS.GOOGLE:
      isValidSocialToken = await isValidGoogleToken(providerId, accessToken);
      break;
    case SOCIAL_MEDIA.PROVIDERS.TWITTER:
      isValidSocialToken = true;
      break;
    default:
      return CommonUtils.throwError({ message: validationMessages.SOCIAL_LOGIN_ERROR, status: UNAUTHORIZED });
  }

  if (!isValidSocialToken) {
    return CommonUtils.throwError({ message: validationMessages.SOCIAL_LOGIN_ERROR, status: UNAUTHORIZED });
  }

  if (email) {
    user = await getUser({ email }, USER_PROJECTION.LOGIN);
  } else {
    user = await getUser({ social_media_provider_id, social_media_provider }, USER_PROJECTION.LOGIN);
  }

  // save details if user does not exists
  if (!user) {
    await UserDao.createUser({
      email, name, phone, social_media_provider_id, social_media_provider,
    });
    user = await getUser({ email });
    user.isSignup = true;
  } else {
    user.isSignup = false;
  }

  return socialResponse(user);
};
