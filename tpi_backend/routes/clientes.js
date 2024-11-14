const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

// GET para todos los clientes
router.get("/api/clientes", async function (req, res, next) {
    try {
        let data = await db.Clientes.findAll({
            attributes: ["id_cliente", "nombre_cliente", "email", "telefono", "fecha_registro"],
        });
        res.json(data);
    } catch (error) {
        next(error); 
    }
});

// GET para clientes filtrados por nombre
router.get('/api/clientes/:nombre', async function (req, res) {
    try {
        const cliente = await db.Clientes.findOne({
            where: { nombre_cliente: req.params.nombre },
        });
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en la consulta', error });
    }
});

// POST para crear un nuevo cliente con validación de email único
router.post('/api/clientes/', async (req, res) => {
    const { nombre_cliente, email, telefono, fecha_registro } = req.body;

    try {
        // Verificar si el email ya existe
        const emailExistente = await db.Clientes.findOne({ where: { email } });
        if (emailExistente) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }

        let nuevoCliente = { nombre_cliente, email, telefono, fecha_registro };
        const clienteCreado = await db.Clientes.create(nuevoCliente);
        res.status(201).json(clienteCreado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente', error });
    }
});

// PUT para modificar un cliente con validación de email único
router.put('/api/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_cliente, email, telefono, fecha_registro } = req.body;

    try {
        // Verificar si el email ya está en uso por otro cliente, excluyendo el cliente actual
        const emailExistente = await db.Clientes.findOne({
            where: {
                email,
                id_cliente: { [db.Sequelize.Op.ne]: id } // Excluye el cliente actual
            }
        });

        if (emailExistente) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }

        const cliente = await db.Clientes.findByPk(id);
        if (cliente) {
            cliente.nombre_cliente = nombre_cliente;
            cliente.email = email;
            cliente.telefono = telefono;
            cliente.fecha_registro = fecha_registro;

            await cliente.save();
            res.json({ message: 'Cliente actualizado', cliente });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente', error });
    }
});

// DELETE para eliminar un cliente
router.delete('/api/clientes/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const cliente = await db.Clientes.findByPk(id);
        if (cliente) {
            await cliente.destroy();
            res.json({ message: 'Cliente eliminado' });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error });
    }
});

module.exports = router;
