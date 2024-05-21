const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../users/user.model");

const register = async (req, res, next) => {
  try {
    const user = new User(req.body);

    const userExist = await User.findOne({ mail: req.body.mail });
    if (userExist) {
      return error("This email has already been used.");
    }
    user.pass = bcrypt.hashSync(user.pass, 10);
    const userDB = await user.save();
    console.log(userDB);
    return res.json({
      status: 201,
      message: `User ${userDB.mail} created`,
    });
  } catch (error) {
    // specify the error and location
    console.log(error);
    return "error at register user", error;
  }
};

const login = async (req, res) => {
  try {
    const userInfo = await User.findOne({ mail: req.body.mail });
    console.log(bcrypt.compareSync(req.body.pass, userInfo.pass));
    if (bcrypt.compareSync(req.body.pass, userInfo.pass)) {
      userInfo.pass = "*************"; // ocultamos el dato password en la respuesta por seguridad
      const token = jwt.sign(
        {
          id: userInfo._id,
          mail: userInfo.mail,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
      );

      return res.status(200).json({
        data: { message: "ok", user: userInfo, token: token },
      });
    } else {
      return res.json({
        status: 400,
        message: "invalid credentials",
        data: null,
      });
    }
  } catch (error) {
    return "error at login user", error;
  }
};

module.exports = { register, login };
