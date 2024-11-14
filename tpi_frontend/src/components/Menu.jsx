import React from "react";
import { NavLink } from "react-router-dom";
import AuthService from "./services/auth.service";


function Menu() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    AuthService.getUsuarioLogueado()
  );

  function CambioUsuarioLogueado(_usuarioLogueado) {
    setUsuarioLogueado(_usuarioLogueado);
  }

  useEffect(() => {
    AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);
    return () => {
      AuthService.subscribeUsuarioLogueado(null);
    }
  }, []);


  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <a className="navbar-brand">
        <i className="fa fa-cake"></i>
        &nbsp;<i>El Rincón de lo Dulce</i>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/inicio">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/productos">
              Productos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" title="exclusivo para administradores" to="/articulosjwt">
              Productos JWT
            </NavLink>
            </li>
        </ul>
        <ul className="navbar-nav ms-auto">
              {usuarioLogueado && (
                <li className="nav-item">
                  <a className="nav-link" href="#!">Bienvenido: {usuarioLogueado}</a>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/login/Inicio">
                  <span
                    className={
                      usuarioLogueado ? "text-warning" : "text-success"
                    }
                  >
                    <i
                      className={
                        usuarioLogueado ? "fa fa-sign-out" : "fa fa-sign-in"
                      }
                    ></i>
                  </span>
                  {usuarioLogueado ? " Logout" : " Login"}
                </NavLink>
              </li>
            </ul>
        </div>
      </nav>
  );
}
export {Menu};
