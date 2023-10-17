function errorHandler(error, request, reply) {
    console.error(error)
	reply.status(500).send({
		message: 'Internal Server Error',
		code: 500,
		data: null
	})
}

module.exports = errorHandler
