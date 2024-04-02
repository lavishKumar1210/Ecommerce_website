const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://lavishkumarnrw001:8950941272@cluster0.yz3x988.mongodb.net/GoFoodmern?retryWrites=true&w=majority";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true, // Enable TLS/SSL
      tlsInsecure: true,
    });
    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );
    const catData = await foodCategory.find({}).toArray();

    global.food_items = data;
    console.log(global.food_items);
    global.foodCategory = catData;
    console.log(global.foodCategory);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    // Close the MongoDB connection regardless of success or failure
    // if (mongoose.connection.readyState === 1) {
    //   await mongoose.connection.close();
    //   console.log("Disconnected from MongoDB");
    // }
  }
};

module.exports = mongoDB;
