import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        // check if the user exist 
        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        let hashPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully", success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Then send the JSON response
        return res.status(200).json({
            message: "Login successful",
            success: true,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in" });
    }
};

export const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users", success: false });
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        res.status(200).json({ user, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user", success: false });
    }
}   