import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import { ReactComponent as BackIcon } from '../../assets/img/back.svg';


function Reset() {
	const [input, setInput] = useState()
	const [isFormVisiable, setIsFormVisiable] = useState(true)
	const [err, setError] = useState(null);


	const handleChange = e=>{
		setInput(e.target.value)
	}
	const handleSubmit = async e=>{
		e.preventDefault()
		if(isValidEmail (input)){
			try{
				const res = await axios.post(`/users/reset`, {email: input});
				if(res.status === 200){
					setIsFormVisiable(false)
					setError('')
				}else if(res.status===204){
					setError('User not found.')
				}
			}catch(err){
				setError(err.response.data)
			}
			
		}else{
			setError("Invalid email. Try again!")
		}		
	}
	// Helper function to check email format using regular expression
	const isValidEmail = (email) => {
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		return emailRegex.test(email);
	};
	return (
		<div>

			<div className="container">
			<div className="back mt2 mb3 btn_main">
				<Link className="d-flex aic g1" to="/"><BackIcon/><span>Go Back</span></Link>
			</div>
			<div className="reset_password">
				{isFormVisiable && (<form className='formColumn'>
					<input 
						type="email" 
						name="email"
						placeholder='Email:' 
						onChange={handleChange}
						required
					/>
					
					<button onClick={handleSubmit} className='btn_main'>Send request</button>
					{err && <p className='error'>{err}</p>}
				</form>)}
				{!isFormVisiable && (
					<div>
						<h2>Password recovery</h2>
						<div>An email has been sent to <b>{input}</b> with a link to change the password.</div>
						<div>If you have not received such an email, please check your spam folder.</div>
					</div>
				)}
			</div>
			</div>
		</div>
	)
}

export default Reset
