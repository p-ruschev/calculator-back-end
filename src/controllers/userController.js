const router = require("express").Router();

const { register, login } = require("../services/userService");
//const { getOwnTrips } = require('../services/tripService');
const { AUTH_COOKIE_NAME } = require("../constants");
//const { isGuest } = require('../middlewares/securityMiddleware');
//const { isAuth } = require('../middlewares/authMiddleware');

const initLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let token = await login({ email, password });
    res.status(200).json(token);
  } catch (error) {
    res.status(403).json({ errors: true, message: error.message });
  }
};

const initRegister = async (req, res) => {
  let { email, password } = req.body;
  try {
    await register({ email, password });
    let token = await login({ email, password });
    res.status(200).json(token);
  } catch (error) {
    res.status(403).json({ errors: true, message: error });
  }
};

const initLogout = (req, res) => {
  res.status(200).json({ message: "logout" });
};
router.post("/login", initLogin);
router.post("/register", initRegister);
router.get("/logout", initLogout);
module.exports = router;
