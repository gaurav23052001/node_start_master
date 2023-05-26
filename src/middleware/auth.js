/**
 * @file This file define the middleware to catch validation errors thrown by joi throughout the app.
 */
import logger from '../configs/logger';
import { CustomError, verifyJWT, throwError, errorResponse } from '../utils';
import { UNAUTHORIZED } from '../constants';
import { getUserById } from '../dao';
import validationMessages from '../messages/validationMessages';

async function validateToken(request) {
  try {
    if (!request.headers.authorization) {
      throw new CustomError(validationMessages.AUTH_TOKEN_REQUIRED, UNAUTHORIZED);
    }
    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      throw new CustomError(validationMessages.INVALID_TOKEN, UNAUTHORIZED);
    }
    const verifyToken = await verifyJWT(token);
    if (!verifyToken) {
      throw new CustomError(validationMessages.INVALID_TOKEN, UNAUTHORIZED);
    }
    return { verifyToken, token };
  } catch (err) {
    logger.error(err);
    return throwError(err);
  }
}

/**
  * This function will catch the validation errors as middleware
  * @property {object} err - joi validation error object
  * @property {object} req - express request object
  * @property {object} res - express response object
  * @property {object} next - middleware function to continue req execution
  * @returns {object} res object is returned if the validation error occurs otherwise continue execution
  */

export const authenticate = async (req, res, next) => {
  try {
    const { verifyToken } = await validateToken(req);
    const user = await getUserById({ _id: verifyToken._id });
    const fullUrl = `${req.protocol}://${req.get('host')}`;
    if (!user) {
      throw new CustomError(validationMessages.USER_NOT_EXIST, UNAUTHORIZED);
    }
    if (!user.is_active) {
      throw new CustomError(validationMessages.ACCOUNT_INACTIVE, UNAUTHORIZED);
    }
    req.user = user;
    req.user.userId = user.id;
    req.user.api_url = fullUrl;
    return next();
  } catch (err) {
    logger.error(err);
    err.jwt_expired = true;
    return errorResponse(err, res);
  }
};

export const adminAuthenticate = async (req, res, next) => {
  try {
    const { verifyToken } = await validateToken(req);
    const getUser = await getUserById({ _id: verifyToken._id });
    if (!getUser) {
      throw new CustomError(validationMessages.USER_NOT_EXIST, UNAUTHORIZED);
    }
    if (!getUser.is_admin) {
      throw new CustomError(validationMessages.UNAUTHORIZED, UNAUTHORIZED);
    }
    req.user = getUser;
    req.user.userId = getUser._id;
    return next();
  } catch (err) {
    logger.error(err);
    return errorResponse(err, res);
  }
};

export const verifiedOrNot = async (req, res, next) => {
  try {
    const { is_verified_by_phone, is_verified_by_email } = req.user;
    if (!is_verified_by_phone || !is_verified_by_email) {
      throw new CustomError(validationMessages.USER_NOT_VERIFIED, UNAUTHORIZED);
    }
    return next();
  } catch (err) {
    logger.error(err);
    return errorResponse(err, res);
  }
};
