const jwt = require("jsonwebtoken");// digunakan untuk menghasilkan dan memvalidasi token JWT

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "Token tidak tersedia, akses ditolak" });
  }

  const token = authHeader.split(" ")[1]; // Pemisahan skema "Bearer" dan token

  if (!token) {
    return res.status(401).json({ msg: "Token tidak tersedia, akses ditolak" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token tidak valid, akses ditolak" });
  }
};

module.exports = verifyToken;