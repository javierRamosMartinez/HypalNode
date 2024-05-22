const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.findById(id);
    res.json({
      status: 200,
      msg: "ok",
      data: users,
    });
  } catch (error) {
    return "error at get one ", error;
  }
};

const getAll = async (req, res) => {
  try {
    console.log("error");
    const users = await User.find();
    res.json({
      status: 200,
      msg: "ok",
      data: users,
    });
  } catch (error) {
    return "error at get all ", error;
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ status: 200, msg: "ok", data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUserPatch = async (req, res) => {
  try {
    // Encuentra al usuario por su ID
    const user = await User.findById(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }

    // Obtén los allergyId existentes del usuario
    const existingAllergyIds = user.allergyId || [];

    // Obtén los nuevos allergyId del cuerpo de la solicitud
    const newAllergyIds = req.body.allergyId || [];

    // Fusiona los arrays y elimina duplicados
    const updatedAllergyIds = [...existingAllergyIds, ...newAllergyIds];

    // Actualiza el usuario con los nuevos allergyId
    user.allergyId = updatedAllergyIds;

    // Guarda el usuario actualizado
    await user.save();

    res.json({ status: 200, msg: "ok", data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};


const updatingHistory = async (req, res) => {
  try {
    // Encuentra al usuario por su ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }

    // Obtén los allergyId existentes del usuario
    const existingHistory = user.history || [];
    console.log(user.history);

    // Obtén los nuevos allergyId del cuerpo de la solicitud
    const newHistory = req.body.history || [];

    // Fusiona los arrays y elimina duplicados
    const updatedHistory = [...existingHistory, ...newHistory];

    // Actualiza el usuario con los nuevos allergyId
    user.history = updatedHistory;
    // console.log(updatedHistory);

    // Guarda el usuario actualizado
    await user.save();

    res.json({ status: 200, msg: "ok", data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { getAll, getOne, updateUser, updateUserPatch, updatingHistory };
