const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title : { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersDisliked: { type: [String] },
    usersLiked: { type: [String] },
}, {timestamps: true});

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Post", postSchema);
