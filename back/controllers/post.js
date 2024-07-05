require('dotenv').config();
const fs = require("fs");
const PostModel = require('../models/Post');

// CREATE
exports.createPost = (req, res, next) => {
    const postObject = req.body;
    delete postObject._id;
    const post = new PostModel({
      ...postObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/assets/images/${
        req.file.filename
      }`,
      likes: 0,
      dislikes: 0,
      usersLiked: [" "],
      usersDisliked: [" "],
    });
    post
      .save()
      .then(() => {
        res.status(201).json({ message: "Post enregistré !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
};

// DELETE
exports.deletePost = (req, res, next) => {
    if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
    PostModel.findOne({ _id: req.params.id })
      .then((post) => {
          const filename = post.imageUrl.split("assets/images/")[1];
          fs.unlink(`assets/images/${filename}`, () => {
            PostModel.findOne({ _id: req.params.id })
            .deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "Post supprimé" }))
              .catch((error) => res.status(400).json({ error }));
            console.log("Post supprimé");
          });
      })
      .catch((error) => res.status(500).json({ error }));
    }
  };

// READ ONE
exports.getOnePost = (req, res, next) => {
    PostModel.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

// READ ALL
exports.getAllPosts = (req, res, next) => {
    PostModel.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

// UPDATE ONE
exports.updatePost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/../../assets/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete postObject._userId;
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        PostModel.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Post modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

  // LIKE POST

  exports.likePost = (req, res, next) => {
    PostModel.findOne({ _id: req.params.id }).then((post) => {
      if(post.usersLiked.includes(req.auth.userId)) {
        PostModel.updateOne(
          {_id: req.params.id},
          {$pull : {usersLiked: req.auth.userId }, $inc: {likes: -1}}
        ).then(() => 
          res.status(200).json({message: "Ce post ne vous intéresse plus !", likeActive: false,})
        ).catch((error) => res.status(400).json({error}));
      } else {
        PostModel.updateOne(
          {_id: req.params.id},
          {$push: {usersLiked: req.auth.userId}, $inc: {likes: +1} }
        ).then(() => 
        res.status(200).json({message: "post liké !", likeActive: true})
        ).catch((error) => 
        res.status(400).json({error})
        )
      }
    })
  }
