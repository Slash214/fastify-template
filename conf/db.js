/**
 * @author 爱呵呵
 * 数据库配置
 */

/**
 *  
 useNewUrlParser:
 类型: 布尔值
 默认值: true
 作用: 当设置为 true 时，MongoDB 驱动会尝试解析MongoDB连接字符串中的新URL解析器。这个选项已被弃用，建议设置为 true，以使用新的 URL 解析器。
 useUnifiedTopology:
 
 类型: 布尔值
 默认值: true
 作用: 当设置为 true 时，使用 createIndex() 替代 ensureIndex() 方法。ensureIndex()已被弃用，所以建议将此选项设置为 true。
 maxPoolSize:
 
 类型: 数值
 默认值: 100
 作用: 限制连接池中的最大连接数。这可以帮助控制同时建立的数据库连接的数量。在高流量应用中，适当设置连接池大小可以减少性能问题。
 */

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 50,
}

const uri = 'mongodb://localhost:27017/test'

module.exports = {
    uri,
    connectionOptions,
}
