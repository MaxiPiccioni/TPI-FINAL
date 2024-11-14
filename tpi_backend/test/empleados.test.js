const request = require("supertest");
const app = require("../index");


// Test para el GET de empleados
describe("GET /api/empleados", () => {
    it("Debería devolver todos los empleados", async () => {
      const res = await request(app).get("/api/empleados");
      expect(res.statusCode).toEqual(200);
  
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id_empleado: expect.any(Number),
            nombre_empleado: expect.any(String),
            sexo: expect.any(String),
            fecha_nacimiento: expect.any(String),
          }),
        ])
      );
    });
  });
  

// Test para el GET de empleados por nombre
describe("GET /api/empleados/:nombre", () => {
  it("Debería devolver el empleado con el nombre 'Diego Torres'", async () => {
    const res = await request(app).get("/api/empleados/Diego Torres");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        id_empleado: expect.any(Number),
        nombre_empleado: expect.any(String),
        sexo: expect.any(String),
        fecha_nacimiento: expect.any(String),
      })
    );
  });
});


// Test para el POST de un empleado nuevo
describe("POST /api/empleados", () => {
  const nuevoEmpleado = {
    nombre_empleado: "Empleado Prueba",
    sexo: "Masculino",
    fecha_nacimiento: "1990-05-15",
  };

  it("Debería devolver el empleado que acabo de crear", async () => {
    const res = await request(app).post("/api/empleados").send(nuevoEmpleado);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_empleado: expect.any(Number),
        nombre_empleado: expect.any(String),
        sexo: expect.any(String),
        fecha_nacimiento: expect.any(String),
      })
    );
  });
});


// Test de PUT para modificar un empleado
describe("PUT /api/empleados/:id", () => {
  const empleadoModificacion = {
    nombre_empleado: "Juan Pérez",
    sexo: "Masculino",
    fecha_nacimiento: "1990-01-01",
  };

  it("Debería devolver el empleado con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/empleados/1")
      .send(empleadoModificacion);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        empleado: expect.objectContaining({
          id_empleado: expect.any(Number),
          nombre_empleado: expect.any(String),
          sexo: expect.any(String),
          fecha_nacimiento: expect.any(String),
        }),
      })
    );
  });
});


// Test de DELETE para eliminar un empleado
describe("DELETE /api/empleados/:id", () => {
  it("Debería devolver el empleado con el id 4 borrado", async () => {
    const res = await request(app).delete("/api/empleados/4");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});

