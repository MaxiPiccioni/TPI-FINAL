const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const auth = require("../seguridad/auth");


// GET para todos los productos
router.get("/api/productos", async function (req, res, next) {
  try {
    const whereCondition = {};
    if (req.query.nombre_prod) {
      whereCondition.nombre_prod = req.query.nombre_prod;
    }

    let data = await db.Productos.findAll({
      where: whereCondition,
      attributes: ["id_producto", "nombre_prod", "precio", "fecha_elaboracion", "id_proveedor"],
    });
    res.json(data);
  } catch (error) {
    next(error); 
  }
});


// GET para los productos filtrados por nombre
router.get('/api/productos/:id', async function (req, res) {
  try {
    const producto = await db.Productos.findByPk(req.params.id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en la consulta', error });
  }
});

// POST para crear un nuevo producto con validación de nombre único
router.post('/api/productos/', async (req, res) => {
  const { nombre_prod, precio, fecha_elaboracion, id_proveedor } = req.body;

  let nuevoProducto = {
    nombre_prod,
    precio,
    fecha_elaboracion,
    id_proveedor,
  };

  try {
    // Verificar si el nombre del producto ya existe
    const productoExistente = await db.Productos.findOne({ where: { nombre_prod } });
    if (productoExistente) {
      return res.status(400).json({ message: 'Ya existe un producto con ese nombre' });
    }

    const proveedorExistente = await db.Proveedores.findByPk(id_proveedor);
    if (!proveedorExistente) {
      return res.status(400).json({ message: 'Proveedor no encontrado' });
    }

    const productoCreado = await db.Productos.create(nuevoProducto);
    res.status(201).json(productoCreado);
  } catch (error) {
    console.error(error); // Imprimir el error para diagnóstico
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
});

// PUT para modificar un producto con validación de nombre único
router.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params; 
  const { nombre_prod, precio, fecha_elaboracion, id_proveedor } = req.body;

  try {
    // Verificar si el nombre del producto ya existe, excluyendo el producto actual
    const productoExistente = await db.Productos.findOne({
      where: { nombre_prod, id_producto: { [db.Sequelize.Op.ne]: id } },
    });
    if (productoExistente) {
      return res.status(400).json({ message: 'Ya existe un producto con ese nombre' });
    }

    // Buscar el producto por ID
    let producto = await db.Productos.findByPk(id);

    if (producto) {
      // Actualizar los campos del producto
      if (nombre_prod !== undefined) {
        producto.nombre_prod = nombre_prod;
      }
      if (precio !== undefined) {
        producto.precio = precio;
      }
      if (fecha_elaboracion !== undefined) {
        producto.fecha_elaboracion = fecha_elaboracion;
      }
      if (id_proveedor !== undefined) {
        producto.id_proveedor = id_proveedor;
      }

      // Guardar los cambios en la base de datos
      await producto.save();

      res.json({ message: 'Producto actualizado', producto });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
});

// DELETE para eliminar un Producto
router.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params; 

  try {
    const producto = await db.Productos.findByPk(id);
    
    if (producto) {
      await producto.destroy();
      res.json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
});


//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
  "/api/productosJWT",
  auth.authenticateJWT,
  async function (req, res, next) {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.Productos.findAll({
      attributes: [
        "id_producto",
        "nombre_prod",
        "precio",
        "fecha_elaboracion",
        "id_proveedor"
      ],
      order: [["nombre_prod", "ASC"]],
    });
    res.json(items);
  }
);


module.exports = router;
