import React from 'react'
import { useSignOut } from 'react-auth-kit'
import { Link } from 'react-router-dom'


const NavBar = () => {
    const SignOut = useSignOut();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <Link className="navbar-brand" to="/">Administracion</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="true"
                    aria-label="Togglenavigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to='/' className='nav-link'> Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin' className='nav-link'> Admin </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/login' className='nav-link'> Login </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/register' className='nav-link'> Register </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/' className='nav-link' onClick={SignOut}> Sign Out </Link>
                        </li>



                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar