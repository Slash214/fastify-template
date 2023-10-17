/**
 * @author 爱呵呵
 * 文件上传
 */
const fs = require('fs')
const fastifyMultipart = require('@fastify/multipart')
const { ErrorResponse, SuccessResponse } = require('../middlewares/response')

async function uploadRoutes(fastify, options) {
    fastify.register(fastifyMultipart)

    fastify.post('/upload', async (request, reply) => {
        const parts = request.parts()
        const uploadedFiles = [] // 存储上传文件的路径

        for await (const part of parts) {
            const { file, filename } = part
            // 保存文件到服务器上的上传目录
            const filePath = await saveFileToDisk(file, filename)
            uploadedFiles.push(filePath)
        }

        if (uploadedFiles.length > 0) {
            reply.send(SuccessResponse({ message: '图片上传成功', data: uploadedFiles }))
        } else {
            reply.send(ErrorResponse({ message: '未上传任何文件' }))
        }
    })

    async function saveFileToDisk(fileStream, filename) {
        return new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(`./uploads/${filename}`)
            fileStream.pipe(writeStream)
            writeStream.on('finish', () => {
                resolve(`./uploads/${filename}`) // 返回保存的文件路径
            })
            writeStream.on('error', (error) => {
                reject(error) // 返回保存文件时的错误
            })
        })
    }
}

module.exports = uploadRoutes
