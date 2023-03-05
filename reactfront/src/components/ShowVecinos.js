import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './ShowVecinos.css'
//IMG FOR TESTING
import elzieu from './../img/elzieu.jpg';
import ayo from './../img/ayo.jpg';
import ivana from './../img/ivana.jpg';
import izan from './../img/izan.jpg';
import joseph from './../img/joseph.jpg';
import michael from './../img/michael.jpg';
import susan from './../img/susan.jpg';
import vince from './../img/vince.jpg';

//ENDPOINT
const endpoint = 'http://localhost:8000/api'

const ShowVecinos = () => {
    const [vecinos, setVecinos] = useState([])

    useEffect(() => {
        getAllVecinos()
    }, [])

    const getAllVecinos = async () => {
        const response = await axios.get(`${endpoint}/index`)
        console.log(response.data)
        setVecinos(response.data);

    }
    //TEST ONLY
    function randomImg() {
        let vecinos = [
            elzieu,ayo,ivana,izan,joseph,michael,susan,vince
        ]
        const rand = Math.trunc(0 + Math.random() * (7 - 0));
       
        return vecinos[rand]
    }

    return (
        <div className='alinear'>

            <h1>VECINOS DE LA COMUNIDAD</h1>

            <ul className="listado-grid">

                {vecinos.map((vecino) => (
                    // <Link to={`/VecinoCartas/${vecino.id}`}>
                        <div key={vecino.id} className="card text-center bg-dark animate__animated animate__fadeInUp">
                            <div className="overflow">

                                <img src={randomImg()} alt="a wallpaper" className="card-img-top" />
                            </div>

                            <div className="card-body text-light">
                                <h4 className="card-title">{vecino.name}</h4>
                                <Link to={`/createCarta/${vecino.id}`} ><i className="fa-regular fa-envelope fa-3x"></i></Link>
                                <p className="card-text text-secondary">
                                    Piso : {vecino.email}
                                </p>
                                <Link to={`/VecinoCartas/${vecino.id}`}

                                    target="_blank"
                                    className="btn btn-outline-secondary border-0"
                                    rel="noreferrer"
                                >
                                    Acceder al buzón de {vecino.name}
                                </Link>
                            </div>
                        </div>
                    // </Link>

                ))}


            </ul>

        </div>
    )
}

export default ShowVecinos