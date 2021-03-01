const { User } = require('../modal/users.modal')
const createError = require('http-errors')
const { authSchema } = require('../config/validate_schema')
const mailer = require('../config/mailer')
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require('../config/checkAuth')
const mongoose = require('mongoose')
module.exports = {
    getUsers: async(req, res, next) => {
        try {
            const users = await User.find({}, { __v: 0 })
            if (!users) {
                throw createError(404, "Users does not exists")
            }
            res.status(200).json({
                success: true,
                users: users
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    getUser: async(req, res, next) => {
        console.log(req.params.userid)
        try {
            const user = await User.findById(req.params.userid, { __v: 0 })
            if (!user) {
                throw createError(404, 'User does not exists')
            }
            res.status(200).json({
                success: true,
                user: user
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
    createUsers: async(req, res, next) => {
        try {
            const user = new User(req.body)

            await user.save().then(() => {
                // console.log(user)
                return res.status(201).send({
                    success: false,
                    message: 'success',
                    user: user
                })
            }).catch((err) => {
                throw createError(500, err.message)
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(500, 'Invalid user id'))
                return
            }
            next(error)
        }
    },
    updateUsers: async(req, res, next) => {
        try {
            const id = req.params.userid
            const updates = req.body
            const options = { new: true }
            const update = await User.findByIdAndUpdate(id, updates, options)
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
    deleteUsers: async(req, res, next) => {
        try {
            const result = await User.findByIdAndDelete(req.params.id)
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
    user_login: async(req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body)
            const user = await User.findOne({ email: result.email })
            if (!user) throw createError.NotFound('User not registered')

            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch) throw createError.Unauthorized('Username/password not valid')

            const accessToken = await signAccessToken(user.id)
            const refreshToken = await signRefreshToken(user.id)
            res.send({ accessToken, refreshToken, userid: user.id })
        } catch (err) {
            if (err.isJoi === true)
                return next(createError.BadRequest("Invalide username/password"))
            next(err)
        }
    },
    refresh_token: async(req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)

            const accessToken = await signRefreshToken(userId)
            const refToken = await signRefreshToken(userId)

            res.send({ accessToken: accessToken, refreshToken: refToken })
        } catch (error) {
            next(error)
        }
    },
    mailer: async(req, res, next) => {
        // console.log(req.body.emailtxt)
        try {
            await mailer.sendMail({
                toMails: req.body.email,
                subject: req.body.subject,
                text: req.body.emailtxt
            }).then((data) => {
                // console.log(data)
                res.send({ data })
            }).catch((err) => {
                throw err
            })
        } catch (error) {
            next(error)
        }
    }
}