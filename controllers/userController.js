const UserDB = require ("../models/user.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

exports.register = async (req, res) =>{
  try {
    let newUser = await UserDB.create(req.body);

    //! Hash password
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    newUser.password = hashPassword;
    let User = await newUser.save()
    
    //! Create token
    let jwtToken = JWT.sign({name: User.name, email: User.email, role: User.role}, process.env.SECRET_KEY);

    res.json({Message: "User added Succecfully", token: jwtToken});
  } catch (error) {
    console.log("Some thing Register wrong",error);
    res.status(400).send({message: error});
  }
}


exports.login = async (req, res) =>{
  try {
    let User = await UserDB.findOne({email: req.body.email});
    if (!User || !await User.comparePassword(req.body.password)) {
      res.status(403).send({message: "email or password invalid"});
    } else {
      //! Create token
      let jwtToken = JWT.sign({name: User.name, _id: User._id, email: User.email, role: User.role}, process.env.SECRET_KEY);
      res.json({message: "Login successfully 👍", Token: jwtToken, _id: User._id});
    }
  } catch (error) {
    console.log("Some thing login wrong",error);
    res.status(400).send({message: error});
  }
}


exports.logout = async (req, res) =>{
  try {
    let {id} = req.params
    let User = await UserDB.findById(id);
    let jwtToken = JWT.sign({name: User.name, _id: User._id, email: User.email, role: User.role}, process.env.SECRET_KEY);
    res.json({Token: jwtToken});
  } catch (error) {
    console.log("Some thing logout wrong",error);
    res.status(400).send({message: error});
  }
}
