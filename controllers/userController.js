/**
 * @author 爱呵呵
 * 用户控制器
 */

const { SuccessResponse, ErrorResponse } = require('../middlewares/response')
const User = require('../models/userModels')

const createUser = async (request, reply) => {
    try {
        console.log('request.body', request.body)
        const userData = request.body // 从请求中获取用户数据
        const newUser = new User(userData) // 创建一个新用户实例
        await newUser.save() // 保存用户到数据库
        console.log('成功')
        reply.send(SuccessResponse({ data: newUser, message: '创建成功' }))
    } catch (error) {
        console.error('创建用户时出现错误：', error)
        reply.send(ErrorResponse({ message: error }))
    }
}

const getUsers = async (request, reply) => {
    try {
        const { page = 1, perPage = 10 } = request.query

        // 将 page 和 perPage 转换为整数
        const pageNum = parseInt(page)
        const itemsPerPage = parseInt(perPage)

        // 计算跳过的项目数量
        const skip = (pageNum - 1) * itemsPerPage

        const totalUsers = await User.countDocuments() // 获取总用户数
        const totalPages = Math.ceil(totalUsers / itemsPerPage) // 计算总页数
        const users = await User.find().skip(skip).limit(itemsPerPage)
        return reply.send(
            SuccessResponse({
                data: users,
                page: pageNum,
                totalPages,
                total: totalUsers,
                statusCode: 200,
            })
        )
    } catch (error) {
        reply.send(ErrorResponse({ message: error }))
    }
}

const getUserById = async (request, reply) => {
    const userId = request.params.id
    try {
        const user = await User.findById(userId)
        if (user) {
            reply.send({ data: user, statusCode: 200, message: 'User retrieved successfully' })
        } else {
            reply.send({ data: null, statusCode: 404, message: `User with ID ${userId} not found` })
        }
    } catch (error) {
        reply.send(ErrorResponse({ message: error }))
    }
}

const updateUser = async (request, reply) => {
    const userId = request.params.id
    const updatedUserData = request.body
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true })
        if (updatedUser) {
            reply.send({ data: updatedUser, statusCode: 200, message: 'User updated successfully' })
        } else {
            reply.send({ data: null, statusCode: 404, message: `User with ID ${userId} not found` })
        }
    } catch (error) {
        reply.send({ data: null, statusCode: 500, message: 'Failed to update user' })
    }
}

const deleteUser = async (request, reply) => {
    const userId = request.params.id
    try {
        const deletedUser = await User.findByIdAndDelete(userId)
        if (deletedUser) {
            reply.send({
                data: null,
                statusCode: 200,
                message: `User with ID ${userId} has been deleted`,
            })
        } else {
            reply.send({ data: null, statusCode: 404, message: `User with ID ${userId} not found` })
        }
    } catch (error) {
        reply.send({ data: null, statusCode: 500, message: 'Failed to delete user' })
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
}
