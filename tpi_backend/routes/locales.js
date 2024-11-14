const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

// GET para todos los locales
router.get("/api/locales", async function (req, res, next) {
  try {
    let data = await db.Locales.findAll({
      attributes: ["id_local", "nombre_loc", "direccion", "telefono", "fecha_apertura", "id_empleado"],
    });
    res.json(data);
  } catch (error) {
    next(error); 
  }
});

// GET para locales filtrados por nombre
router.get('/api/locales/:nombre', async function (req, res) {
  try {
    const local = await db.Locales.findOne({
      where: { nombre_loc: req.params.nombre },
    });
    if (local) {
      res.json(local);
    } else {
      res.status(404).json({ message: 'Local no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en la consulta', error });
  }
});

// POST para crear un nuevo local con validación de dirección única
router.post('/api/locales/', async (req, res) => {
  const { nombre_loc, direccion, telefono, fecha_apertura, id_empleado } = req.body;

  try {
    // Verificar si ya existe un local con la misma dirección
    const localExistente = await db.Locales.findOne({ where: { direccion } });
    if (localExistente) {
      return res.status(400).json({ message: 'Ya existe un local con esa dirección' });
    }

    let nuevoLocal = { nombre_loc, direccion, telefono, fecha_apertura, id_empleado };
    const localCreado = await db.Locales.create(nuevoLocal);
    res.status(201).json(localCreado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el local', error });
  }
});

// PUT para modificar un local con validación de dirección única
router.put('/api/locales/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre_loc, direccion, telefono, fecha_apertura, id_empleado } = req.body;

  try {
    // Verificar que no haya otro local con la misma dirección, excluyendo el local actual
    const direccionExistente = await db.Locales.findOne({
      where: {
        direccion,
        id_local: { [db.Sequelize.Op.ne]: id } // Excluir el id_local actual
      }
    });

    if (direccionExistente) {
      return res.status(400).json({ message: 'Ya existe un local con esa dirección' });
    }

    const local = await db.Locales.findByPk(id);
    if (local) {
      local.nombre_loc = nombre_loc;
      local.direccion = direccion;
      local.telefono = telefono;
      local.fecha_apertura = fecha_apertura;
      local.id_empleado = id_empleado;

      await local.save();
      res.json({ message: 'Local actualizado', local });
    } else {
      res.status(404).json({ message: 'Local no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el local', error });
  }
});

// DELETE para eliminar un local
router.delete('/api/locales/:id', async (req, res) => {
  const { id } = req.params; 

  try {
    const local = await db.Locales.findByPk(id);
    if (local) {
      await local.destroy();
      res.json({ message: 'Local eliminado' });
    } else {
      res.status(404).json({ message: 'Local no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el local', error });
  }
});

module.exports = router;
