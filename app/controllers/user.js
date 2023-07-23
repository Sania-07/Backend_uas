const bcrypt = require("bcrypt"); //untuk ngedeskripsi password yang kita masukan
const jwt = require('jsonwebtoken')
const db = require("../models/usermodel");
const usermodel = require("../models/usermodel");
const User = require("../models/usermodel");
exports.findAll = (req, res) => {
  const userId = req.userId;

  User
    .findOne({ _id: userId })
    .select("id nama email") // Menggunakan proyeksi untuk membatasi kolom yang ditampilkan
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
      }

      res.send(foundUser);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.register = async (req, res) => {
  const { nama, email, password, confpassword } = req.body;
  if (password !== confpassword)
    return res
      .status(400)
      .json({ msg: "password dan confpassword tidak cocok" });
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      nama,
      email,
      password: hashedPassword,
    });
    res.json({ msg: "register berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "register gagal" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ msg: "Email tidak ditemukan" });
    }

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Password salah" });
    }

    const token = jwt.sign({ Id: foundUser._id, username: foundUser.email }, "Hakuna Matata", {
      expiresIn: '3h', // Set token expiration time
    });

    res.json({ token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Login gagal" });
  }
};
exports.logout = (req, res) => {
  res.clearCookie("refreshToken");

  res.json({ msg: "Logout berhasil" });
};