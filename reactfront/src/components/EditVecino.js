import React, { useState, useEffect } from 'react';
import axios,{AxiosError} from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const endpoint = 'http://localhost:8000/api/update/';
const endpointVecinoId = 'http://localhost:8000/api/show/';

const EditVecino = () => {
	const [name, setName] = useState('');
	const [last_name, setlastName] = useState('');
	const [piso, setPiso] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	
	const { id } = useParams();
	const navigate = useNavigate();

	const update = async (e) => {
		e.preventDefault();
		await axios.put(`${endpoint}${id}`,{
			name:name,
			last_name:last_name,
			piso:piso,
			email:email,
			
		})
		navigate('/admin')
	}
	useEffect(()=>{
		
		const getVecinoById = async () =>{
			try{
			const response = await axios.get(`${endpointVecinoId}${id}`)

			setName(response.data.name)
			setlastName(response.data.last_name)
			setPiso(response.data.piso)
			setEmail(response.data.email)
			
		} catch (err) {
            if (err && err instanceof AxiosError)
                setError(err.response?.data.msg);
            else if (err && err instanceof Error) setError(err.message);
            console.log("Error : ", error)
        }
		}
		getVecinoById();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		
		<div>
			
			<form onSubmit={update}>
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
						value={last_name}
						onChange={(e) => setlastName(e.target.value)}
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
				
				<button type='submit' className='btn btn-primary'>Enviar</button>
			</form>
		</div>
	)
}

export default EditVecino