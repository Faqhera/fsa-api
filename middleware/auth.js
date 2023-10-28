const jwt = require("jsonwebtoken")
const authenticate = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (req.headers) {
        const tokens = authHeader.split(" ");
        const encodedStr = tokens[1];
        //base64
        const decoded = atob(encodedStr);
        const cred = decoded.split(":");
        const username = cred[0];
        const password = cred[1];
        if(username === "admin" && password ==="pass" ){
            next();
        } else{
            res.status(401);
            res.send("Un-Authorize"); }
       } else {
res.status(401);
res.send("Un-Authorize");      
       }       
 };

    const tokenAuth = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.status(401). send ("Unauthorized");
      } else {
        const token = authHeader.split(" ");
        const jwtToken = token[1];
        const verify = jwt.verify(jwtToken,process.env.API_KEY);
        if(verify) {
            next();
              } else {
        res.status(401). send ("Unauthorized");

              }
         }
    };

 module.exports = {
    authenticate, tokenAuth,
 };

