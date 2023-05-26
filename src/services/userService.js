import {
  getUser,
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
} from '../constants';
import {
  CustomError,
  comparePasswordHash,
  generatePasswordHash,
  sendChangePasswordEmail,
} from '../utils';

/**
 * This function is used to validate user
 * @param {string} userId 
 * @returns 
 */
const validateUser = async (userId, projection) => {
  const user = await getUser({ _id: userId }, projection);

  // Check is user exists with this ID
  if (!user) {
    throw new CustomError(validationMessages.USER_NOT_FOUND, NOT_FOUND);
  }
  return user;
};

/**
 * This function is used to get user details by user ID
 * @param {string} userId 
 * @returns 
 */
export const getProfile = async (userId) => {
  // get user details
  const user = await getUser({ _id: userId }, USER_PROJECTION.DETAILS);

  // Return response
  return {
    status: true,
    message: responseMessages.OK,
    data: user,
  };
};

/**
 * This function is used to update user details by user ID
 * @param {string} userId 
 * @returns 
 */
export const editProfile = async (userId, requestData) => {

  // Check empty request
  if(Object.keys(requestData).length === 0) {
    throw new CustomError(validationMessages.INVALID_REQUEST, BAD_REQUEST);
  }

  // Validate user
  await validateUser(userId, USER_PROJECTION.DETAILS);

  // Save user details
  await updateUser(userId, requestData);

  // Return response
  return {
    status: true,
    message: responseMessages.PROFILE_UPDATED_SUCCESS,
  };
};

/**
 * This function is used to update user password
 * @param {string} userId 
 * @param {object} requestData 
 * @returns 
 */
export const userChangePassword = async (userId, requestData) => {
  // Validate user
  const user = await validateUser(userId, USER_PROJECTION.LOGIN);

  // check current password
  const passwordHash = await comparePasswordHash(requestData.current_password, user.password);
  if (!passwordHash) {
    throw new CustomError(validationMessages.CURRENT_PASSWORD_INVALID, UN_PROCESSABLE_ENTITY);
  }

  // Generate password
  const password = await generatePasswordHash(requestData.new_password);
  // Save user details
  await updateUser(userId, { password: password });

  // Send reset password email
  sendChangePasswordEmail(user);

  // Return response
  return {
    status: true,
    message: responseMessages.USER_PASSWORD_CHANGED,
  };
};
