import React, {useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios'

const Register = () => {
	const [sbjs, setSbjs] = useState({})
	const [inputs, setInputs] = useState({
		username: "",
		role: "",
		email: "",
		password: "",
		img_url:"avatar-2.svg"
	})
	const [err, setError] = useState(null);
	const [visiableSbjInput, setVisiableSbjInput] = useState(false)

	//set sbjs from bd
	useEffect(() => {
    const fetchSbjs = async () => {
      try {
        const res = await axios.get("/sbjs/");
        setSbjs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSbjs();
  },[]);

	const navigate = useNavigate()
	const handleChange = async e=>{
		// console.log(e.target.options[2].name);
		if(e.target.name==="role"){
			if(e.target.value==="teacher"){
				
				setVisiableSbjInput(true)
			}else{
				setVisiableSbjInput(false)
			}
		}
		setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
		
	}
	const handleSubmit = async e=>{
		e.preventDefault()
		// console.log(inputs);
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
							<select id="mySelect" name="role" onChange={handleChange}>
								<option value="">Select a role</option>
								<option value="teacher">Teacher</option>
								<option value="student">Student</option>
							</select>
							{visiableSbjInput && (
							<select id="sbjs" name="sbj" onChange={handleChange}>
								 {sbjs.map(option => (
										<option key={option.id_subject} value={option.id_subject}>
											{option.subject_name}
										</option>
									))}
							</select>
							)}

							<input type="text" placeholder='Username:' name="username" onChange={handleChange}/>
							<input type="text" placeholder='Lastname:' name="lastname" onChange={handleChange}/>
							
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
