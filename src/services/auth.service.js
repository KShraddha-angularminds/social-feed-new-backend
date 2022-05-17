const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const Token = require("../models/token.model");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/tokens");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client({
  clientId: process.env.CLIENT_ID,
});
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || user.deleted || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  //return await user.populate("_org", "name email");
  return user;
};

const loginWithGoogle = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      requiredAudience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const user = await userService.getUserByEmail(payload.email);
    //let user = await User.findOne({ email: payload.email });
    if (!user) {
      throw new Error();
    } else {
      return user;
    }
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "email is not registered");
  }
};
/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};

const changePassword = async (userId, newPassword, currentPassword) => {
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error();
    }
    console.log(newPassword + "heyy");
    const passExist = await bcrypt.compare(currentPassword, user.password);
    if (!passExist) throw new Error();
    Object.assign(user, { password: newPassword });
    await user.save();
    //console.log(user);
    return user;
  } catch (error) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "current password does not matched"
    );
  }
};
//logout
const logout = async (token) => {
  try {
    const expireToken = await tokenService.expireToken(token);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  resetPassword,
  verifyEmail,
  changePassword,
  loginWithGoogle,
  logout,
};
