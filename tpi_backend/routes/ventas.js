const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

// GET para todas las ventas
router.get("/api/ventas", async function (req, res, next) {
    try {
      let data = await db.Ventas.findAll({
        attributes: [
          "id_venta",
          "id_producto",
          "id_cliente",
          "id_local",
          "fecha_venta",
          "cantidad",
          "total"
        ],
      });
      res.json(data);
    } catch (error) {
      next(error); 
    }
  });


// GET para ventas filtradas por ID (Como venta no tiene un nombre, lo dejamos en ID)
router.get('/api/ventas/:id', async function (req, res) {
  try {
    const venta = await db.Ventas.findOne({
      where: { id_venta: req.params.id },
    });
    
    if (venta) {
      res.json(venta);
    } else {
      res.status(404).json({ message: 'Venta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en la consulta', error });
  }
});


// POST para crear una nueva Venta
// Aca tampoco validamos su existencia, ya que depende de muchas claves de otras tablas, asumimos que si se envia un ID, es porque existe.
router.post('/api/ventas/', async (req, res) => {
  const { id_producto, id_cliente, id_local, fecha_venta, cantidad, total } = req.body;

  // Verifica si los IDs existen
  const producto = await db.Productos.findByPk(id_producto);
  const cliente = await db.Clientes.findByPk(id_cliente);
  const local = await db.Locales.findByPk(id_local);

  // Si alguno de los IDs no existe, retorna un error
  if (!producto || !cliente || !local) {
    return res.status(400).json({ message: 'El producto, cliente o local no existe.' });
  }

  let nuevaVenta = {
    id_producto,
    id_cliente,
    id_local,
    fecha_venta,
    cantidad,
    total,
  };

  try {
    const ventaCreada = await db.Ventas.create(nuevaVenta);
    res.status(201).json(ventaCreada);
  } catch (error) {
    console.error('Error details:', error); 
    res.status(500).json({ message: 'Error al crear la venta', error });
  }
});


// PUT para modificar una venta
router.put('/api/ventas/:id', async (req, res) => {
  const { id } = req.params; 
  const { id_producto, id_cliente, id_local, fecha_venta, cantidad, total } = req.body;

  try {
      const venta = await db.Ventas.findByPk(id);
      
      if (venta) {
          venta.id_producto = id_producto;
          venta.id_cliente = id_cliente;
          venta.id_local = id_local;
          venta.fecha_venta = fecha_venta;
          venta.cantidad = cantidad;
          venta.total = total;

          await venta.save();
          res.json({ message: 'Venta actualizada', venta });
      } else {
          res.status(404).json({ message: 'Venta no encontrada' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la venta', error });
  }
});


// DELETE para eliminar una venta
router.delete('/api/ventas/:id', async (req, res) => {
  const { id } = req.params; 

  try {
      const venta = await db.Ventas.findByPk(id);
      
      if (venta) {
          await venta.destroy();
          res.json({ message: 'Venta eliminada' });
      } else {
          res.status(404).json({ message: 'Venta no encontrada' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la venta', error });
  }
});

module.exports = router;