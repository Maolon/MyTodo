const DEFAULT_SECRET = require("./DefaultSecret");
const SECRET = process.env.JWT_SECRET;
if(!SECRET) SECRET = DEFAULT_SECRET;
const jwt = require("jsonwebtoken");
const { User } = require("../model/todoList");

exports.authMiddleware = async (req, res, next) => {
  const tokenData = jwt.verify(
    getAuthToken(req),
    SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(422).json({ message: "Wrong Token" });
      } else {
       // console.log(decoded)
        req.user = await User.findOne({ _id: decoded._id });
        if (!req.user) {
          return res.status(400).json({ message: "User Not Found" });
        }
        if(req.user.token !== decoded.jti) {
          return res.status(422).json({ message: "Invalid Token" }); 
        }
        next();
      }
  
    }
  );
};

getAuthToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

exports.expireDays = 5;

exports.jwtSign = (_id, expireDays, jti) => {
  return jwt.sign(
    {
      _id: String(_id),
      iat: Date.now(),
      exp: 86400000 * expireDays + Date.now(),
      jti: jti,
    },
    SECRET
  );
};
