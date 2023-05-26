import logger from '../configs/logger';
import { 
    userRegister,
    userLogin,
    userForgotPassword,
    userResetPassword,
    sendEmailVerificationOTP,
    userEmailVerification,
    sendPhoneVerificationOTP,
    userPhoneVerification,
    userSocialLogin,
} from '../services';
import { errorResponse } from '../utils';
import { OK } from '../constants';

export const register = async (req, res) => {
    try {
        const response = await userRegister(req.body);
        return res.status(OK).json(response);
    } catch (err) {
        logger.error(err);
        return errorResponse(err, res);
    }
};

export const login = async (req, res) => {
    try {
        const response = await userLogin(req.body);
        return res.status(OK).json(response);
    } catch (err) {
        logger.error(err);
        return errorResponse(err, res);
    }
};

/**
 * @description This function is used to login with google and facebook
 * @property {object} req Object - to get the parameter
 * @property {object} res Object - response object to send the response.
 * @returns {object} loginData- All login information to login.
 */
 export const socialLogin = async (req, res) => {
    try {
      // accessToken, userID SOCIAL_MEDIA.facebook.facebookGraphURL
      const loginData = await userSocialLogin(req.body);
      return res.status(ErrorConstants.OK).json(loginData);
    } catch (err) {
      return CommonUtils.errorResponse(err, res);
    }
  };

export const forgotPassword = async (req, res) => {
    try {
        const response = await userForgotPassword(req.body);
        return res.status(OK).json(response);
    } catch (err) {
        logger.error(err);
        return errorResponse(err, res);
    }
};

export const resetPassword = async (req, res) => {
    try {
        const response = await userResetPassword(req.body);
        return res.status(OK).json(response);
    } catch (err) {
        logger.error(err);
        return errorResponse(err, res);
    }
};

export const emailVerificationOTP = async (req, res) => {
    try {
        const response = await sendEmailVerificationOTP(req.body);
        return res.status(OK).json(response);
    } catch (err) {
        logger.error(err);
        return errorResponse(err, res);
    }
};

export const emailVerification = async (req, res) => {
    try {
        const response = await userEmailVerification(req.body);
        return res.status(OK).json(response);
    } catch (err) {
        logger.error(err);
        return errorResponse(err, res);
    }
};

export const phoneVerificationOTP = async (req, res) => {
    try {
        const response = await sendPhoneVerificationOTP(req.body);
        return res.status(OK).json(response);
    } catch (err) {
        logger.error(err);
        return errorResponse(err, res);
    }
};

export const phoneVerification = async (req, res) => {
    try {
        const response = await userPhoneVerification(req.body);
        return res.status(OK).json(response);
    } catch (err) {
        logger.error(err);
        return errorResponse(err, res);
    }
};