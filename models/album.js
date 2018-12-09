
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    artist: {
        type: String,
        required: [true, 'Arist field is required']
    },
    album: {
        type: String,
        required: [true, 'Album field is required']
    },
    albumCover: {
        type: String,
        required: [true, 'AlbumCover field is required']
    }
});

const Album = mongoose.model('album', AlbumSchema);

module.exports = Album;