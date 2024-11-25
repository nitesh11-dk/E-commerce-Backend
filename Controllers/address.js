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
        // let address = await Address.find().sort({ createdAt: -1 }).where("userId").equals(userId);
        let address = await Address.find({ userId }).sort({ createdAt: -1 });
        // let address = await Address.find({ userId});
        res.status(200).json({ address, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting address", success: false });
    }
}   
