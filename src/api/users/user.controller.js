const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const user = new User(req.body);

    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return new Error("This email has already been used.");
    }
    const userDB = await user.save();
    return res.json({
      status: 201,
      message: `User ${userDB.email} created`,
    });
  } catch (error) {
    //specify the error and location
    return next("error at register user", error);
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email });
    console.log(bcrypt.compareSync(req.body.password, userInfo.password));
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = "*************"; // ocultamos el dato password en la respuesta por seguridad
      const token = jwt.sign(
        {
          id: userInfo._id,
          email: userInfo.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
      );

      return res.status(200).json({
        data: { massage: "ok", user: userInfo, token: token },
      });
    } else {
      return res.json({
        status: 400,
        message: "invalid credentials",
        data: null,
      });
    }
  } catch (error) {
    return next("error at login user", error);
  }
};

const logout = (req, res, next) => {
  try {
    const token = null;
    return res.status(200).json({
      status: 200,
      message: "Logout successful",
    });
  } catch (error) {
    return next("error at logout", error);
  }
};

module.exports = { register, login, logout };
