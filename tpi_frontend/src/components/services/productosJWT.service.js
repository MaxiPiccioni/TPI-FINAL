
import httpService from "./http.service";
const urlServidor = "http://localhost:3000";
const urlResourceProductos = urlServidor + "/api/productosJWT";

const urlResource = urlResourceProductos;


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


export const productosJWTservice = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
