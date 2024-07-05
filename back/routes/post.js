const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/post");
const multer = require('../middleware/multer-config')

router.post("/create", auth, multer, postCtrl.createPost);
router.get("/all", auth, multer, postCtrl.getAllPosts);
router.get("/:id", auth, multer, postCtrl.getOnePost);
router.delete("/:id", auth, multer, postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.post("/:id/like", auth, multer, postCtrl.likePost);

module.exports = router;
