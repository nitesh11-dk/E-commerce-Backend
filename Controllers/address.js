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


