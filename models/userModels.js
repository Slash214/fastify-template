/**
 * @author 爱呵呵
 * 数据库模型  用户模型
 */
const mongoose = require('../db/index');

const userSchema = new mongoose.Schema({
    openid: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    mobile: { type: String },
    avatar: { type: String },
    level: { type: Number },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
