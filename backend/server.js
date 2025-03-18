
// server.js
const express = require("express");
var cors = require('cors');
const {connectDb} = require("./database/connectDB");
const routes = require('./routes');
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

connectDb();
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
