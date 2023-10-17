/*const express = require ("express");
const app = express();
const PORT =process.env.PORT || 5000;
console.log("process.env.PORT || 5000")
app.listen (PORT,()=> console.log("Server is up & running!"));
app.use("/", (req,res) => {
res.status(200);
res.send("Hey there!")
});*/

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");
const morgan = require("morgan");
const path = require("path");
const fs = require ("fs");

const defaultRouter = require("./Routes/defaultRoute");
const bookRouter = require("./routes/bookRoute");
const productRouter = require("./routes/productRoute");

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server is runnig!"));

mongoose
.connect("mongodb://127.0.0.1:27017/FSA-API")
.then(()=>console.log("DB Connected!"))
.catch((error)=>{
console.log(error);
});
//Express Middleware Order

const filePath = path.join(__dirname, "logs", "request.logs");
const stream = fs.createWriteStream(filePath, {flags: "a"});

app.use(morgan("combined", {stream: stream}));

app.use (bodyParser.json());
app.use("/", defaultRouter);
app.use("/books", bookRouter);
app.use("/products", productRouter);

