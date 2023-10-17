const fastify = require('fastify')({ logger: true })
const path = require('path')
const fastifyStatic = require('@fastify/static')
const Cors = require('@fastify/cors')
const Helmet = require('@fastify/helmet')
const Compress = require('@fastify/compress')
const { errorHandler, notFoundHandler } = require('./middlewares')
const routes = require('./routes')

const serverOptions = {
    port: 3200,
}

const staticOptions = {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads/',
}

// 注册插件和中间件
const registerPlugins = async () => {
    try {
        await fastify.register(Cors)
        await fastify.register(Helmet)
        await fastify.register(Compress)
        await fastify.register(fastifyStatic, staticOptions)
        await fastify.register(routes)

        fastify.setErrorHandler(errorHandler)
        fastify.setNotFoundHandler(notFoundHandler)

        return fastify
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

// 启动服务器
const startServer = async () => {
    try {
        const app = await registerPlugins()
        await app.listen(serverOptions)
        app.log.info(`Server listening on ${app.server.address().port}`)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

startServer()
