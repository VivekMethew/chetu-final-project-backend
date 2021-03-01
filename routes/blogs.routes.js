const express = require('express')
const { verifyAccessToken } = require('../config/checkAuth')
const router = express.Router()

// controllers
const blogController = require('../controller/blogs.controller')

// get users
router.get('/blogs', verifyAccessToken, blogController.getBlogs)

// get user
router.get('/blogs/:blogid', verifyAccessToken, blogController.getBlog)

// create users
router.post('/blogs', verifyAccessToken, blogController.createBlog)

// get users
router.patch('/blogs/:blogid', verifyAccessToken, blogController.updateBlogs)

// get users
router.delete('/blogs/:blogid', verifyAccessToken, blogController.deleteBlogs)

router.post('/categories', verifyAccessToken, blogController.add_categories)

module.exports = router