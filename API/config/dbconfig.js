import mongoose from "mongoose";
import dns from "dns";


dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "e-commerce", 
        });

        console.log("✅ DB Connected:", db.connection.host);

        mongoose.connection.on("error", (error) => {
            console.log("❌ DB Connection Error:", error);
            process.exit(1);
        });

    } catch (error) {
        console.log("❌ Something went wrong during DB connection:", error);
    }
};