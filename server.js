const express = require("express");
const env = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require('./config/dbConnection');
const app = express();
const port = process.env.PORT || 3000;

connectDb();
app.use(express.json());//body-parser
app.use("/api/contacts",require("./routes/contactRoute"));
app.use("/api/users",require("./routes/userRoute"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Port listening at ${port}`);
})