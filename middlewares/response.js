
const SuccessResponse = ({ data, message = '请求成功', statusCode = 201, ...options }) => {
	return { data, statusCode, message, ...options }
}

const ErrorResponse = ({ message, statusCode = 500 }) => {
	return { daa: null, statusCode, message }
}

module.exports = { SuccessResponse, ErrorResponse }