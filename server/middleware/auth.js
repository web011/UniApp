module.exports = options => {
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')
    return async (req,res,next) => {
        const token = String(req.headers.authorization || '').split(' ').pop();
        console.log(token)
        assert(token,401,'请先登陆')
        // assert(token,401,'请先提供jwt token')
        const {id} = jwt.verify(token,req.app.get('secret'))
        assert(id,401,'请先登陆')
        // assert(id,401,'无效的jwt token')
        req.user = await AdminUser.findById(id);
        assert(req.user,401,'请先登陆')
        await next()
    }
}