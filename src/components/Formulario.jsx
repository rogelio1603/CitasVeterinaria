import React, {Fragment, useState} from 'react'
import uuid from 'react-uuid'
import PropTypes from 'prop-types'

const Formulario = ({crearCita}) => {

    //Crear state de cita
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    //Crear el state de error
    const [error, actualizarError] = useState(false)

    const actualizarState = e => {
        //Esta funcion me va a ayudar mucho para escribir el contenido de los input en el state
        actualizarCita({ //Se modifica el estado
        ...cita,        //Se toma una copia del estado anterior, antes de ser modificado
        [e.target.name] : e.target.value //Se actualiza el estado desde el input hasta el objeto
    })
    }

    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Validar y enviar informacion al presionar boton
    const submitCita = e => {
        e.preventDefault();

        //Validación
        //.trim es un metodo que te ayuda a que si el usuario agrega espacios en blanco al inicio o al final, los elimine.
        if(mascota.trim() ==='' || propietario.trim() ==='' || fecha.trim() ==='' || hora.trim() ==='' || sintomas.trim() ===''){
            actualizarError(true);
            return;
        }

        //Quitar el mensaje de error cuando ya haya todo salido bien
        actualizarError(false);

        //Asignar ID, porque cada objeto debe de tener un id (key) en React
        cita.id = uuid();
        
        //Crear la cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '' 
        })
    }

    return (  
        <Fragment>
            <h1>Formulario de citas</h1>
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }
            <form 
                onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange = {actualizarState}
                    value={mascota}
                />

                <label>Nombre dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño de la mascota"
                    onChange = {actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange = {actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange = {actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    placeholder="Sintomas de la mascota"
                    onChange = {actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar</button>
            </form>
        </Fragment>
    );
}

//Documentación de los componentes usando PropTypes
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;