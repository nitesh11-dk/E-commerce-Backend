import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/e-commerce')
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("connected to db");
        })

        connection.on("error", (error) => {
            console.log("something went wrong during connection indb ", error);
            process.exit(1);
        })

    } catch (error) {
        console.log("something went wrong during connection indb ", error);
    }
}