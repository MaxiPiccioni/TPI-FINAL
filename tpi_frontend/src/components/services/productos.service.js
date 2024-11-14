import httpService from "./http.service";
const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2024/api/articulos";
// mas adelante podemos usar un archivo de configuracion para el urlResource
// import {config} from "../config";
// const urlResource = config.urlResourceArticulos;


async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.id_producto);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.id_producto);
}


async function Grabar(item) {
  if (item.id_producto === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.id_producto, item);
  }
}


export const productosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
