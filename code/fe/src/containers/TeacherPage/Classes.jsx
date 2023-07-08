import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext.js';
import { Link } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'


import { ReactComponent as FolderIcon } from '../../assets/img/folder.svg';
import { ReactComponent as EditIcon } from '../../assets/img/edit2.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/delete.svg';
import { ReactComponent as CardIcon } from '../../assets/img/card.svg';
import { ReactComponent as AddIcon } from '../../assets/img/add2.svg';
import { ReactComponent as SaveIcon } from '../../assets/img/save.svg';

function Classes() {
	const inputRef = useRef(null);
	const { currentUser} = useContext(AuthContext)
	const [userData, setUserData] = useState(currentUser);

	const [classes, setClasses] = useState([]);
	// const [editing, setEditing] = useState(false);
	// const [errors, setErrors] = useState({}); //Validations errors
	const [editingItemId, setEditingItemId] = useState(null);
	const [editedText, setEditedText] = useState('');
	// const [currentClass, setCurrentClass] = useState({})
	const [message, setMessage] = useState({}); //msg from DB
	const [errors, setErrors] = useState({}); //Validations errors
	//add new class
	const [newClassname, setNewClassname] = useState('')
	const[isAddClassVisiable, setIsAddClassVisiable] = useState(false)
	const[isAddVisiable, setIsAddVisiable] = useState(false)

	
	
	const handleEdit = (itemId, initialText) => {
		setErrors({})
    setEditingItemId(itemId);
		setEditedText(initialText);
  };
	const handleDelete = (itemId) => {
		if (window.confirm('Are you sure delete this class?')) {
			deleteItem(itemId)
			fetchData(); //refetchData
    }
		
  };
	const handleSave = (itemId) => {
		console.log("save");
		const fieldErrors = validateField(['class_name']);
		if (Object.keys(fieldErrors).length === 0) {
			// console.log(classes+" 1");
			
			setClasses((prevItems) =>
				prevItems.map((item) =>
					item.id_class === itemId ? { ...item, class_name: editedText } : item
				)
			);
			// console.log(classes+" 2");
			// fetchData();
			setEditingItemId(null);
			setErrors({});
			update({id_class: itemId, class_name: editedText}) //send current class data for response to serever
		}else{
			setErrors(fieldErrors);
		}
    
  };

	const handleAddNewClass = () => {
		const fieldErrors = validateField(['add_class']);
		if (Object.keys(fieldErrors).length === 0) {
			console.log("sdfsdf");
			addNewClass()
			fetchData(); //refetchData
			
			setErrors({});
			setNewClassname("")
			setIsAddClassVisiable(false)
		}else{
			setErrors(fieldErrors);
		}
    
  };

	const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };
	const handleInputAddClassChange = (e) => {
    setNewClassname(e.target.value);
  };
	const handleAddSection = () => {
		setIsAddVisiable(!isAddVisiable)
	}
	const validateField = (fieldNames) => {
    const errors = {};
		fieldNames.forEach(fieldName => {
			// const value = userData[fieldName];

			switch (fieldName) {
				case 'class_name':
					if (!editedText.trim()) {
						errors[fieldName] = 'Class name is required';
					}
					break;
				case 'add_class':
					if (!newClassname.trim()) {
						errors[fieldName] = 'Class name is required';
					} else {
						classes.forEach((item) => {
							if (item.class_name === newClassname) {
								errors[fieldName] = 'Class name already exists';
							}
						});
					}
				break;
					
			
				default:
					break;
			}
		})
		// console.log(errors);
    return errors;
  };

	//axios for DB
	const addNewClass = async ()=>{
		axios
		.post(`/teacher/classes/${currentUser.id_user}`, {class_name: newClassname})
		.then((res) => {
			// console.log("resss");
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				message: res.data.message
			}
      setMessage(msg);
			// setClasses(classes)

	
			 // Clear the message after 2 seconds 
			setTimeout(() => {
				setMessage('');
			}, 2000);
    })
    .catch((error) => {
      console.error('Error updating class name', error);
    });
	}
	const update = async (currentData) => {
		const dataToSend = {"class_name":currentData.class_name} 
		// console.log(currentData.class_name);
		axios
    .put(`/teacher/classes/${currentData.id_class}`, dataToSend)
    .then((res) => {
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				message: res.data.message
			}
      setMessage(msg);
			// setCurrentClass({})
			// updateUser(userData)//update localstorage and context
			 // Clear the message after 2 seconds 
			setTimeout(() => {
				setMessage('');
			}, 2000);
    })
    .catch((error) => {
      console.error('Error updating class name', error);
    });
  };
	const deleteItem = async (itemId) => {
	
		axios
    .delete(`/teacher/classes/${itemId}`)
    .then((res) => {
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				message: res.data
			}
      setMessage(msg);
			// setCurrentClass({})
			 // Clear the message after 2 seconds 
			setTimeout(() => {
				setMessage('');
			}, 2000);
    })
    .catch((error) => {
      console.error('Error updating class name', error);
    });
  };

	const fetchData = async () => {
		try {
			const res = await axios.get(`/teacher/${userData.id_user}/classes`);
			// console.log(res.data.data);
			setClasses(res.data.data);
			// console.log(classes[0].class_name + " 2");
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
    fetchData();
  }, []);

	//add focus for active input
	useEffect(() => {
    if (editingItemId) {
      inputRef.current.focus();
    }
  }, [editingItemId]);

  return (
	<div className='mt4 section_classes'>
		<div className="container">
		<h1 className=''>My Classes</h1>
		<div className="classes__wrap table_data mt4">
			<div className="mt5 msg_block">
				{message && <span className={message.msgClass}>{message.message}</span>}
			</div>
			{classes && classes.map(item => (
				<div key={item.id_class} className="class_item d-flex jcsb aic mb2">
					{editingItemId === item.id_class ? (
						<div className="item_title">
							<input
								type="text"
								name="class_name"
								value={editedText}
								ref={inputRef}
								onChange={handleInputChange}
							/>
							{errors.class_name && <span className='input_error'>{errors.class_name}</span>}

						</div>
            
          ) : (
            <div className="item_title">
							<span className='editUserInfo_field'>{item.class_name}</span>
						</div>
          )}
					<div className="class_folder table_icon">
						<Link 
							className="link d-flex jcsb aic g1" 
							to={`/teacher/classfolder/${item.id_class}`}
						>
							<FolderIcon/>
							Class folder
						</Link>
					</div>
					<div className="class_accounts"><Link className="link d-flex jcsb aic g1" to={`/teacher/accounts/${item.id_class}`}><CardIcon/>Accounts</Link></div>
					<div className="class_statistic"></div>
					<div className="class_edit table_icon">
						{editingItemId === item.id_class ? (
							<button onClick={() => handleSave(item.id_class)} className=''>
								<SaveIcon/>
							</button>
							
						) : (
							<button onClick={() => handleEdit(item.id_class,  item.class_name)} className=''>
								<EditIcon className=""/>
							</button>
						)}
					</div>
					<div className="class_delete table_icon">
						<button onClick={() => handleDelete(item.id_class)} ><DeleteIcon/></button>
					</div>
				</div>
			))}
			{isAddVisiable && (
				<div className="class_item d-flex jcsb aic mb2">
					<div className="item_title">
						<input
							type="text"
							name="add_class"
							value={newClassname}
							ref={inputRef}
							onChange={handleInputAddClassChange}
						/>
						{errors.add_class && <span className='input_error'>{errors.add_class}</span>}

					</div>
					<button onClick={() => handleAddNewClass()} className=''>
						<SaveIcon/>
					</button>
				</div>
			)}
			
		</div>
		<div className="add_newItem mt4"><button className="link d-flex jcsb aic g1" onClick={handleAddSection}><AddIcon/>add new class</button></div>

		</div>
	  

	</div>
  )
}

export default Classes
