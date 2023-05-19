import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';



function LoginForm({setIsLoggedIn, setUserName}) {
	const [visibleForm, setVisibleForm] = useState(false);
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsloading] = useState(false);

	const navigate = useNavigate();

	const handlLoginChange = (e) => {
		setLogin(e.target.value);
	  };
	  const handlPasswordChange = (e) => {
		setPassword(e.target.value);
	  };
	  const handleLogIn = (e) => {
		e.preventDefault();
		setIsLoggedIn(true); //change app state if user is logged
		// setUserName(login); //send userName to header
		localStorage.setItem('isLoggedIn', true);
		localStorage.setItem('userName', login);
		navigate('/teacher');
		// navigate('/student');
		// navigate('/admin');
	  };


  return (
	<div>
		<form className='formColumn' onSubmit={handleLogIn}>
			<input 
				type="text" 
				value={login} 
				placeholder='Login' 
				onChange={handlLoginChange}
				required
			/>
			<input 
				type="password" 
				value={password} 
				placeholder='Password'
				onChange={handlPasswordChange}
				required
			/>
			<button type='submit' className='btn_main'>Login</button>
		</form>
		<div className='underline mt2'>Forget password?</div>
		<div className='mt2'>Don't you have an account? <Link to="/register"><span className='underline'>Register</span></Link> </div>
	  
	</div>
  )
}

export default LoginForm
