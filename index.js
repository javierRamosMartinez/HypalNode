// 1. IMPORTS -> NPM; MODULOS PROPIOS
const authRouter = require("./src/api/auth/auth.router");
const userRouter = require("./src/api/users/user.router");
const foodRouter = require("./src/api/foods/food.router");
const allergenRouter = require("./src/api/allergens/allergen.router");
const cors = require('cors');

const express = require("express");
require("dotenv").config();
const { connectMongo } = require("./src/utils/db");
const {
  notFoundHandler,
  errorHandler,
} = require("./src/api/middleware/error.middleware");

// 2. CONFIGURACION
// utilizar formato json, va a permitir cierto de conexiones

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
connectMongo();

// 3. ENDPOINTS
//app.get(ruta del endpoint, controlador)

app.get("/", (req, res) => {
  res.json({ message: "El servidor está funcionando" });
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/foods", foodRouter);
app.use("/allergens", allergenRouter);
// 4. MANEJO EXCEPCIONES / ERRORES

// 5. ACTIVAR

app.listen(PORT, () => {
  console.log(`El servidor se ha iniciado en el puerto: ${PORT}`);
});
