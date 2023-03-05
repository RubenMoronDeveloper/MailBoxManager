import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';


const endpoint = 'http://localhost:8000/api/show/';
const endpointCartas = 'http://localhost:8000/api/cartaList/';
const endpointCartaDelete = 'http://localhost:8000/api/carta/';
const endpointAuth = 'http://localhost:8000/api/user-profile/';

const VecinoCartas = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [piso, setPiso] = useState('');
  const [cartas, setCartas] = useState([]);
  const [actualAuthUser, setActualAuthUser] = useState('');
  const { id } = useParams();
  const [error, setError] = useState('');
  const access_token = "4|Bj3WTZnHdjWkttIicDCkTqNSIvmewcxoqYpn0YzF";
 


  useEffect(() => {
    getCartasById();
    getVecinoById();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const authenticatedUser = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
        withCredentials:true
      };
      const response = await axios.get(endpointAuth,config)
      /* const response = await axios.get(endpointAuth,{
        withCredentials:true,
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
        data:{},
      
        
      }) */
      
      
      console.log(response);
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.msg);
      else if (err && err instanceof Error) setError(err.message);
      console.log("Error : ", error)
    }
  }
  const getVecinoById = async () => {
    const response = await axios.get(`${endpoint}${id}`)

    setNombre(response.data.name)
    setApellido(response.data.last_name)
    setPiso(response.data.piso)
  }
  const getCartasById = async () => {
    const response = await axios.get(`${endpointCartas}${id}`)

    setCartas(response.data.cartas)

  }
  const deleteCarta = async (id) => {
    await axios.delete(`${endpointCartaDelete}${id}`)
    getCartasById();
  }

  return (

    <div>
      <button onClick={authenticatedUser}>EEEEE</button>
      <h1>Vecino : {nombre}</h1>
      <p>Apellido : {apellido}</p>
      <p>piso : {piso}</p>
      <table className='table'>
        <thead className=''>
          <tr>
            <th>Id</th>
            <th>Remitente</th>
            <th>Contenido</th>
            <th>Id_piso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>

          {cartas.map((carta) => (
            <tr key={carta.id}>
              <td>{carta.id}</td>
              <td>{carta.remitente}</td>
              <td>{carta.contenido}</td>
              <td>{carta.id_piso}</td>
              <td>
                {/* <Link to={`/edit/${carta.id}`} className='btn btn-primary mr-2'> EDIT </Link> */}
                <button onClick={() => deleteCarta(carta.id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VecinoCartas