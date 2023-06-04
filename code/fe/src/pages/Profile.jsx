import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext';
import axios from 'axios'

import './pages.scss'
import editSvg from '../assets/img/edit.svg'
import { ReactComponent as EditIcon } from '../assets/img/edit.svg';
import saveSvg from '../assets/img/check-black.svg'
// import { light } from '@mui/material/styles/createPalette';

function Profile() {
	const { currentUser, deleteUser, updateUser} = useContext(AuthContext)
	const [userData, setUserData] = useState(currentUser);
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(true);
	const [editing, setEditing] = useState(false);
	const [errors, setErrors] = useState({}); //Validations errors
	const [sbjs, setSbjs] = useState([]) //subjects from DB
	const [selectedSubjects, setSelectedSubjects] = useState([]); //has names of sbjs
	const [message, setMessage] = useState({}); //msg from DB
	const [messagePassword, setMessagePassword] = useState({}); //msg for password section from DB
	
	const [isResetPasswordVisiable, setIsResetPasswordVisiable] = useState(false)
	// console.log(userData);
	// console.log(sbjs);
	
	const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
	const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
		const fieldErrors = validateField();
		if (Object.keys(fieldErrors).length === 0) {
			setEditing(false);
			// setIsResetPasswordVisiable(false)
      // setEditingFields((prevEditingFields) => ({
				
      //   ...prevEditingFields,
      //   [fieldName]: false,
      // }));
		
			console.log("saved");
      setErrors({});
			// setIsCurrentInputValid(true)
      // Update user data with the changes
			update()
    } else {
      setErrors(fieldErrors);
			// setIsCurrentInputValid(false)
    }
    
    // Update user data with the changes
    // You can send the updated data to an API or perform any necessary actions here
  };

	//manage checboxes of sbjs
	const handleSubjectChange = (e) => {
    const { value } = e.target;
    const updatedSelectedSubjects = [...selectedSubjects];

    if (updatedSelectedSubjects.includes(value)) {
      // Remove the subject from the selected subjects if it was unchecked
      const index = updatedSelectedSubjects.indexOf(value);
      updatedSelectedSubjects.splice(index, 1); //remove unchecked item from list (updatedSelectedSubjects)
    } else {
      // Add the subject to the selected subjects if it was checked
      updatedSelectedSubjects.push(value);
    }

    setSelectedSubjects(updatedSelectedSubjects); //update selected sbjs
		//update userData (tmp)
		setUserData((prevUserData) => ({
      ...prevUserData,
      sbjs: updatedSelectedSubjects,
    }));
  };
	
	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case 'password':
				setPassword(value);
				break;
			case 'newPassword':
				setNewPassword(value);
				break;
			case 'confirmPassword':
				setConfirmPassword(value);
				break;
			default:
				break;
		}
	};
	const handlePasswordCancel = (e) => {
		setIsResetPasswordVisiable(false)
		setPassword('')
		setNewPassword('')
		setConfirmPassword('')
		setErrors({})
	};
	const handlePasswordSave = () =>{
		const fieldErrors = validatePasswordFields();
		if (Object.keys(fieldErrors).length === 0) {
		  updateUserPassword()
      setErrors({});			
    } else {
      setErrors(fieldErrors);
    }
	}
	const handlePasswordEdit = () =>{
		setIsResetPasswordVisiable(true)
	}
	//set sbjs 
	useEffect(() => {
		//Fetch the subjects from the DB
		const fetchSubjects = async () => {
			try {
				const res = await axios.get("/sbjs/");
				setSbjs(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		// Fetch the selected subjects for the teacher
    const fetchSelectedSubjects = async () => {
      try {
        const res = await axios.get(`/sbjs/${userData.id_user}`);
        setSelectedSubjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSubjects();
    fetchSelectedSubjects();
  }, [userData.id_user]);
	const updateUserPassword = async () => {
		
		const passwordInputs = {"currentPassword":password, "newPassword":newPassword, "confirmPassword":confirmPassword}
		
		const msg={
			msgClass: "",
			message: ""
		}

		axios
    .put(`/users/password/${userData.id_user}`, passwordInputs)
    .then((res) => {
				msg.msgClass = res.status===200 ? "success" : "error"
				msg.message = res.data
   
				setMessagePassword(msg);
				setTimeout(() => {
					setMessagePassword('');
				}, 2000);
    })
    .catch((error) => {
      console.error('Error updating password:', error);
			msg.msgClass = 401
			msg.message = error.response.data
			setMessagePassword(msg);
			setTimeout(() => {
				setMessagePassword('');
			}, 2000);
    });
		
  };
	const update = async () => {
		axios
    .put(`/users/${userData.id_user}`, userData)
    .then((res) => {
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				message: res.data.message
			}
      setMessage(msg);
			// updateUser(userData)//update localstorage and context
			 // Clear the message after 2 seconds 
			setTimeout(() => {
				setMessage('');
			}, 2000);
    })
    .catch((error) => {
      console.error('Error updating user\'s password:', error);
    });
  };
	//validate userData
	const validateField = () => {
    const errors = {};
		const fieldNames = ['name', 'lastname', 'sbjs'];

		fieldNames.forEach(fieldName => {
			const value = userData[fieldName];

			switch (fieldName) {
				case 'name':
					if (!value.trim()) {
						errors[fieldName] = 'Name is required';
					}
					break;
				case 'lastname':
				if (!value.trim()) {
					errors[fieldName] = 'Lastname is required';
				}
				break;
				case 'sbjs':
				if (Array.isArray(value) && value.length === 0) {
					errors[fieldName] = 'Select at least one subject';
				}
				break;
				
				default:
					break;
			}
		})

    return errors;
  };

	const validatePasswordFields = () => {
		const errors = {};
		const fieldNames = ['password', 'newPassword', 'confirmPassword'];
		for (const fieldName of fieldNames) {
			switch (fieldName) {
				case 'password':
					if (!password.trim()) {
						errors[fieldName] = 'Password is required';
					}

					// checkCurrentPassword(password)
					// .then((res) => {
					// 	if(res){
					// 		console.log('Password validation succeeded' + res);
					// 		setIsCurrentPasswordValid(true)
					// 		return true
					// 	}else{
					// 		console.log('Password validation failed' + res);
					// 		setIsCurrentPasswordValid(false)
					// 		console.log("isCurrentPasswordValid"+ isCurrentPasswordValid);
					// 		return false
					// 	}
					// 	// Perform other actions if needed
					// })
					// .catch((error) => {
					// 	console.log('Password validation failed');
					// });
					break;
				case 'newPassword':
					if (!newPassword.trim() ) {
						errors[fieldName] = 'New password is required';
					}
					if ( newPassword ===password) {
						errors[fieldName] = 'New password must be different from the old password';
					}
					break;
				case 'confirmPassword':
					if (!confirmPassword.trim()) {
						errors[fieldName] = 'Confirm password is required';
					} else if (confirmPassword !== newPassword) {
						errors[fieldName] = 'Passwords do not match';
					}
					break;
				default:
					break;
			}
		}
		return errors;
	};

	// const checkCurrentPassword = async (currentPassword) => {
	// 	const id_user = currentUser.id_user
	// 	try {
	// 		const response = await axios.post('/users/check-password', { currentPassword, id_user });
	// 		// Assuming the backend returns a response indicating password validation
	// 		const isValidCurrentPAssword = response.data.valid;
	// 		return isValidCurrentPAssword
	
	// 	} catch (error) {
	// 		console.error('Error checking current password:', error);
	// 	}
	// };
	
	return (
		<>
			<div className='editUserInfo mt5'>
				<div className="editUserInfo__title d-flex jcsb aic ">
					<h2>Main info</h2>
					{editing ? (
					<button onClick={() => handleSave()} className='btn_blue'>
						{/* <img src={saveSvg} alt="save img" /> */}
						save
					</button>
				) : (
					<button onClick={() => handleEdit()} className='btn_transp_main'>
						{/* <img src={editSvg} alt="" /> */}
						<EditIcon className="inactive mr1"/>
						Edit
					</button>
				)}

				</div>
				<div className="editUserInfo__items">
					<div className="userInfo__item d-flex aic">
						<span className='userLabel label'>Name:</span>
						<div className="editUserInfo_input change_input w25r d-flex aic">
						{editing ? ( 
								<div className='editUserInfo_field       '>
									<input
										type="text"
										name="name"
										className='editUserInfo_field'
										value={userData.name}
										onChange={handleChange}
										// ref={inputRefs.name}
									/>
									{errors.name && <span className='input_error'>{errors.name}</span>}
								</div>
							) : (
								<span className='editUserInfo_field'>{userData.name}</span>
							)}
							
						</div>
					</div>
					<div className="userInfo__item d-flex aic">
						<span className='userLabel label'>Lastname:</span>
						<div className="editUserInfo_input change_input w25r d-flex aic">
						{editing ? ( 
								<div className='editUserInfo_field'>
									<input
										type="text"
										name="lastname"
										className='editUserInfo_field'
										value={userData.lastname}
										onChange={handleChange}
										// ref={inputRefs.lastname}
									/>
									{errors.lastname && <span className='input_error'>{errors.lastname}</span>}
								</div>
							) : (
								<span className='editUserInfo_field'>{userData.lastname}</span>
							)}
							
						</div>
					</div>
					<div className="userInfo__item d-flex aic">
						<span className='userLabel label'>Email:</span>
						<div className="editUserInfo_input change_input w25r d-flex aic">
							<div className='editUserInfo_field'>
								<span>{userData.email}</span>
							</div>
						</div>
					</div>
					{userData.role==="teacher" && (
					<div className="userInfo__item d-flex aic">
						<span className='userLabel label'>Subjects:</span>
						<div className="user_sbjs d-flex f-column">
							{editing ? ( 
								<div className='editUserInfo_field'>
									{sbjs && sbjs.map(subject => (
										<div key={subject.id_subject}>
											<label>
												<input
													type="checkbox"
													name="sbjs"
													value={subject.subject_name}
													checked={selectedSubjects.includes(subject.subject_name)}
													onChange={handleSubjectChange}
												/>
												{subject.subject_name}
											</label>
										</div>
									))}

									{errors.sbjs && <span className='input_error'>{errors.sbjs}</span>}
								</div>
							) : (
								userData.sbjs && userData.sbjs.map(item => (
									<div key={item}>
										{item}
									</div>
								))
							)}
						</div>
						
							



						
						{/* <span className='userLabel label'>Subjects:</span>
						<div className="popup_input change_input w25r d-flex aic">
							{sbjs && sbjs.map(item => (
								<label key={item.subject_name}>
									<input type="checkbox" name={item.subject_name} />
									{item.subject_name}
								</label>
								
							))}
						
							
						</div> */}

						{/* 
						
						!!! Use it for student!!
						
						<div className="popup_input change_input w25r d-flex aic">
							<select id="sbjs" name="sbj" onChange={handleChange}>
								<option key="0" value='0'>no subject</option>
								{sbjs && sbjs.map(option => (
									
									<option key={option.id_subject} value={option.id_subject}>
										{option.subject_name}
									</option>
								))}
							</select>
						</div> */}
					</div>
					)}
				</div>
				
				<div className="mt5">
					{message && <span className={message.msgClass}>{message.message}</span>}
				</div>
			</div>
			<div className="password_section">
				<div className="editUserInfo__title d-flex jcsb aic ">
					<h2>Enter info</h2>
					
						{isResetPasswordVisiable ? (
							<>
							<button onClick={handlePasswordSave} className='btn_blue'>
								{/* <img src={saveSvg} alt="save img" /> */}
								save
							</button>
							<button onClick={handlePasswordCancel} className='btn_blue'>
								{/* <img src={saveSvg} alt="save img" /> */}
								cancel
							</button>
							</>
							
						) : (
							<button onClick={handlePasswordEdit} className='btn_transp_main'>
								{/* <img src={editSvg} alt="" /> */}
								<EditIcon className="inactive mr1"/>
								Edit
							</button>
						)}

				</div>
				<div className="userInfo__item d-flex aic user_password">
					{!isResetPasswordVisiable && <span className="userLabel label">Password:</span>}
					<div className="userInfo_input change_input d-flex f-column">
						{isResetPasswordVisiable ? ( 
							<>
								<div className="userInfo__item d-flex aic">
									<span className="userLabel label">Current Password:</span>
									<div className="editUserInfo_field">
										<input
											type="password"
											name="password"
											className="editUserInfo_field"
											value={password}
											onChange={handlePasswordChange}
										/>
										{errors.password && <span className="input_error">{errors.password}</span>}
										{!isCurrentPasswordValid && <span className="input_error">Password validation failed</span>}
									</div>
								</div>						
								<div className="userInfo__item d-flex aic">
									<span className="userLabel label">New Password:</span>
									<div className="editUserInfo_input change_input w25r d-flex aic">
										{isResetPasswordVisiable ? (
											<div className="editUserInfo_field">
												<input
													type="password"
													name="newPassword"
													className="editUserInfo_field"
													value={newPassword}
													onChange={handlePasswordChange}
												/>
												{errors.newPassword && <span className="input_error">{errors.newPassword}</span>}
											</div>
										) : (
											<span className="editUserInfo_field">********</span>
										)}
									</div>
								</div>
								<div className="userInfo__item d-flex aic">
									<span className="userLabel label">Confirm Password:</span>
									<div className="editUserInfo_input change_input w25r d-flex aic">
										{isResetPasswordVisiable ? (
											<div className="editUserInfo_field">
												<input
													type="password"
													name="confirmPassword"
													className="editUserInfo_field"
													value={confirmPassword}
													onChange={handlePasswordChange}
												/>
												{errors.confirmPassword && <span className="input_error">{errors.confirmPassword}</span>}
											</div>
										) : (
											<span className="editUserInfo_field">********</span>
										)}
									</div>
								</div>
							</>
								
							) : (
								<span className="editUserInfo_field">********</span>
							)}
							
							{/* {isResetPasswordVisiable ? (
								<button onClick={handlePasswordSave}>
									<img src={saveSvg} alt="save img" />
								</button>
							) : (
								<button onClick={handlePasswordEdit}>
									<img src={editSvg} alt="" />
								</button>
							)} */}
					</div>
				</div>
				<div className="mt5">
					{messagePassword && <span className={messagePassword.msgClass}>{messagePassword.message}</span>}
				</div>

			
			</div>

		</>
	)
}

export default Profile
