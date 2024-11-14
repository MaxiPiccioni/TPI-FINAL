const request = require("supertest");
const app = require("../index");


// Test para el GET de clientes
describe("GET /api/clientes", () => {
    it("Debería devolver todos los clientes", async () => {
      const res = await request(app).get("/api/clientes");
      expect(res.statusCode).toEqual(200);
  
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id_cliente: expect.any(Number),
            nombre_cliente: expect.any(String),
            email: expect.any(String),
            telefono: expect.any(String),
            fecha_registro: expect.any(String),
          }),
        ])
      );
    });
  });


// Test para el GET de clientes por nombre
describe("GET /api/clientes/:nombre", () => {
  it("Debería devolver el cliente con el nombre 'Juliana Morales'", async () => {
    const res = await request(app).get("/api/clientes/Juliana Morales");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        id_cliente: expect.any(Number),
        nombre_cliente: expect.any(String),
        email: expect.any(String),
        telefono: expect.any(String),
        fecha_registro: expect.any(String),
      })
    );
  });
});
  

// Test para el POST de un cliente nuevo
describe("POST /api/clientes", () => {
  const nuevoCliente = {
    nombre_cliente: "Ana Gómez",
    email: "ana.gomez@example.com",
    telefono: "987654321",
    fecha_registro: "2024-11-02",
  };

  it("Debería devolver el cliente que acabo de crear", async () => {
    const res = await request(app).post("/api/clientes").send(nuevoCliente);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_cliente: expect.any(Number),
        nombre_cliente: expect.any(String),
        email: expect.any(String),
        telefono: expect.any(String),
        fecha_registro: expect.any(String),
      })
    );
  });
});


// Test de PUT para modificar un cliente
describe("PUT /api/clientes/:id", () => {
  const clienteModificacion = {
    nombre_cliente: "María López",
    email: "maria.lopez@example.com",
    telefono: "987654321",
    fecha_registro: "2024-11-02",
  };

  it("Debería devolver el cliente con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/clientes/1")
      .send(clienteModificacion);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        cliente: expect.objectContaining({
          id_cliente: expect.any(Number),
          nombre_cliente: expect.any(String),
          email: expect.any(String),
          telefono: expect.any(String),
          fecha_registro: expect.any(String),
        }),
      })
    );
  });
});


// Test de DELETE para eliminar un cliente
describe("DELETE /api/clientes/:id", () => {
  it("Debería devolver el cliente con el id 4 borrado", async () => {
    const res = await request(app).delete("/api/clientes/4");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});
