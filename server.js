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
const dotenv = require("dotenv");
const cors = require("cors");

const defaultRouter = require("./routes/defaultRoute");
const userRouter = require("./routes/userRoute");
const bookRouter = require("./routes/bookRoute");
const productRouter = require("./routes/productRoute");
const reviewRouter = require("./routes/reviewRoute")
const auth = require("./middleware/auth");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server is runnig!"));
app.use(cors());

mongoose
.connect("mongodb://127.0.0.1:27017/FSA-API")
//.connect(process.env.DB_URL)
.then(()=>console.log("DB Connected!"))
.catch((error)=>{
console.log(error);
});
//Express Middleware 

const filePath = path.join(__dirname, "logs", "request.logs");
const stream = fs.createWriteStream(filePath, {flags: "a"});

app.use(morgan("combined", {stream: stream}));
app.use (bodyParser.json());
app.use("/", defaultRouter); 
app.use("/users", userRouter);    
app.use("/books", bookRouter);  
//app.use(auth.tokenAuth);                                                  
app.use("/products", productRouter);
app.use("/reviews", reviewRouter);
