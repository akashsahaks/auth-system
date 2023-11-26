require("dotenv").config();
const port = process.env.PORT || 3000;

const app = require("./app");
const connectDB = require("../config/dbConfig");

connectDB();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
