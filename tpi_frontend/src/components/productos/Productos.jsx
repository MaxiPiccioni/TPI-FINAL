import React, { useState, useEffect } from "react";
import moment from "moment";
import { productosService } from "../services/productos.service";
import modalDialogService from "../services/modalDialog.service";
import { Menu } from "../Menu";
import  ProductosBuscar  from "./ProductosBuscar"; 
import  ProductosListado  from "./ProductosListado";
import  ProductosRegistro  from "./ProductosRegistro";

function Productos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarProductos() {
      let data = await productosService.Buscar(Nombre, Pagina);
      setItems(data.Productos);
      setRegistrosTotal(data.RegistrosTotal);
    }
    BuscarProductos();
    Buscar();
  }, []);

    async function Buscar(_pagina) {
        if (_pagina && _pagina !== Pagina) {
        setPagina(_pagina);
        }
        // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
        else {
        _pagina = Pagina;
        }
        modalDialogService.BloquearPantalla(true);
        const data = await productosService.Buscar(Nombre, Activo, _pagina);
        modalDialogService.BloquearPantalla(false);

        setItems(data.Items);
        setRegistrosTotal(data.RegistrosTotal);


        //generar array de las paginas para mostrar en select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
        arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
  }



  async function BuscarPorId(item, accionABMC) {
    const data = await productosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(producto) {
    BuscarPorId(producto, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(producto) {
    if (!producto.activo) {
      //alert("No puede modificarse un registro Inactivo.");
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(producto, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        id_producto: 0,
        nombre_prod: "",
        precio: "",
        fecha_elaboracion: moment(new Date()).format("YYYY-MM-DD"),
        id_proveedor: "",
        Activo: true,
      });
    alert("preparando el Alta...");
  }


  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
        "Esta seguro que quiere " +
          (item.Activo ? "desactivar" : "activar") +
          " el registro?",
        undefined,
        undefined,
        undefined,
        async () => {
          await productosService.ActivarDesactivar(item);
          await Buscar();
        }
      );
  }
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await productosService.Grabar(item);
    }
    catch (error)
    {
      alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }


  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <Menu></Menu>
      <div className="container">
        <div className="tituloPagina">
          Productos <small>{TituloAccionABMC[AccionABMC]}</small>
        </div>

        {AccionABMC === "L" && (
          <ProductosBuscar
            Nombre={Nombre}
            setNombre={setNombre}
            Activo={Activo}
            setActivo={setActivo}
            Buscar={Buscar}
            Agregar={Agregar}
          />
        )}
        {AccionABMC === "L" && Items?.length > 0 && (
          <ProductosListado
            {...{
              Productos,
              Consultar,
              Modificar,
              ActivarDesactivar,
              RegistrosTotal,
              Buscar,
              Paginas,
              Pagina,
            }}
          />
        )}
        {AccionABMC === "L" && Items?.length === 0 && (
          <div className="alert alert-info mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            No se encontraron registros...
          </div>
        )}

        {/* Formulario de alta/modificacion/consulta */}
        {AccionABMC !== "L" && (
          <ProductosRegistro {...{ AccionABMC, Producto, Grabar, Volver }} />
        )}
      </div>
    </div>
  );
}
export { Productos };
