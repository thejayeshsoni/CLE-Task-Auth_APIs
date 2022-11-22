const router = require("express").Router();
const { signUp, login, logout } = require("../controllers/userController");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;