const request = require("supertest");
const app = require("../index");


// Test para el GET de proveedores
describe("GET /api/proveedores", () => {
    it("Debería devolver todos los proveedores", async () => {
      const res = await request(app).get("/api/proveedores");
      expect(res.statusCode).toEqual(200);
  
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id_proveedor: expect.any(Number),
            nombre_empresa: expect.any(String),
            nombre_proveedor: expect.any(String),
            telefono: expect.any(String),
            fecha_registro: expect.any(String),
          }),
        ])
      );
    });
  });


// Test para el GET de proveedores por nombre (recordar que es nombre proveedor, no empresa)
describe("GET /api/proveedores/:nombre", () => {
  it("Debería devolver el proveedor con el nombre 'Ana Castro'", async () => {
    const res = await request(app).get("/api/proveedores/Ana Castro");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        id_proveedor: expect.any(Number),
        nombre_empresa: expect.any(String),
        nombre_proveedor: expect.any(String),
        telefono: expect.any(String),
        fecha_registro: expect.any(String),
      })
    );
  });
});


// Test para el POST de un proveedor nuevo
describe("POST /api/proveedores", () => {
  const nuevoProveedor = {
    nombre_empresa: "Proveedores ACME",
    nombre_proveedor: "Carlos Prueba",
    telefono: "123456789",
    fecha_registro: "2024-11-02",
  };

  it("Debería devolver el proveedor que acabo de crear", async () => {
    const res = await request(app).post("/api/proveedores").send(nuevoProveedor);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_proveedor: expect.any(Number),
        nombre_empresa: expect.any(String),
        nombre_proveedor: expect.any(String),
        telefono: expect.any(String),
        fecha_registro: expect.any(String),
      })
    );
  });
});


// Test de PUT para modificar un proveedor
describe("PUT /api/proveedores/:id", () => {
  const proveedorModificacion = {
    nombre_empresa: "Empresa XYZ",
    nombre_proveedor: "José Martínez",
    telefono: "123456789",
    fecha_registro: "2024-11-02",
  };

  it("Debería devolver el proveedor con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/proveedores/1")
      .send(proveedorModificacion);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        proveedor: expect.objectContaining({
          id_proveedor: expect.any(Number),
          nombre_empresa: expect.any(String),
          nombre_proveedor: expect.any(String),
          telefono: expect.any(String),
          fecha_registro: expect.any(String),
        }),
      })
    );
  });
});


// Test de DELETE para eliminar un proveedor
describe("DELETE /api/proveedores/:id", () => {
  it("Debería devolver el proveedor con el id 4 borrado", async () => {
    const res = await request(app).delete("/api/proveedores/4");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});
