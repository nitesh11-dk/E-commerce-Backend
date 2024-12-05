import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
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


export const loginAdmin = async (req, res) => {
    try {
        const { email, password, adminKey } = req.body;

        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        // Check if the password is correct
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        // Admin key validation
        if (adminKey !== process.env.ADMIN_KEY) {
            return res.status(403).json({ message: "Admin key is wrong", success: false });
        }

        // First-time admin login, update isAdmin
        if (!user.isAdmin) {
            user.isAdmin = true;
            user.role = "admin";
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Respond with token and success message
        return res.status(200).json({
            message: "Admin login successful",
            success: true,
            token,
            isAdmin: user.isAdmin
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error logging in admin", success: false });
    }
};


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

// ADMIN
export const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users", success: false });
    }
}
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found With the Given ID ", success: false });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user", success: false });
    }
};



export const isUserAdmin = async (req, res, next) => {
    try {
        const token = req.header('Auth');
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Fetch the user from the database
        const user = await User.findById(userId); // Adjust based on your DB setup
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Check if the user has an admin role
        if (!user.isAdmin) {
            return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
        }
        return res.status(200).json({ success: true, message: 'User is Admin.' });

    } catch (error) {
        console.error('Error verifying admin:', error);
        res.status(400).json({ success: false, message: 'Invalid token or access denied.' });
    }
};
