const mongoose = require('mongoose');

// Define the User Schema (the structure of our user data in the database)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // No two users can have the same email address
    },
    password: {
        type: String,
        required: true,
    },
    // You can add more fields here later (e.g., role: 'farmer')
}, {
    // Automatically adds 'createdAt' and 'updatedAt' timestamps to every document
    timestamps: true 
});

// Create the model from the schema and export it
const User = mongoose.model('User', userSchema);
module.exports = User;
