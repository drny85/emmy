import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded =  jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id).select('-password')
            req.user = user
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token fail')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('not authorized')
    }



}