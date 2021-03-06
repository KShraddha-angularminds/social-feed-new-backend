const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");

const register = catchAsync(async (req, res) => {
  // const org = await userService.createOrg(req.body);
  let user;
  try {
    user = await userService.createUser({
      // _org: org._id,
      ...req.body,
    });
  } catch (e) {
    // await org.remove();
    throw e;
  }
  // user = await user.populate("_org", "name email");
  const { token, expires } = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    user,
    token,
    expires,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const { token, expires } = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    token,
    expires,
  });
});

const googleLogin = catchAsync(async (req, res) => {
  const { idToken } = req.body;

  const user = await authService.loginWithGoogle(idToken);
  console.log(user);
  const { token, expires } = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    token,
    expires,
  });
});

// const logout = catchAsync(async (req, res) => {
//   const token = req.headers["authorization"];
//   console.log(token);
//   const response = await authService.logout(token);
//   res.send(response);
// });

const logout = catchAsync(async (req, res) => {
  const token = req.headers["authorization"];
  if (token) res.send("Logout successfully");
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const changePassword = catchAsync(async (req, res) => {
  const userId = req.user._id.valueOf();
  await authService.changePassword(
    userId,
    req.body.new_password,
    req.body.current_password
  );

  res.status(200).send("password changed successfully");
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const self = catchAsync(async (req, res) => {
  console.log();
  res.send(await req.user.populate("savedpost"));
  // res.send(req.user);
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  self,
  changePassword,
  googleLogin,
  logout,
};
