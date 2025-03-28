const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
  try {
    let fullToken = req.headers.authorization;
    let token = fullToken?.replace('Bearer ', '');
    if(!token) res.status(403).send("Invalid Token");
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next()
  } catch (error) {
    console.log("Error in middleware ",error);
    res.status(400).send("Invalid Token");
  }
}

