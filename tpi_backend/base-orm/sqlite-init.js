// Acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBasePasteleria() {
  await db.open("./.data/pasteleria.db");
  //await db.open(process.env.base);

  let res = null;

  // Crear tabla Productos
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'Productos';",
    []
  );
  if (res.contar === 0) {
    await db.run(
      `CREATE TABLE Productos (
        id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_prod TEXT NOT NULL UNIQUE,
        precio REAL NOT NULL,
        fecha_elaboracion DATE NOT NULL,
        id_proveedor INTEGER NOT NULL,
        FOREIGN KEY (id_proveedor) REFERENCES Proveedores(id_proveedor) ON DELETE CASCADE 
      );`
    );
    console.log("Tabla Productos creada!");
  
    // Insertar registros en la tabla Productos
    await db.run(
    `INSERT INTO Productos VALUES
        (1, 'Galletas de Chocolate', 500, '2024-10-01', 3),
        (2, 'Torta de Manzana', 1500, '2024-10-02', 7),
        (3, 'Brownie', 2500, '2024-10-03', 12),
        (4, 'Torta de Vainilla', 3500, '2024-10-04', 1),
        (5, 'Budin de Banana', 2000, '2024-10-05', 15),
        (6, 'Muffin de Arándano', 4500, '2024-10-06', 9),
        (7, 'Cheesecake', 3000, '2024-10-07', 2),
        (8, 'Galletas de Avena', 550, '2024-10-08', 8),
        (9, 'Tarta de Limón', 4700, '2024-10-09', 4),
        (10, 'Pan Integral', 3800, '2024-10-10', 11),
        (11, 'Cupcakes de Vainilla', 1500, '2024-10-11', 6),
        (12, 'Budin de Naranja', 4000, '2024-10-12', 13),
        (13, 'Galletas de Jengibre', 800, '2024-10-13', 5),
        (14, 'Alfajor de Chocolate', 2200, '2024-10-14', 10),
        (15, 'Torta Red Velvet', 3200, '2024-10-15', 14); `
    );
  }

  // Crear tabla Locales
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'Locales';",
    []
  );
  if (res.contar === 0) {
    await db.run(
      `CREATE TABLE Locales (
        id_local INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_loc TEXT NOT NULL UNIQUE,
        direccion TEXT NOT NULL,
        telefono TEXT NOT NULL,
        fecha_apertura DATE NOT NULL,
        id_empleado INTEGER NOT NULL,
        FOREIGN KEY (id_empleado) REFERENCES Empleados(id_empleado) ON DELETE CASCADE 
      );`
    );
    console.log("Tabla Locales creada!");

    // Insertar registros en la tabla Locales
    await db.run(
    `INSERT INTO Locales VALUES
        (1, 'Dulce Encanto', 'Av. Colón 1234, Córdoba', '351-1234567', '2021-05-10', 3),
        (2, 'Repostería Gourmet', 'Calle 27 de Abril 567, Córdoba', '351-2345678', '2020-08-15', 7),
        (3, 'Sabor a Miel', 'Calle Montevideo 890, Córdoba', '351-3456789', '2023-01-20', 5),
        (4, 'Pastelería El Arte', 'Av. General Paz 3210, Córdoba', '351-4567890', '2022-03-12', 1),
        (5, 'Delicias de la Abuela', 'Calle San Martín 456, Córdoba', '351-5678901', '2020-11-25', 11),
        (6, 'El Rincón Dulce', 'Calle Vélez Sarsfield 789, Córdoba', '351-6789012', '2024-04-05', 9),
        (7, 'Tentaciones de Chocolate', 'Calle Buenos Aires 234, Córdoba', '351-7890123', '2021-06-30', 6),
        (8, 'Patisserie Córdoba', 'Calle Córdoba 147, Córdoba', '351-8901234', '2022-12-14', 4),
        (9, 'El Sabor de la Vida', 'Av. España 890, Córdoba', '351-9012345', '2023-09-10', 12),
        (10, 'Dulce Amistad', 'Calle 9 de Julio 111, Córdoba', '351-0123456', '2021-07-18', 15),
        (11, 'Pastelito Feliz', 'Calle Chacabuco 234, Córdoba', '351-2345678', '2020-10-20', 2),
        (12, 'La Casa del Pastel', 'Av. Rivadavia 345, Córdoba', '351-3456789', '2023-03-16', 10),
        (13, 'Dulces Sueños', 'Calle Independencia 456, Córdoba', '351-4567890', '2022-05-22', 8),
        (14, 'Masa y Sabor', 'Calle Sarmiento 567, Córdoba', '351-5678901', '2021-11-11', 14),
        (15, 'Tarta y Café', 'Calle San Luis 678, Córdoba', '351-6789012', '2024-02-02', 13); `
    );
  }

  
  // Crear tabla Empleados
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'Empleados';",
    []
  );
  if (res.contar === 0) {
    await db.run(
      `CREATE TABLE Empleados (
        id_empleado INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_empleado TEXT NOT NULL,
        sexo TEXT NOT NULL,
        fecha_nacimiento DATE NOT NULL
      );`
    );
    console.log("Tabla Empleados creada!");

    // Insertar registros en la tabla Empleados
    await db.run(
    `INSERT INTO Empleados VALUES
        (1, 'Juan Pérez', 'masculino', '1985-02-15'),
        (2, 'María Gómez', 'femenino', '1990-06-25'),
        (3, 'Carlos Fernández', 'masculino', '1982-11-30'),
        (4, 'Ana Martínez', 'femenino', '1995-04-10'),
        (5, 'Luis Rodríguez', 'masculino', '1987-08-05'),
        (6, 'Lucía Díaz', 'femenino', '1992-01-18'),
        (7, 'Fernando López', 'masculino', '1980-12-20'),
        (8, 'Sofía Sánchez', 'femenino', '1993-03-22'),
        (9, 'Diego Torres', 'masculino', '1988-05-30'),
        (10, 'Clara Morales', 'femenino', '1991-07-15'),
        (11, 'Pablo Ramírez', 'masculino', '1986-09-09'),
        (12, 'Valentina Castro', 'femenino', '1994-10-12'),
        (13, 'Javier Ruiz', 'masculino', '1983-03-25'),
        (14, 'Gabriela Herrera', 'femenino', '1992-12-05'),
        (15, 'Martín Salas', 'masculino', '1981-08-30'); `
    );
  }


  // Crear tabla Clientes
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'Clientes';",
    []
  );
  if (res.contar === 0) {
    await db.run(
      `CREATE TABLE Clientes (
        id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_cliente TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        telefono TEXT NOT NULL,
        fecha_registro DATE NOT NULL
      );`
    );
    console.log("Tabla Clientes creada!");

    // Insertar registros en la tabla Clientes
    await db.run(
    `INSERT INTO Clientes VALUES
        (1, 'Juliana Morales', 'juliana.morales@example.com', '351-1234567', '2021-03-15'),
        (2, 'Martín Rodríguez', 'martin.rodriguez@example.com', '351-2345678', '2021-04-22'),
        (3, 'Laura López', 'laura.lopez@example.com', '351-3456789', '2021-05-10'),
        (4, 'Carlos Gómez', 'carlos.gomez@example.com', '351-4567890', '2021-06-18'),
        (5, 'Ana Torres', 'ana.torres@example.com', '351-5678901', '2021-07-30'),
        (6, 'Diego Ramírez', 'diego.ramirez@example.com', '351-6789012', '2021-08-25'),
        (7, 'Sofía Díaz', 'sofia.diaz@example.com', '351-7890123', '2021-09-12'),
        (8, 'Fernando Martínez', 'fernando.martinez@example.com', '351-8901234', '2021-10-05'),
        (9, 'Clara Castro', 'clara.castro@example.com', '351-9012345', '2021-11-15'),
        (10, 'Valentina Herrera', 'valentina.herrera@example.com', '351-0123456', '2021-12-20'),
        (11, 'Pablo Salas', 'pablo.salas@example.com', '351-1357924', '2022-01-17'),
        (12, 'Gabriela Fernández', 'gabriela.fernandez@example.com', '351-2468135', '2022-02-28'),
        (13, 'Javier Ruiz', 'javier.ruiz@example.com', '351-3579246', '2022-03-14'),
        (14, 'Lucía González', 'lucia.gonzalez@example.com', '351-4681357', '2022-04-10'),
        (15, 'Martín Salgado', 'martin.salgado@example.com', '351-5792468', '2022-05-30');`
    );    
  }


  // Crear tabla Proveedores
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'Proveedores';",
    []
  );
  if (res.contar === 0) {
    await db.run(
      `CREATE TABLE Proveedores (
        id_proveedor INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_empresa TEXT NOT NULL,
        nombre_proveedor TEXT NOT NULL,
        telefono TEXT NOT NULL,
        fecha_registro DATE NOT NULL
      );`
    );
    console.log("Tabla Proveedores creada!");

    // Insertar registros en la tabla Proveedores
    await db.run(
    `INSERT INTO Proveedores VALUES
        (1, 'Proveedora Dulces S.A.', 'Ricardo Pérez', '351-1234567', '2021-03-12'),
        (2, 'Pastelera La Mejor', 'Mariana López', '351-2345678', '2021-04-15'),
        (3, 'Suministros de Repostería', 'Javier González', '351-3456789', '2021-05-22'),
        (4, 'Distribuciones Bocados', 'Claudia Martínez', '351-4567890', '2021-06-30'),
        (5, 'Dulce Abundancia', 'Carlos Romero', '351-5678901', '2021-07-18'),
        (6, 'Catering Delicias', 'Lucía Salinas', '351-6789012', '2021-08-25'),
        (7, 'Dulces y Más', 'Fernando Torres', '351-7890123', '2021-09-14'),
        (8, 'Proveedores Pasteleros', 'Natalia Ruiz', '351-8901234', '2021-10-05'),
        (9, 'Repostería Gourmet', 'Diego Fernández', '351-9012345', '2021-11-10'),
        (10, 'Dulces de Córdoba', 'Ana Castro', '351-0123456', '2021-12-20'),
        (11, 'Sabor a Pastel', 'Ricardo Salas', '351-1357924', '2022-01-22'),
        (12, 'Suministros de Pastelería', 'Gabriela Gómez', '351-2468135', '2022-02-28'),
        (13, 'Cremas y Postres', 'Pablo Díaz', '351-3579246', '2022-03-11'),
        (14, 'Delicias de la Abuela', 'Clara Herrera', '351-4681357', '2022-04-05'),
        (15, 'La Casa del Dulce', 'Martín Ortega', '351-5792468', '2022-05-30');`
    );
  }


  // Crear tabla Ventas
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'Ventas';",
    []
  );
  if (res.contar === 0) {
    await db.run(
      `CREATE TABLE Ventas (
        id_venta INTEGER PRIMARY KEY AUTOINCREMENT,
        id_producto INTEGER NOT NULL,
        id_cliente INTEGER NOT NULL,
        id_local INTEGER NOT NULL,
        fecha_venta DATE NOT NULL,
        cantidad INTEGER NOT NULL,
        total REAL NOT NULL,
        FOREIGN KEY (id_producto) REFERENCES Productos(id_producto) ON DELETE CASCADE,
        FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente) ON DELETE CASCADE,
        FOREIGN KEY (id_local) REFERENCES Locales(id_local) ON DELETE CASCADE
      );`
    );
    console.log("Tabla Ventas creada!");
    
    // Insertar registros en la tabla Ventas
    await db.run(
    `INSERT INTO Ventas VALUES
        (1, 5, 12, 8, '2021-03-15', 3, 6000), 
        (2, 1, 2, 5, '2021-04-20', 2, 1000), 
        (3, 7, 6, 1, '2021-05-25', 1, 3000), 
        (4, 10, 3, 4, '2021-06-30', 1, 3800),
        (5, 3, 8, 2, '2021-07-15', 5, 12500),
        (6, 12, 10, 3, '2021-08-10', 4, 16000),
        (7, 2, 4, 7, '2021-09-18', 3, 4500), 
        (8, 9, 14, 6, '2021-10-28', 2, 9400), 
        (9, 8, 9, 1, '2022-01-12', 3, 2400),
        (10, 11, 11, 10, '2022-03-30', 2, 3000), 
        (11, 6, 1, 5, '2023-06-05', 1, 4500),
        (12, 4, 13, 12, '2023-08-15', 4, 14000),
        (13, 13, 15, 3, '2024-01-10', 5, 4000), 
        (14, 15, 7, 2, '2024-03-20', 1, 3200), 
        (15, 14, 5, 9, '2024-05-25', 2, 4400);`
    );    
  }
  
  // cerrar la base
  db.close();
}

CrearBasePasteleria();

module.exports =  CrearBasePasteleria;