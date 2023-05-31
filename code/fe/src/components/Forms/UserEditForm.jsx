import React, { useContext,useState, useRef, useEffect } from 'react'
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../../context/authContext'


import './forms.scss'
import editSvg from '../../assets/img/edit.svg'
import saveSvg from '../../assets/img/check-black.svg'

function UserEditForm({handleEditFormHide}) {
	const { currentUser, deleteUser} = useContext(AuthContext)
	
	const [err, setError] = useState(null);

	// const initialUserData = {
  //   name: currentUser.name,
  //   lastname: currentUser.lastname,
  //   // Add more fields as needed
  // };
	const [editingFields, setEditingFields] = useState({});
  const [userData, setUserData] = useState(currentUser);
  const [currentField, setCurrentField] = useState(null);
  const [previousField, setPreviousField] = useState(null);
  const [errors, setErrors] = useState({});
	const inputRefs = {
    name: useRef(null),
    lastname: useRef(null),
    email: useRef(null),
    // Add refs for other fields as needed
  };

  const handleEdit = (fieldName) => {
    if (currentField && currentField !== fieldName) {
      handleSave(previousField);
    }
    setEditingFields((prevEditingFields) => ({
      ...prevEditingFields,
      [fieldName]: true,
    }));
    setCurrentField(fieldName);
    setPreviousField(fieldName);
  };

  const handleSave = (fieldName) => {
    const fieldErrors = validateField(fieldName);
    if (Object.keys(fieldErrors).length === 0) {
      setEditingFields((prevEditingFields) => ({
        ...prevEditingFields,
        [fieldName]: false,
      }));
      setErrors({});
      // Update user data with the changes
      // You can send the updated data to an API or perform any necessary actions here
    } else {
      setErrors(fieldErrors);
    }
  };

  const handleChange = (e) => {
		setErrors({});
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
	useEffect(() => {
    if (editingFields[currentField] && inputRefs[currentField].current) {
      inputRefs[currentField].current.focus();
    }
  }, [editingFields, currentField]);

  const validateField = (fieldName) => {
    const errors = {};
    const value = userData[fieldName];

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          errors[fieldName] = 'Name is required';
        }
        break;
			case 'lastname':
			if (!value.trim()) {
				errors[fieldName] = 'lastname is required';
			}
			break;
      case 'email':
        if (!value.trim()) {
          errors[fieldName] = 'Email is required';
        } else if (!isValidEmail(value)) {
          errors[fieldName] = 'Invalid email address';
        }
        break;
      // Add validation checks for other fields as needed
      default:
        break;
    }

    return errors;
  };

  const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
	<>
		<div className='editUserInfo popup'>
			<div className="userInfo__item d-flex aic">
				<span className='userLabel label'>Name:</span>
				<div className="popup_input change_input w25r d-flex aic">
				{editingFields.name ? ( 
						<div className='popup_field       '>
							<input
								type="text"
								name="name"
								className='popup_field'
								value={userData.name}
								onChange={handleChange}
								ref={inputRefs.name}
							/>
							{errors.name && <span className='input_error'>{errors.name}</span>}
						</div>
					) : (
						<span className='popup_field'>{userData.name}</span>
					)}
					{editingFields.name ? (
					<button onClick={() => handleSave('name')}>
						<img src={saveSvg} alt="save img" />
					</button>
				) : (
					<button onClick={() => handleEdit('name')}>
						<img src={editSvg} alt="" />
					</button>
				)}
				</div>
			</div>
			<div className="userInfo__item d-flex aic">
				<span className='userLabel label'>Lastname:</span>
				<div className="popup_input change_input w25r d-flex aic">
				{editingFields.lastname ? ( 
						<div className='popup_field       '>
							<input
								type="text"
								name="name"
								className='popup_field'
								value={userData.lastName}
								onChange={handleChange}
								ref={inputRefs.lastname}
							/>
							{errors.lastname && <span className='input_error'>{errors.lastname}</span>}
						</div>
					) : (
						<span className='popup_field'>{userData.lastName}</span>
					)}
					{editingFields.lastname ? (
					<button onClick={() => handleSave('lastname')}>
						<img src={saveSvg} alt="save img" />
					</button>
				) : (
					<button onClick={() => handleEdit('lastname')}>
						<img src={editSvg} alt="" />
					</button>
				)}
				</div>
			</div>

			<div className="userInfo__item d-flex aic">
				<span className='userLabel label'>Email:</span>
				<div className="popup_input change_input w25r d-flex aic">
				{editingFields.email ? ( 
						<div className='popup_field       '>
							<input
								type="text"
								name="email"
								className='popup_field'
								value={userData.email}
								onChange={handleChange}
								ref={inputRefs.email}
							/>
							{errors.email && <span className='input_error'>{errors.email}</span>}
						</div>
					) : (
						<span className='popup_field'>{userData.email}</span>
					)}
					{editingFields.email ? (
					<button onClick={() => handleSave('email')}>
						<img src={saveSvg} alt="save img" />
					</button>
				) : (
					<button onClick={() => handleEdit('email')}>
						<img src={editSvg} alt="" />
					</button>
				)}
				</div>
			</div>
	

			{/* Add more fields here with their respective buttons */}
		</div>

		<div onClick={handleEditFormHide} className='overlay'></div>
  </>
  )
}

export default UserEditForm
