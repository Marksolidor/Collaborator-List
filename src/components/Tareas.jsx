import { useState } from "react";
import { tareasIniciales } from "./tareasIniciales";
import "bootstrap/dist/css/bootstrap.min.css";
const Tareas = () => {
  const [userName, setUserName] = useState("");
  const [emailName, setEmailName] = useState("");
  const [search, setSearch] = useState("");

  const [inicialList, setInicialList] = useState(tareasIniciales);
  // Function to send the form
  const sendForm = (e) => {
    e.preventDefault();
    //validation
    if (userName === "" || emailName === "") {
      alert("Todos los campos son obligatorios");
      return;
    } else {
      setInicialList([...inicialList, { nombre: userName, correo: emailName }]);
    }
    setUserName("");
  };
  //Function for the inputs value
  const capturaInput = (e) => {
    setUserName(e.target.value);
  };
  const capturaCorreo = (e) => {
    setEmailName(e.target.value);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  //Function for the filtering
  const results = !search
    ? inicialList
    : inicialList.filter(
        (dato) =>
          dato.nombre
            .toString()
            .toLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          dato.correo.toString().toLowerCase().includes(search.toLowerCase())
      );
  //Dalete button function
  const delateUser = (tarea) => {
    const listaFiltrada = inicialList.filter(
      (el) => el.nombre !== tarea.nombre
    );
    setInicialList(listaFiltrada);
  };
  return (
    <div className="box-container">
      <div className="search-container">
        <h3 className="search-title bg-dark text-white">Busqueda de colaboradores</h3>
        <input
          className="form-control inputBuscar mb-2 mt-2"
          type="text"
          value={search}
          placeholder="Búsqueda por Nombre o Correo"
          onChange={handleChange}
        />
      </div>
      <form onSubmit={sendForm}>
        <div className="container-colaborator">
          <label>Colaborador</label>
          <input
            className="form-control inputName mb-2"
            name="nombreColaborador"
            type="text"
            placeholder="Ingrese nombre de Colaborador"
            onChange={capturaInput}
          />
        </div>
        <div className="container-email">
          <label>Correo</label>
          <input
            className="form-control inputEmail mb-2"
            name="emailName"
            type="email"
            placeholder="Ingrese correo de Colaborador"
            onChange={capturaCorreo}
          />
        </div>
        <div className="add-button">
        <button className="btn btn-primary mt-3"> Agregar Colaborador </button>
        </div>
      </form>
      <table className="table table-striped table-hover mt-4 shadow-lg">
        <thead>
          <tr className="bg-dark text-white">
            <th>Colaborador</th>
            <th>Correo</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {results.map((user) => (
            <tr key={user.nombre}>
              <td>{user.nombre} </td>
              <td>{user.correo} </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => delateUser(user)}
                >
                  {" "}
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Tareas;
