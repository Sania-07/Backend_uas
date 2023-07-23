const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./app/models");
const app = express();
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");

dotenv.config();

// const corsOptions = {
//   origin: "*",
// };

// Register cors middleware
app.use(cookieparser());
app.use(cors());
app.use(express.json());

// Koneksi database
const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbURL = "mongodb+srv://sania2100016116:sania1234@cluster0.5mrack7.mongodb.net/"; // Ganti dengan URL koneksi MongoDB Atlas Anda

db.mongoose
  .connect(dbURL, mongooseConfig)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log("Failed to connect to the database");
    process.exit();
  });

// Memanggil routes product
require("./app/routes/product.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
