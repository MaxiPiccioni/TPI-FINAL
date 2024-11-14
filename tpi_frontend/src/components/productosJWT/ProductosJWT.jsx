import React, { useState, useEffect } from "react";
import { productosJWTservice } from "../services/productosJWT.service";

function ProductosJWT() {
  const tituloPagina = "Productos JWT (solo para administradores)";
  const [productos, setProductos] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarProductosJWT();
  }, []);


  async function BuscarProductosJWT() {
     try {
      let data = await productosJWTservice.Buscar();
      setProductos(data);
    } catch (error) {
      console.log("error al buscar datos en el servidor!")
    }
  }

  return (
    <>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Nombre Producto</th>
            <th style={{ width: "30%" }}>Precio</th>
            <th style={{ width: "30%" }}>Fecha Elaboracion</th>
            <th style={{ width: "30%" }}>ID Proveedor</th>
          </tr>
        </thead>
        <tbody>
          {productos &&
            productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.fecha_elaboracion}</td>
                <td>{producto.id_proveedor}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
ProductosJWT.NombreComponenteNoOfuscado = "ProductosJWT";
export { ProductosJWT };