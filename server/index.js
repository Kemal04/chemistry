//Express 
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

const cors = require("cors");
const sequelize = require('./data/db');

app.use(express.json());
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors());
app.use('/', express.static('public'))

const AuthRouter = require("./routes/auth.router")
const UserRouter = require("./routes/user.router")
const ContactRouter = require("./routes/contact.router")
const BlogRouter = require("./routes/blog.router")

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/blog", BlogRouter);

//serv
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})