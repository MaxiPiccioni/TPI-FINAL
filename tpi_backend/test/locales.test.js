const request = require("supertest");
const app = require("../index");


// Test para el GET de locales
describe("GET /api/locales", () => {
    it("Debería devolver todos los locales", async () => {
      const res = await request(app).get("/api/locales");
      expect(res.statusCode).toEqual(200);
  
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id_local: expect.any(Number),
            nombre_loc: expect.any(String),
            direccion: expect.any(String),
            telefono: expect.any(String),
            fecha_apertura: expect.any(String),
            id_empleado: expect.any(Number),
          }),
        ])
      );
    });
  });
  

// Test para el GET de locales por nombre
describe("GET /api/locales/:nombre", () => {
  it("Debería devolver el local con el nombre 'Dulce Amistad'", async () => {
    const res = await request(app).get("/api/locales/Dulce Amistad");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        id_local: expect.any(Number),
        nombre_loc: expect.any(String),
        direccion: expect.any(String),
        telefono: expect.any(String),
        fecha_apertura: expect.any(String),
        id_empleado: expect.any(Number),
      })
    );
  });
});


// Test para el POST de un producto nuevo
describe("POST /api/locales", () => {
  const nuevoLocal = {
    nombre_loc: "Local de Prueba",
    direccion: "Calle Prueba 123",
    telefono: "123456789",
    fecha_apertura: "2024-11-02",
    id_empleado: 1,
  };

  it("Debería devolver el local que acabo de crear", async () => {
    const res = await request(app).post("/api/locales").send(nuevoLocal);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_local: expect.any(Number),
        nombre_loc: expect.any(String),
        direccion: expect.any(String),
        telefono: expect.any(String),
        fecha_apertura: expect.any(String),
        id_empleado: expect.any(Number),
      })
    );
  });
});


// Test de PUT para modificar un local
describe("PUT /api/locales/:id", () => {
  const localModificacion = {
    nombre_loc: "Local Modificado",
    direccion: "Calle Prueba 123",
    telefono: "123456789",
    fecha_apertura: "2024-11-01",
    id_empleado: 1,
  };

  it("Debería devolver el local con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/locales/1")
      .send(localModificacion);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        local: expect.objectContaining({
          id_local: expect.any(Number),
          nombre_loc: expect.any(String),
          direccion: expect.any(String),
          telefono: expect.any(String),
          fecha_apertura: expect.any(String),
          id_empleado: expect.any(Number),
        }),
      })
    );
  });
});


// Test de DELETE para eliminar un local
describe("DELETE /api/locales/:id", () => {
  it("Debería devolver el local con el id 4 borrado", async () => {
    const res = await request(app).delete("/api/locales/4");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});

