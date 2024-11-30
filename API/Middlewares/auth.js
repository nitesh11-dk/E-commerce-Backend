import jwt from 'jsonwebtoken';
import User from '../Models/user.js';

export const AuthenticateUser = async (req, res, next) => {

    const authHeader = req.header('Auth');
    const token = authHeader;

    if (!token) {
        return res.status(401).json({ message: "You need to Login First" });
    }

    try {
        const decode = jwt.verify(token, "niteshkushwaha");
        const user = await User.findById(decode.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
