import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NotFound from '../../pages/404';
import Loading from '../../components/Loading';

const PasswordResetForm = () =>  {
	const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const token = searchParams.get('token');
	const navigate = useNavigate()
	
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [err, setError] = useState(null);
	const [isPageNotFound, setIsPageNotFound] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState({}); //msg from DB
	
	
	useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.post("/users/check_token", { token });
				// console.log(res.status);
				if(res.status===200){
					setIsPageNotFound(false)
				}
      } catch (err) {
        console.log(err);
      }finally {
        setIsLoading(false);
      }
    };
    checkToken();
  },[]);
  const handleSubmit = async (e) => {
		setError('')
    e.preventDefault();
		if(newPassword!==confirmPassword){
			setError("Passwords do not match")
			return
		}

    try {
      const res = await axios.post('/users/update-password', { email, newPassword, token });
      // console.log(res); // Password reset successful
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				message: res.status===200 ? "Password has been updated" :"Error updating password. Try later"
			}	
			setMessage(msg);
			setTimeout(() => {
				navigate("/")
			}, 2000);
      // Handle any further actions after successful password reset
    } catch (error) {
      console.error(error);
    }
  };
	if (isLoading) {
    return <Loading/>;
  }
	return (
		<div>
			<div className="container">{isPageNotFound}
				{isPageNotFound && <NotFound/>}
				{!isPageNotFound &&
				<form onSubmit={handleSubmit} className='d-flex f-column mt4'>
					<label htmlFor="newPassword"><h2>New Password</h2></label>
					<input
						type="password"
						id="newPassword"
						placeholder='New password:'
						value={newPassword}
						className='mb1 mt2'
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<input
						type="password"
						id="confirmPassword"
						placeholder='Confirm password:'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<button type="submit" className='btn_accent hover-scale mt2'>Reset Password</button>
					{err && <p className='error mt1'>{err}</p>}
					<div className="msg_block">
						{message ? <span className={message.msgClass}>{message.message}</span> : <span></span>}
					</div>
				</form>
				}
			</div>
			
		</div>
	)
}

export default PasswordResetForm
