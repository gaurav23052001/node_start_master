import { getProfile, editProfile, userChangePassword } from '../services';
import { errorResponse } from '../utils';
import { OK } from '../constants';

export const profile = async (req, res) => {
  try {
    const response = await getProfile(req.user._id);
    return res.status(OK).json(response);
  } catch (err) {
    return errorResponse(err, res);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const response = await editProfile(req.user._id, req.body);
    return res.status(OK).json(response);
  } catch (err) {
    return errorResponse(err, res);
  }
};

export const changePassword = async (req, res) => {
  try {
    const response = await userChangePassword(req.user._id, req.body);
    return res.status(OK).json(response);
  } catch (err) {
    return errorResponse(err, res);
  }
};
