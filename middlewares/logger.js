const fs = require("fs");

const logger = (req, res, next) => {
  const log = `Solicitud ${req.method} en ${req.url} a las ${new Date().toLocaleString()}\n`;
  console.log(log);

  // Escribir el log en un archivo llmamado server.log (Historial de solicitudes)
  fs.appendFile("server.log", log, (err) => {
    if (err) console.error("Error al escribir en el log:", err);
  });

  next();
};

module.exports = logger;
