const express = require("express");
const connection = require("./connection/db");
const dotenv = require("dotenv"); 
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();
app.use(express.json());
app.use(cors()); 

dotenv.config();
connection();

app.use("/user", userRoutes);
app.use("/weather", weatherRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
