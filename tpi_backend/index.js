const express = require("express");
const cors = require("cors");


// Crear servidor
const app = express();
require("./base-orm/sqlite-init");

// Configura CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({ origin: "http://localhost:5173" }));

// Middleware para procesar JSON
app.use(express.json());

// Controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// Vincular rutas
const rutasClientes = require("./routes/clientes");
const rutasEmpleados = require("./routes/empleados");
const rutasLocales = require("./routes/locales");
const rutasProductos = require("./routes/productos");
const rutasProveedores = require("./routes/proveedores");
const rutasVentas = require("./routes/ventas");
const seguridadRouter = require("./routes/seguridad");

app.use(rutasClientes);
app.use(rutasEmpleados);
app.use(rutasLocales);
app.use(rutasProductos);
app.use(rutasProveedores);
app.use(rutasVentas);
app.use(seguridadRouter);

if (!module.parent) {   
  const port = process.env.PORT || 3000;   
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app; // para testing
