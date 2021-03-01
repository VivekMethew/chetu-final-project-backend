const mongoose = require('mongoose');
const Schema = mongoose.Schema


const categorySchema = new Schema({
    cat_title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }
}, { timestamps: true })


const Category = mongoose.model('categories', categorySchema)

module.exports = { Category }