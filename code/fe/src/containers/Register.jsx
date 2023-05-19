import React, {useState} from 'react'
import { Link} from 'react-router-dom';
import axios from 'axios'

const Register = () => {
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: ""
	})
	const handleChange = e=>{
		setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
	}
	const handleSubmit = async e=>{
		e.preventDefault()
		console.log(inputs);
		try{
			//const res = await axios.post("http://localhost:8800/api/auth/register", inputs)
			// await axios.post("/api/auth/register", inputs);
			axios.post("http://localhost:8800/api/auth/register", inputs);
		}catch(err){
			console.log(err);
		}
		

	}
		return (
				<div className='auth'>
					<h1>Register</h1>
						<form action="">
							<input type="text" placeholder='username' name="username" onChange={handleChange}/>
							<input type="email" placeholder='email' name="email" onChange={handleChange}/>
							<input type="password" placeholder='password' name="password" onChange={handleChange}/>
							<button onClick={handleSubmit}>Register</button>
							<p>This is an error!</p>
							<span>Do you have an account? <Link to="/">Login</Link></span>
						</form>
				</div>
		)
}

export default Register
