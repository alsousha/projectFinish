import React, { useEffect, useState } from 'react';


function LoginForm({onAddUser}) {
	const [visibleForm, setVisibleForm] = useState(false);
	const [loginInputValue, setLoginInputValue] = useState('');
	const [passwordInputValue, setPasswordInputValue] = useState('');
	const [isLoading, setIsloading] = useState(false);
  return (
	<div>
		<form className='formColumn'>
			<input type="text" value={loginInputValue} placeholder='Login' onChange={e => setLoginInputValue(e.target.value)}/>
			<input type="password" value={passwordInputValue} placeholder='Password'onChange={e => setPasswordInputValue(e.target.value)}/>
			<button type='submit' className='btn_main'>Login</button>
		</form>
		<div className='underline mt2'>Forget password?</div>
	  
	</div>
  )
}

export default LoginForm
