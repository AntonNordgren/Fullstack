
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    post: {
        type: String,
        required: [true, 'Arist field is required']
    },
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;