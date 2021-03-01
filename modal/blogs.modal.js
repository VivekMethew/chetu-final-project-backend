const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema


const blogSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    sub_title: {
        type: String,
        default: null
    },
    author: {
        type: String,
        default: null
    },
    body: {
        type: String,
        default: null
    },
    comment: {
        type: Number,
        default: 0
    },
    Likes: {
        type: Number,
        default: 0
    },
    Dis_Likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    fileType: {
        type: String,
        default: null
    },
    filePath: {
        type: String,
        default: null
    },
    fileBuffer: {
        type: String,
        default: null
    },
    fileSize: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }
}, { timestamps: true })


const Blog = mongoose.model('blog', blogSchema)

module.exports = { Blog }