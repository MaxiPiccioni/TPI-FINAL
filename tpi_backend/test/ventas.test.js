const request = require("supertest");
const app = require("../index");


// Test para el GET de ventas
describe("GET /api/ventas", () => {
    it("Debería devolver todas las ventas", async () => {
      const res = await request(app).get("/api/ventas");
      expect(res.statusCode).toEqual(200);
  
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id_venta: expect.any(Number),
            id_producto: expect.any(Number),
            id_cliente: expect.any(Number),
            id_local: expect.any(Number),
            fecha_venta: expect.any(String),
            cantidad: expect.any(Number),
            total: expect.any(Number),
          }),
        ])
      );
    });
  });


// Test para el GET de ventas por ID
describe("GET /api/ventas/:id", () => {
  it("Debería devolver la venta con el ID 5", async () => {
    const res = await request(app).get("/api/ventas/5");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        id_venta: expect.any(Number),
        id_producto: expect.any(Number),
        id_cliente: expect.any(Number),
        id_local: expect.any(Number),
        fecha_venta: expect.any(String),
        cantidad: expect.any(Number),
        total: expect.any(Number),
      })
    );
  });
});


// Test para el POST de una venta nueva
describe("POST /api/ventas", () => {
  const nuevaVenta = {
    id_producto: 1,
    id_cliente: 1,
    id_local: 1,
    fecha_venta: "2024-11-02",
    cantidad: 5,
    total: 1250,
  };

  it("Debería devolver la venta que acabo de crear", async () => {
    const res = await request(app).post("/api/ventas").send(nuevaVenta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_venta: expect.any(Number),
        id_producto: expect.any(Number),
        id_cliente: expect.any(Number),
        id_local: expect.any(Number),
        fecha_venta: expect.any(String),
        cantidad: expect.any(Number),
        total: expect.any(Number),
      })
    );
  });
});


// Test de PUT para modificar una venta
describe("PUT /api/ventas/:id", () => {
  const ventaModificacion = {
    id_producto: 1,
    id_cliente: 1,
    id_local: 1,
    fecha_venta: "2024-11-02",
    cantidad: 5,
    total: 1250,
  };

  it("Debería devolver la venta con el id 10 modificada", async () => {
    const res = await request(app)
      .put("/api/ventas/10")
      .send(ventaModificacion);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        venta: expect.objectContaining({
          id_venta: expect.any(Number),
          id_producto: expect.any(Number),
          id_cliente: expect.any(Number),
          id_local: expect.any(Number),
          fecha_venta: expect.any(String),
          cantidad: expect.any(Number),
          total: expect.any(Number),
        }),
      })
    );
  });
});


// Test de DELETE para eliminar una venta
describe("DELETE /api/ventas/:id", () => {
  it("Debería devolver la venta con el id 8 borrada", async () => {
    const res = await request(app).delete("/api/ventas/8");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});
