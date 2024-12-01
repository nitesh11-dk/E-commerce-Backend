import Address from "../Models/Address.js";

export const addAddress = async (req, res) => {
    let { address, city, state, country, phoneNumber } = req.body;
    let userId = req.user._id;
    try {
        let useraddress = new Address({
            userId,
            address,
            city,
            state,
            country,
            phoneNumber
        })
        await useraddress.save();
        res.status(201).json({ message: "Address added successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding address", success: false });
    }
}

export const getAddress = async (req, res) => {
    let userId = req.user._id;
    try {
        // Find the most recent address for the user
        let address = await Address.findOne({ userId }).sort({ createdAt: -1 });
        if (!address) {
            return res.status(404).json({ message: "No address found", success: false });
        }
        res.status(200).json({ address, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting address", success: false });
    }
};
