const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/login", userCtrl.login);
router.post("/create", userCtrl.createUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.get("/:id", auth, userCtrl.getOneUser);
router.use("/", auth, userCtrl.getAllUsers);

module.exports = router;
