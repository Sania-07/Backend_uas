module.exports = function (app) {
  const user = require("../controllers/user");
  const r = require("express").Router();
  const verifyToken = require("../middleware/verifyToken");

  r.get("/", verifyToken, user.findAll);//mengambil
  r.post("/register", user.register);//menampilkan
  r.post("/login", user.login);
  r.delete("/logout", user.logout);//menghapus

//bagian dari routes
  app.use("/user", r);//untuk Memasang fungsi middleware ke jalur yang ditentukan
};
