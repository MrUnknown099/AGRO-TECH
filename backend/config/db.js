const mongoose = require('mongoose');

/**
 * Connects to the MongoDB Atlas database.
 * We use async/await because connecting to a database is an asynchronous operation.
 */
const connectDB = async () => {
    try {
        // Attempt to connect using the URI from our .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If there's an error, log it and exit the application
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
