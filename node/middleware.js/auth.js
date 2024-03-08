const jwt = require("jsonwebtoken");

const authMiddle = (req, res, next) => {
  const token = req.headers["authorization"];
  const decode = jwt.verify(token, "token");
  if (!token) {
    return res
      .status(200)
      .json({ success: false, msg: "Authorization failed!" });
  }
  else {
    req.user = decode.user;
    next();
  }
};

module.exports = authMiddle;