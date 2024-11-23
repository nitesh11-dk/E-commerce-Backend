import User from "../Models/user.js";
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

        const token = jwt.sign({ id: user._id }, "niteshkushwaha", { expiresIn: "24h" });

        // Set the cookie first
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Then send the JSON response
        return res.status(200).json({
            message: "Login successful",
            success: true,
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