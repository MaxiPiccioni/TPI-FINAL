// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite:" + process.env.base);
const sequelize = new Sequelize("sqlite:" + "./.data/pasteleria.db");


// Definición del modelo Productos
const Productos = sequelize.define(
    "productos",
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_prod: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "nombre_prod es requerido",
        },
      },
    },
    precio: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "precio es requerido",
        },
      },
    },
    fecha_elaboracion: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "fecha_elaboracion es requerida",
        },
      },
    },
    id_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "id_proveedor es requerido",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);


// Definición del modelo Locales
const Locales = sequelize.define(
    "locales",
  {
    id_local: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_loc: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "nombre_loc es requerido",
        },
      },
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "direccion es requerida",
        },
      },
    },
    telefono: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "telefono es requerido",
        },
      },
    },
    fecha_apertura: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "fecha_apertura es requerida",
        },
      },
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "id_empleado es requerido",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);


// Definición del modelo Empleados
const Empleados = sequelize.define(
    "empleados",
  {
    id_empleado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_empleado: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "nombre_empleado es requerido",
        },
      },
    },
    sexo: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "sexo es requerido",
        },
      },
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "fecha_nacimiento es requerida",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);


// Definición del modelo Clientes
const Clientes = sequelize.define(
    "clientes",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_cliente: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "nombre_cliente es requerido",
        },
      },
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        msg: "este email ya existe en la tabla!",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "debe ser un formato de email válido",
        },
        notEmpty: {
          args: true,
          msg: "email es requerido",
        },
      },
    },
    telefono: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "telefono es requerido",
        },
      },
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "fecha_registro es requerida",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);


// Definición del modelo Proveedores
const Proveedores = sequelize.define(
   "proveedores",
  {
    id_proveedor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_empresa: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "nombre_empresa es requerido",
        },
      },
    },
    nombre_proveedor: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "nombre_proveedor es requerido",
        },
      },
    },
    telefono: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "telefono es requerido",
        },
      },
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "fecha_registro es requerida",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);


// Definición del modelo Ventas
const Ventas = sequelize.define(
    "ventas",
    {
      id_venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "id_producto es requerido",
          },
        },
      },
      id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "id_cliente es requerido",
          },
        },
      },
      id_local: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "id_local es requerido",
          },
        },
      },
      fecha_venta: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "fecha_venta es requerida",
          },
        },
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "cantidad es requerida",
          },
        },
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "total es requerido",
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );


// Asociación entre Productos y Proveedores
Productos.belongsTo(Proveedores, { foreignKey: 'id_proveedor', as: 'proveedor' });
Proveedores.hasMany(Productos, { foreignKey: 'id_proveedor', as: 'productos' });

// Asociación entre Locales y Empleados
Locales.belongsTo(Empleados, { foreignKey: 'id_empleado', as: 'empleado' });
Empleados.hasMany(Locales, { foreignKey: 'id_empleado', as: 'locales' });

// Asociación entre Ventas y Productos
Ventas.belongsTo(Productos, { foreignKey: 'id_producto', as: 'producto' });
Productos.hasMany(Ventas, { foreignKey: 'id_producto', as: 'ventas' });

// Asociación entre Ventas y Clientes
Ventas.belongsTo(Clientes, { foreignKey: 'id_cliente', as: 'cliente' });
Clientes.hasMany(Ventas, { foreignKey: 'id_cliente', as: 'ventas' });

// Asociación entre Ventas y Locales
Ventas.belongsTo(Locales, { foreignKey: 'id_local', as: 'local' });
Locales.hasMany(Ventas, { foreignKey: 'id_local', as: 'ventas' });


// Exportar los modelos
module.exports = {
  Sequelize,
  Productos,
  Locales,
  Empleados,
  Clientes,
  Proveedores,
  Ventas,
};
