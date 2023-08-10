const router = require("express").Router();

const userController = require("./controllers/userController");
const calculatorController = require("./controllers/calculatorController");

router.use("/auth", userController);
router.use("/calculator", calculatorController);
router.use("*", (req, res) => {
  res.status("404").render("404");
});

module.exports = router;
