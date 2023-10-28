  const userRepo = require("../repos/userRepo");
  const crypto = require("../utils/crypto");
  const auth = require("../utils/auth");

  const allUsers = async (req,res) => {
  try{
    const users = await userRepo.get();
    res.status(200).json(users);
  } catch (error){
    logger.error(error);
  res.status(500).send("Internal Server Error");
  }
  };

  const signup = async (req,res) => {
  try{
    const data = req.body;
    data.createdAt = new Date();
    data.password = await crypto.getHash(data.password);
    await userRepo.create(data);
    res.status(201).send("User created successfully");
  } catch (error) {
  if (error && error.message.indexOf("duplicate key") > -1) {
    res.status(400);
    res.send("Email Already Exists");
  } else {
    res.status(500);
    res.send("Internal Server Error!");
  }
  }
}
  const signin = async (req,res) => {
    const data = req.body;
    const user = await userRepo .getByEmail(data.email);
    console.log("dbuser", user);
    if(!user) {
        res.status(401);
        res.send("Email or Pasword Wrong");
    } else {
  const verify = await crypto.compare(data.password, user.password);
  console.log(verify);
  if(verify) {
    const token = auth.generateToken({email: data.email});
    const response = {
        message: "Login Successful",
        token,
    };
    res.status(200).send(response);
  } else {
    res.status(401).send("Email or Pasword Wrong");
  }
    }
    };

module.exports = {
    allUsers, 
    signup, 
    signin,
  };