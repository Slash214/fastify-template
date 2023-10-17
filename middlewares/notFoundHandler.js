function notFoundHandler(request, reply) {
	const info = {
		message: 'Route not found',
		code: 404,
		data: null
	}
	reply.status(404).send(info)
}