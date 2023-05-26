import React, { useState, useRef } from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios'

import './forms.scss'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import editSvg from '../../assets/img/edit.svg'
import saveSvg from '../../assets/img/check-black.svg'


function UserEditForm({handleEditFormHide, currentUser}) {
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



	const userData = null //!!tmp var
	//input Name
	const nameInput = useRef(null);
	const [inputNameValue, setInputNameValue] = useState(currentUser.name);
	const [isActiveInputName, setIsActiveInputName] = useState(false);
	const [inputStyleInputName, setInputStyleInputName] = useState({'border':'none'});
	const [isReadonlyInputName, setIsReadonlyInputName] = useState(true);
	const [editIconInputName, setEditIconInputName] = useState(editSvg);

	const updateUserInfo = ()=>{

	}
	const editUserName = () =>{
		nameInput.current.focus()
		if(!nameInput.current.value){
			setInputStyleInputName({'borderColor': 'red'})
			return
		}
		setIsReadonlyInputName(prevState => !prevState) //change input visiable (can enter data to input)
		setIsActiveInputName(prevState => !prevState) //toggle active class for item
		setEditIconInputName(prevState => prevState===editSvg? saveSvg : editSvg) //toggle edit/save btns
		setInputStyleInputName({'border': '1px solid blue'})
	}
	//end input Name

	//input lastname
	const lastnameInput = useRef(null);
	const [inputLastnameValue, setInputLastnameValue] = useState(currentUser.lastname);
	const [isActiveInputLastname, setIsActiveInputLastname] = useState(false);
	const [inputStyleInputLastname, setInputStyleInputLastname] = useState({'border':'none'});
	const [isReadonlyInputLastname, setIsReadonlyInputLastname] = useState(true);
	const [editIconInputLastname, setEditIconInputLastname] = useState(editSvg);

	const editUserLastname = () =>{
		lastnameInput.current.focus()
		if(!lastnameInput.current.value){
			setInputStyleInputLastname({'borderColor': 'red'})
			return
		}
		setIsReadonlyInputLastname(prevState => !prevState) //change input visiable (can enter data to input)
		setIsActiveInputLastname(prevState => !prevState) //toggle active class for item
		setEditIconInputLastname(prevState => prevState===editSvg? saveSvg : editSvg) //toggle edit/save btns
		setInputStyleInputLastname({'border': '1px solid blue'})
	}
	//end input Lastname
  return (
	<>
	<form action='' className='editUserInfo popup' onSubmit={updateUserInfo}>
		<button className='btnClose hover-scale' onClick={handleEditFormHide}>
			<CancelTwoToneIcon />
		</button>
		<div className="editUserInfo__wrap d-flex jcsb">
			<div className="editUserInfo__left w55">
				<h2>Edit user: {currentUser.name}</h2>
				<div className="userInfo">
					<div className="userInfo__item d-flex">
						<span className='userLabel label'>Lastname:</span>
						<div className="change_input w25r d-flex">
							<input 
								ref={lastnameInput}
								className={isActiveInputLastname? 'active change_input ': 'change_input '}
								placeholder="Enter name"
								style={inputStyleInputLastname}
								readOnly={isReadonlyInputLastname}
								value={inputLastnameValue} 
								// onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
								onChange={e => setInputLastnameValue(e.target.value)} 
							/>
							<div className={isActiveInputName? 'input__btn active': 'input__btn '} >
								<img 
									src={editIconInputLastname} 
									alt="edit icon"
									onClick={editUserLastname}
								/>							
							</div>
						</div>
					</div>
					<div className="userInfo__item d-flex">
						<span className='userLabel label'>Name:</span>
						<div className="change_input w25r d-flex">
							<input 
								ref={nameInput}
								className={isActiveInputName? 'active change_input ': 'change_input '}
								placeholder="Enter name"
								style={inputStyleInputName}
								readOnly={isReadonlyInputName}
								value={inputNameValue} 
								// onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
								onChange={e => setInputNameValue(e.target.value)} 
							/>
							<div className={isActiveInputName? 'input__btn active': 'input__btn '} >
								<img 
									src={editIconInputName} 
									alt="edit icon"
									onClick={editUserName}
								/>							
							</div>
						</div>
					</div>
					{currentUser.role === "teacher" ? (
						<div className="userInfo__item d-flex">
							<span className='userLabel label'>Subject:</span>
							<span className='label'>{currentUser.sbj}</span>
						</div>
					)
						: (<div></div>)
					}
					
				</div>
			</div>
			<div className="editUserInfo__right w40">
				{/* <img src={currentUser.userImgLink} alt="user Image" className='userImg' /> */}
				<span>Change your avatar</span>
			</div>
		</div>
		<div className="form__bottom d-flex jcsb">
			<input type="submit" />
			<button>Delete account</button>
		</div>
		

		
	</form>
	<div onClick={handleEditFormHide} className='overlay'></div>
      </>
  )
}

export default UserEditForm
