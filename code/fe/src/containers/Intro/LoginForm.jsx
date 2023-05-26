import React, { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios'

import { API_URL } from '../../constans';
import { AuthContext } from '../../context/authContext';

function LoginForm() {
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: ""
	})
	const [err, setError] = useState(null);

	const navigate = useNavigate()
	const {login, currentUser } = useContext(AuthContext)
	

	const handleChange = e=>{
		setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
	}
	const handleSubmit = async e=>{
		e.preventDefault()
		// console.log(inputs);
		try{
			await login(inputs)
			// const currentLink = currentUser ? `/${currentUser['role']}/*` : '/'
			// //console.log("currentLink" +currentUser);
			// // navigate(`${currentLink}`)
			navigate('/')
		}catch(err){
			setError(err.response.data)
		}
	}
  return (
	<div>
		<form className='formColumn'>
			<input 
				type="email" 
				name="email"
				placeholder='Login:' 
				onChange={handleChange}
				required
			/>
			<input 
				type="password" 
				name="password"
				placeholder='Password:'
				onChange={handleChange}
				required
			/>
			<button onClick={handleSubmit} className='btn_main'>Login</button>
			{err && <p className='error'>{err}</p>}
		</form>
		<div className='italic mt2 hover-line'><Link to="/register">Forget password?</Link></div>
		<div className='mt2 hover-line '>
			<span>Don't you have an account?</span>&emsp;
			<span className='italic'>
				<Link to="/register" className="">Register</Link>
			</span> 
		</div>
	  
	</div>
  )
}

export default LoginForm
