import UserModel from '../models/userModel';
import { USER_PROJECTION } from '../constants';

/**
 * Create new user in the database.
 * @property {object} userInfo- The object of user.
 * @returns {Promise}
 */
export const saveUser = async (userInfo) => {
  const user = new UserModel(userInfo);
  return user.save();
}

/**
 * This function is used to get user details by the matching filters
 * @param {object} filter Filter conditions to get the user details 
 * @returns 
 */
export const getUser = async (filter, projection = USER_PROJECTION.DETAILS) => {
  return UserModel.findOne(filter, projection).lean().exec();
}

/**
 * get single object of user by ID.
 * @property {string} id - User ID
 * @returns {Promise}
 */
export const getUserById = async (id, projection) => {
  return UserModel.findById(id, projection).lean().exec();
}

/**
 * This function is used to count document on the basis of filter
 * @param {object} query match condition
 * @returns {Promise} return count of the object that match with the filter
 */
export const getCount = async (query) => {
  return UserModel.countDocuments(query);
}

/**
 * This function is used to check is the object exists with the provided filter query
 * @param {object} query match condition
 * @returns {boolean}
 */
export const isUserExist = async (query) => {
  const count = await UserModel.countDocuments(query);
  return count > 0;
}

export const updateUser = async (id, data) => {
  return UserModel.updateOne({ _id: id }, data);
}
