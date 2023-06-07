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

function Categories() {
	const inputRef = useRef(null);
	const { currentUser} = useContext(AuthContext)
	const [userData, setUserData] = useState(currentUser);

	const [cats, setCats] = useState([]);
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


	
	
	const handleEdit = (itemId, initialText) => {
		setErrors({})
    setEditingItemId(itemId);
		setEditedText(initialText);
  };
	const handleDelete = (itemId) => {
		if (window.confirm('Are you sure delete this class?')) {
			// deleteItem(itemId)
    }
	}
		
  // };
	const handleSave = (itemId) => {
		const fieldErrors = validateField(['cat_name']);
		if (Object.keys(fieldErrors).length === 0) {
			console.log(cats);
			setCats((prevItems) => {
				const updatedCats = { ...prevItems };
				const item = updatedCats[itemId];
				if (item) {
					item.forEach((catItem) => {
						catItem.category_name = editedText;
					});
				}
				return updatedCats;
			});
			// setCats((prevItems) =>
			// 	prevItems.map((item) =>
			// 		item.id_category === itemId ? { ...item, category_name: editedText } : item
			// 	)
			// );
			setEditingItemId(null);
			// setErrors({});
			// update({id_class: itemId, class_name: editedText}) //send current class data for response to serever
		}else{
			setErrors(fieldErrors);
		}
    
  };

	const handleAddNewClass = () => {
		// const fieldErrors = validateField(['add_class']);
		// if (Object.keys(fieldErrors).length === 0) {
		// 	console.log("sdfsdf");
		// 	addNewClass()
			
		// 	setErrors({});
		// 	setNewClassname("")
		// 	setIsAddClassVisiable(false)
		// }else{
		// 	setErrors(fieldErrors);
		// }
    
  };

	const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };
	const handleInputAddClassChange = (e) => {
    // setNewClassname(e.target.value);
  };

	const validateField = (fieldNames) => {
    const errors = {};
		fieldNames.forEach(fieldName => {
			// const value = userData[fieldName];

			switch (fieldName) {
				case 'cat_name':
					if (!editedText.trim()) {
						errors[fieldName] = 'Category name is required';
					}
					break;
				// case 'add_class':
				// 	if (!newClassname.trim()) {
				// 		errors[fieldName] = 'Class name is required';
				// 	} else {
				// 		classes.forEach((item) => {
				// 			if (item.class_name === newClassname) {
				// 				errors[fieldName] = 'Class name already exists';
				// 			}
				// 		});
				// 	}
				// break;
					
			
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
				message: res.data.message
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

	//separate categories by id_subject
	function separateArrayBySubject(data) {
		return data.reduce((result, item) => {
			const idSubject = item.id_subject;
			if (!result[idSubject]) {
				result[idSubject] = [];
			}
			result[idSubject].push(item);
			return result;
		}, {});
	}
	
	useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/teacher/${currentUser.id_user}/cats`);
				// console.log(res.data);
				const separateArrays = separateArrayBySubject(res.data);
				// setCats(separateArrays(res.data));
				// console.log(JSON.stringify(separateArrays) + "separateArrays");
				setCats(separateArrays);
				// console.log(cats);
				
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

	//add focus for active input
	useEffect(() => {
    if (editingItemId) {
      inputRef.current.focus();
    }
  }, [editingItemId]);

  return (
	<div className='mt4 section_categories'>
		<div className="container">
		<h2 className='center'>My Categories</h2>
		<div className="cats__wrap table_data mt4">
			<div className="mt5">
				{message ? <span className={message.msgClass}>{message.message}</span> : <span></span>}
			</div>
			{Object.values(cats).map((arr, i) => (
				<div className="subject_section" key={i++}>
					<div className="subject_name mt5"><h3>{arr[0].subject_name}</h3></div>
					
					{arr.map((item) => (
						<div key={item.id_category} className="item_title">
							<div  className="class_item d-flex jcs g2 aic mb2">
								{editingItemId === item.id_category ? (
									<div className="item_title">
										<input
											type="text"
											name="cat_name"
											value={editedText}
											ref={inputRef}
											onChange={handleInputChange}
										/>
										{errors.cat_name && <span className='input_error'>{errors.cat_name}</span>}
			
									</div>
									
								) : (
									<div className="item_title">
										<span className='editUserInfo_field'>{item.category_name}</span>
									</div>
								)}
							
								<div className="cat_edit table_icon">
									{editingItemId === item.id_category ? (
										<button onClick={() => handleSave(item.id_category)} className=''>
											<SaveIcon/>
										</button>
										
									) : (
										<button onClick={() => handleEdit(item.id_category,  item.category_name)} className=''>
											<EditIcon className=""/>
										</button>
									)}
								</div>
								<div className="class_delete table_icon">
									<button ><DeleteIcon/></button>
								</div>
							</div>
						</div>
					))}
				</div>
			))}


				
			{isAddClassVisiable && (
				<div className="cat_item d-flex jcsb aic mb2">
					<div className="item_title">
						<input
							type="text"
							name="add_cat"
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
		<div className="add_newItem mt4"><button className="link d-flex jcsb aic g1" onClick={() => setIsAddClassVisiable(true)}><AddIcon/>add new category</button></div>

		</div>
	  

	</div>
  )
}


export default Categories;
