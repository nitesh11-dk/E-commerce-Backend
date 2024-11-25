import jwt from 'jsonwebtoken'
import User from '../Models/user.js'

export const AuthenticateUser = async (req, res, next) => {
    if (req.user) {
        next()
    } else {
        const token = req.cookies.token; // Access token from cookies
        if (!token) {
            return res.status(401).json({ message: "You need to Login First" })
        }
        const decode = jwt.verify(token, "niteshkushwaha")


        let user = await User.findById(decode.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        req.user = user;

        next()

    }
}