function Inicio() {
    return (
      <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
        <h1>El Rincón de lo Dulce</h1>
        <p>Este ejemplo está desarrollado con las siguientes tecnologías:</p>
        <p>
          Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite
          múltiples capas en Javascript.
        </p>
        <p>
          Frontend: Single Page Application, HTML, CSS, Bootstrap, Javascript, NodeJs y React.
        </p>
        <button className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>
          Ver Productos
        </button>
      </div>
    );
  }
  export { Inicio };
  