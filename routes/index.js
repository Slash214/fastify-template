const userRoutes = require('./userRoutes')
const uploadRoutes = require('./uploadRoutes')

const routes = async (fastify, options) => {
    fastify.get('/', async (request, reply) => {
        reply.send({ message: 'Welcome to my Fastify API' })
    })

    // 引入用户路由
    fastify.register(userRoutes)
    fastify.register(uploadRoutes)
    // 可以添加其他路由
}

module.exports = routes
