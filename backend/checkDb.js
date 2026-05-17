require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB Atlas!");
    // The collection is likely 'users' based on mongoose pluralization
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log("\n📊 CURRENT USERS IN DATABASE:");
    console.log("-------------------------------");
    if (users.length === 0) {
      console.log("No users found. Database is currently empty.");
    } else {
      users.forEach((u, i) => {
        console.log(`${i + 1}. Name: ${u.name || 'N/A'} | Email: ${u.email}`);
      });
    }
    console.log("-------------------------------\n");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Connection error:", err);
    process.exit(1);
  });
