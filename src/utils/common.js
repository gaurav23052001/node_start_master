import moment from 'moment-timezone';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NUMBERS } from '../constants';
import { CustomError } from './customError';

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const currentUTCDateTime = () => {
  return moment().utc().format();
};

const randomString = (length, chars) => {
  let mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  let result = '';
  // eslint-disable-next-line no-plus-plus
  for (let i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
};

export const generatePasswordHash = async (password) => {
  const createSalt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, createSalt);
};

export const generatePassword = async () => {
  const password = randomString(NUMBERS.EIGHT, 'aA');
  const hash = await generatePasswordHash(password);
  return { password, hash };
};

export const comparePasswordHash = async (password, oldPasswordHash) => {
  return bcryptjs.compare(password, oldPasswordHash);
};

/**
 * @description get single object of goal.
 * @property {String} payload token
 * @returns {JWT token}
 */
export const createJWT = async (payload = {}) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRY });
};

/**
 * @description verify JWT token
 * @property {String} token token
 * @returns {verifyToken}
 */
export const verifyJWT = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * @description custom verify JWT token
 * @property {String} token token
 * @returns {verifyToken}
 */
export const verifyCustomJWT = async (token, secret, options) => {
  return jwt.verify(token, secret, options);
};

export const errorResponse = async (err, res) => {
  const error = {};
  const statusCode = err.status || 500;
  error.status = false;
  if (err.jwt_expired) {
    error.jwt_expired = err.jwt_expired;
  }
  error.message = err.message;
  return res.status(statusCode).json(error);
};

export const isOTPExpired = async (startDateTime, expiryTime) => {
  const currentDateTime = currentUTCDateTime();
  startDateTime = moment(startDateTime).utc().format();
  const expiredDateTime = moment(startDateTime).add(expiryTime, 'minutes').utc().format();
  return currentDateTime > expiredDateTime;
};

/**
 * @description Middleware to handle common error.
 * @property {Object} payload token
 * @returns {error}
 */
export const throwError = async (err) => {
  if (err.message && err.status) {
    throw new CustomError(err.message, err.status);
  }
  throw err;
};
