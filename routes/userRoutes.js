const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController')

const userRoutes = async (fastify, options) => {
    // 创建新用户
    fastify.post(
        '/users',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        openid: { type: 'string', minLength: 1 },
                        userName: { type: 'string', minLength: 1 },
                        mobile: { type: 'string', minLength: 1 },
                        avatar: { type: 'string', format: 'uri' },
                        level: { type: 'number' },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', minLength: 1 },
                    },
                    required: ['openid', 'userName', 'email'],
                },
            },
        },
        createUser
    )
    // 获取所有用户
    fastify.get('/users', getUsers)
    // 获取单个用户
    fastify.get('/users/:id', getUserById)
    // 更新用户
    fastify.put('/users/:id', updateUser)
    // 删除用户
    fastify.delete('/users/:id', deleteUser)
}

module.exports = userRoutes
