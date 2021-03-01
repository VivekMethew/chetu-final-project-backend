const { Blog } = require('../modal/blogs.modal')
const { Category } = require('../modal/category.modal')
const createError = require('http-errors')
const mongoose = require('mongoose')
module.exports = {
    getBlogs: async(req, res, next) => {
        try {
            const blogs = await Blog.find({}, { __v: 0 })
            if (!blogs) {
                throw createError(404, "Blogs does not exists")
            }
            res.status(200).json({
                success: true,
                blogs: blogs
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    getBlog: async(req, res, next) => {
        console.log(req.params.blogid)
        try {
            const blog = await Blog.findById(req.params.blogid, { __v: 0 })
            if (!blog) {
                throw createError(404, 'Blog does not exists')
            }
            res.status(200).json({
                success: true,
                blog: blog
            })
        } catch (error) {
            // console.log(error)
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid user id'))
                return
            }
            next(error)
        }
    },
    createBlog: async(req, res, next) => {
        try {
            const blog = new Blog(req.body)
            await blog.save().then(() => {
                // console.log(user)
                return res.status(201).send({
                    success: true,
                    message: 'success',
                    blog: blog
                })
            }).catch((err) => {
                throw createError(500, err.message)
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Something went wrong'))
                return
            }
            next(error)
        }
    },
    updateBlogs: async(req, res, next) => {
        try {
            const id = req.params.blogid
            const updates = req.body
            const options = { new: true }
            const update = await Blog.findByIdAndUpdate(id, updates, options)
            if (!update) {
                throw createError(404, 'Not Found')
            }
            res.status(200).json({
                success: true,
                update: update
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    deleteBlogs: async(req, res, next) => {
        // console.log(req.params.blogid)
        try {
            // console.log(req.params.blogid)
            const result = await Blog.findByIdAndDelete(req.params.blogid)
            if (!result) {
                throw createError(404, 'Not Found User')
            }
            res.status(200).json({
                success: true,
                result: result
            })
        } catch (error) {
            // console.log(error)
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    add_categories: async(req, res, next) => {
        try {
            const category = new Category(req.body)
            await category.save().then(() => {
                // console.log(user)
                return res.status(201).send({
                    success: true,
                    message: 'success',
                    category: category
                })
            }).catch((err) => {
                throw createError(500, err.message)
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Something went wrong'))
                return
            }
            next(error)
        }
    }
}