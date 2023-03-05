import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/show/';
const endpointCarta = 'http://localhost:8000/api/carta/'
const endpointVecino = 'http://localhost:8000/api/vecino/'

const CreateCarta = () => {
    const [remitente, setRemitente] = useState('');
    const [contenido, setContenido] = useState('');
    const [nombreVecino,setNombreVecino ] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
 
    const store = async (e) => {
        e.preventDefault();
        await axios.post(endpointCarta, { remitente: remitente, contenido: contenido, id_piso: id })
        navigate('/')
    }

    useEffect(()=>{
        
        const getVecinoById = async () =>{
            const response = await axios.get(`${endpoint}${id}`)
            console.log(response.data);
            setNombreVecino(response.data.name)
                   
        }
        getVecinoById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div>
            <form onSubmit={store}>
                <h1 className='form-label'>Enviar mensaje a {nombreVecino} </h1>
                <div className='mb-3'>
                    <label className='form-label'>remitente</label>
                    <input
                        value={remitente}
                        onChange={(e) => setRemitente(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>

                    <label className='form-label'>Contenido</label>
                    <textarea
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                       
                        rows={10}
                        className='form-control'
                    />
                </div>
                
                <button type='submit' className='btn btn-primary'>Enviar</button>
            </form>
        </div>
    )
}
export default CreateCarta
