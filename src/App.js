import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {

  //Citas en local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Creando el state del arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales)

  //Hook llamado useEffect usado para realizar ciertas operaciones cuando el state cambia similar en js a eventoOnLoad
  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //Funcion que elimina citas
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  //Mensaje condicional de si hay o no citas
  const mensaje = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita = {crearCita}
            />
          </div>
          <div className="one-half column">
            <h1>{mensaje}</h1>
            {citas.map(cita => (
              <Cita
                key = {cita.id} 
                cita = {cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
