import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'


const endpoint = 'http://localhost:8000/api/register'

const CreateVecino = () => {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [piso, setPiso] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const [error, setError] = useState('');
	const navigate = useNavigate();

	const store = async (e) => {
		try {
			e.preventDefault();
			const response = await axios.post(endpoint, {
				name: name,
				last_name: lastName,
				email: email,
				password: password,
				password_confirmation: passwordConfirmation,
				piso: piso,
			})
			console.log(response);
			navigate('/admin')

		} catch (err) {
			if (err && err instanceof AxiosError)
				setError(err.response?.data.msg);
			else if (err && err instanceof Error) setError(err.message);
			console.log("Error : ", error)
		}
	}
	return (
		<div>
			<form onSubmit={store}>

				<div className='mb-3'>
					<label className='form-label'>nombre</label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						type='text'
						className='form-control'
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>apellido</label>
					<input
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						type='text'
						className='form-control'
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>piso</label>
					<input
						value={piso}
						onChange={(e) => setPiso(e.target.value)}
						type='text'
						className='form-control'
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>email</label>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type='email'
						className='form-control'
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>contraseña</label>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						className='form-control'
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>contraseña confirmacion</label>
					<input
						value={passwordConfirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
						type='password'
						className='form-control'
					/>
				</div>
				<button type='submit' className='btn btn-primary'>Enviar</button>
			</form>
		</div>
	)
}

export default CreateVecino