const request = require("supertest");
const app = require("../index");


// Test para el GET de productos
describe("GET /api/productos", () => {
    it("Debería devolver todos los productos", async () => {
      const res = await request(app).get("/api/productos");
      expect(res.statusCode).toEqual(200);
  
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id_producto: expect.any(Number),
            nombre_prod: expect.any(String),
            precio: expect.any(Number),
            fecha_elaboracion: expect.any(String),
            id_proveedor: expect.any(Number),
          }),
        ])
      );
    });
  });
  

// Test para el GET de productos por nombre
describe("GET /api/productos/:nombre", () => {
  it("Debería devolver el producto con el nombre 'Brownie'", async () => {
    const res = await request(app).get("/api/productos/Brownie");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        id_producto: expect.any(Number),
        nombre_prod: expect.any(String),
        precio: expect.any(Number),
        fecha_elaboracion: expect.any(String),
        id_proveedor: expect.any(Number),
      })
    );
  });
});


// Test para el POST de un producto nuevo
describe("POST /api/productos", () => {
  const nuevoProducto = {
    nombre_prod: "Galleta de Vainilla",
    precio: 150,
    fecha_elaboracion: "2024-11-02",
    id_proveedor: 1,
  };

  it("Debería devolver el producto que acabo de crear", async () => {
    const res = await request(app).post("/api/productos").send(nuevoProducto);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_producto: expect.any(Number),
        nombre_prod: expect.any(String),
        precio: expect.any(Number),
        fecha_elaboracion: expect.any(String),
        id_proveedor: expect.any(Number),
      })
    );
  });
});


// Test de PUT para modificar un producto
describe("PUT /api/productos/:id", () => {
  const productoModificacion = {
    nombre_prod: "Galleta de Limón",
    precio: 200,
    fecha_elaboracion: "2024-11-02",
    id_proveedor: 2,
  };

  it("Debería devolver el producto con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/productos/1")
      .send(productoModificacion);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        producto: expect.objectContaining({
          id_producto: expect.any(Number),
          nombre_prod: expect.any(String),
          precio: expect.any(Number),
          fecha_elaboracion: expect.any(String),
          id_proveedor: expect.any(Number),
        }),
      })
    );
  });
});


// Test de DELETE para eliminar un producto
describe("DELETE /api/productos/:id", () => {
  it("Debería devolver el producto con el id 4 borrado", async () => {
    const res = await request(app).delete("/api/productos/4");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});
