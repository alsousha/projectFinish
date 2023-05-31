import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios'

const Register = () => {
	const [inputs, setInputs] = useState({
		username: "",
		role: "",
		email: "",
		password: ""
	})
	const [err, setError] = useState(null);

	const navigate = useNavigate()
	const handleChange = e=>{
		// console.log(e.target.options[2].name);
		setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
		
	}
	const handleSubmit = async e=>{
		// console.log(inputs);
		e.preventDefault()
		try{
			await axios.post("/auth/register", inputs);
			//!!! add timeout for msg success
			navigate('/')
		}catch(err){
			setError(err.response.data)
		}
	}
		return (
				<div className='auth'>
					<h1>Register</h1>
						<form action="">
							<input type="text" placeholder='Username:' name="username" onChange={handleChange}/>
							<input type="text" placeholder='Lastname:' name="lastname" onChange={handleChange}/>
							<select id="mySelect" name="role" onChange={handleChange}>
								<option value="">Select a role</option>
								<option value="teacher">Teacher</option>
								<option value="student">Student</option>
							</select>
							<input type="email" placeholder='Email:' name="email" onChange={handleChange}/>
							<input type="password" placeholder='Password:' name="password" onChange={handleChange}/>
							<button onClick={handleSubmit} className='btn_accent hover-scale'>Register</button>
							{err && <p className='error'>{err}</p>}
							<div className='mt2 hover-line dark'>
								<span>Do you have an account?</span>&emsp;
								<span className='italic'>
									<Link to="/">Login</Link>
								</span> 
							</div>

						</form>
				</div>
		)
}

export default Register