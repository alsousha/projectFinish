import React, { useContext,useState, useRef, useEffect } from 'react'
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../../context/authContext'


import './forms.scss'
import editSvg from '../../assets/img/edit.svg'
import saveSvg from '../../assets/img/check-black.svg'
// {
// 	1. add component for edit and save btns
// }
function UserEditForm({handleEditFormHide}) {
	const { currentUser, deleteUser, updateUser} = useContext(AuthContext)
	const [sbjs, setSbjs] = useState([]) //subjects from DB
	const [message, setMessage] = useState({}); //msg from DB
	const [editingFields, setEditingFields] = useState({});
  const [userData, setUserData] = useState(currentUser);
  const [currentField, setCurrentField] = useState(null);
  const [previousField, setPreviousField] = useState(null);
  const [errors, setErrors] = useState({}); //Validations errors
	const [selectedSubjects, setSelectedSubjects] = useState([]);

	const inputRefs = {
    name: useRef(null),
    lastname: useRef(null),
    email: useRef(null),
    // Add refs for other fields as needed
  };

	const [isCurrentInputValid, setIsCurrentInputValid] = useState(true)


	const handleEdit = (fieldName) => {
		setIsCurrentInputValid(false)
		console.log("in handleEdit");
    if (currentField && currentField !== fieldName) {
      handleSave(previousField);
    }
		if(isCurrentInputValid){
			setEditingFields((prevEditingFields) => ({
				...prevEditingFields,
				[fieldName]: true,
			}));
			console.log(fieldName);
			// setCurrentField(fieldName);
			setPreviousField(fieldName);
		}
  };

  const handleSave = (fieldName) => {
    const fieldErrors = validateField(fieldName);
    if (Object.keys(fieldErrors).length === 0) {
      setEditingFields((prevEditingFields) => ({
				
        ...prevEditingFields,
        [fieldName]: false,
      }));
		
			console.log(editingFields);
      setErrors({});
			setIsCurrentInputValid(true)
      // Update user data with the changes
			// update()
    } else {
      setErrors(fieldErrors);
			setIsCurrentInputValid(false)
    }
  };

  const handleChange = (e) => {
		// console.log("change");
		const fieldErrors = validateField(previousField);
		setErrors({});
    const { name, value } = e.target;
		// if(name==='sbj'){
		// 		updateTeacherSbj(value)
		// 	}
		if(name==='sbj' && !isCurrentInputValid){
			setErrors(fieldErrors);
			setIsCurrentInputValid(false)
		}else{
			// console.log(value);
			setUserData((prevUserData) => ({
				...prevUserData,
				[name]: value,
			}));
			// console.log(userData);
			if(name==='sbj'){
				updateTeacherSbj(value)
			}
		}
  
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
			updateUser(userData)//update localstorage and context
			 // Clear the message after 2 seconds 
			setTimeout(() => {
				setMessage('');
			}, 2000);
    })
    .catch((error) => {
      console.error('Error updating user:', error);
    });
  };
	const updateTeacherSbj = async(option)=>{
		// console.log("update");
		// console.log(userData);
		// console.log(option);
		const currentSbjId = {option_id:option}
		axios
    .put(`/sbjs/${userData.id_user}`, currentSbjId)
    .then((res) => {
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				message: res.data.message
			}
      setMessage(msg);
			//updateUser(userData)//update localstorage and context
			 // Clear the message after 2 seconds 
			setTimeout(() => {
				setMessage('');
			}, 2000);
    })
    .catch((error) => {
      console.error('Error updating user:', error);
    });
	}

	const handleDelete = async e =>{
		try{
			await deleteUser()
			console.log("handle");
		}catch(err){
			console.log(err);
		}
	}

	const saveSubjects = () => {
    // Perform the necessary operations with the selected subjects
    // ...

    // Clear the errors and update the editing fields
    setErrors({});
    setEditingFields((prevEditingFields) => ({
      ...prevEditingFields,
      sbjs: false,
    }));
  };


	//set focus for inputs
	useEffect(() => {
    if (editingFields[currentField] && inputRefs[currentField].current) {
      inputRefs[currentField].current.focus();
    }
  }, [editingFields, currentField]);
	
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
	
	
	const handleSubjectChange = (e) => {
    const { value } = e.target;
    const updatedSelectedSubjects = [...selectedSubjects];

    if (updatedSelectedSubjects.includes(value)) {
      // Remove the subject from the selected subjects if it was unchecked
      const index = updatedSelectedSubjects.indexOf(value);
      updatedSelectedSubjects.splice(index, 1);
    } else {
      // Add the subject to the selected subjects if it was checked
      updatedSelectedSubjects.push(value);
    }

    setSelectedSubjects(updatedSelectedSubjects);
  };
	
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
				errors[fieldName] = 'Lastname is required';
			}
			break;
      default:
        break;
    }

    return errors;
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
						<div className='popup_field'>
							<input
								type="text"
								name="lastname"
								className='popup_field'
								value={userData.lastname}
								onChange={handleChange}
								ref={inputRefs.lastname}
							/>
							{errors.lastname && <span className='input_error'>{errors.lastname}</span>}
						</div>
					) : (
						<span className='popup_field'>{userData.lastname}</span>
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
					<div className='popup_field'>
						<span>{userData.email}</span>
					</div>
				</div>
			</div>
			{/* sbjs's checkbox for teacher */}
			{userData.role==="teacher" && (
			<div className="userInfo__item d-flex aic">
				<span className='userLabel label'>Subjects:</span>
				<div className="user_sbjs d-flex f-column">
				{editingFields.sbjs ? ( 
						<div className='popup_field'>
							bla-bla
							{sbjs && sbjs.map(subject => (

							<div key={subject.id}>
							<label>
								<input
									type="checkbox"
									name="sbjs"
									value={subject.id}
									checked={selectedSubjects.includes(subject.id)}
									onChange={handleSubjectChange}
								/>
								{subject.name}
							</label>
							</div>


								// <label key={item.subject_name}>
								// 	<input type="checkbox" name={item.subject_name} />
								// 	{item.subject_name}
								// </label>
								
							))}

							{/* <input
								type="text"
								name="sbjs"
								className='popup_field'
								value={userData.sbjs}
								onChange={handleChange}
								ref={inputRefs.sbjs}
							/> */}
							{errors.sbjs && <span className='input_error'>{errors.sbjs}</span>}
						</div>
					) : (
						userData.sbjs_id && userData.sbjs_id.map(item => (
							// <div key={item.subject_name}>
							// 	{item.subject_name}
							// </div>
							<div key={item}>
								{item}
							</div>
						))
					)}
				</div>
				
					{editingFields.lastname ? (
					<button onClick={() => handleSave('sbjs')}>
						<img src={saveSvg} alt="save img" />
					</button>
				) : (
					<button onClick={() => handleEdit('sbjs')}>
						<img src={editSvg} alt="" />
					</button>
				)}



				
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
			<div className="delete_user">
				<button onClick={handleDelete}>Delete this account</button>
			</div>
			<div className="mt5">
				{message && <span className={message.msgClass}>{message.message}</span>}
			</div>
		</div>

		<div onClick={handleEditFormHide} className='overlay'></div>
  </>
  )
}

export default UserEditForm
