const express = require("express");
const cors = require("cors");
const joyasRoutes = require("./routes/joyasRoutes");
const logger = require("./middlewares/logger");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Rutas
app.use("/joyas", joyasRoutes);

// Ruta por defecto
app.get("*", (req, res) => {
  res.status(404).send("Esta ruta no existe");
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
