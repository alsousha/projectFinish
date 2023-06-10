import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext.js';
import { Link } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'


// import { ReactComponent as FolderIcon } from '../../assets/img/folder.svg';
import { ReactComponent as EditIcon } from '../../assets/img/edit2.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/delete.svg';
// import { ReactComponent as CardIcon } from '../../assets/img/card.svg';
import { ReactComponent as AddIcon } from '../../assets/img/add2.svg';
import { ReactComponent as SaveIcon } from '../../assets/img/save.svg';

function Categories() {
	const inputRef = useRef(null);
	const { currentUser} = useContext(AuthContext)
	// const [userData, setUserData] = useState(currentUser);

	const [cats, setCats] = useState([]);
	const [catsFormat, setCatsFormat] = useState()
	// const [editing, setEditing] = useState(false);
	// const [errors, setErrors] = useState({}); //Validations errors
	const [editingItemId, setEditingItemId] = useState(null);
	const [editedText, setEditedText] = useState('');
	const [message, setMessage] = useState({}); //msg from DB
	const [errors, setErrors] = useState({}); //Validations errors
	//add new class
	const [newCatname, setNewCatname] = useState('')
	const [newSbj, setNewSbj] = useState({})
	const[isAddClassVisiable, setIsAddClassVisiable] = useState(false)

	// console.log(cats);
	const handleEdit = (itemId, initialText) => {
		setErrors({})
    setEditingItemId(itemId);
		setEditedText(initialText);
  };

	const handleDelete = (itemId) => {
		if (window.confirm('Are you sure delete this class?')) {
			deleteItem(itemId)
    }
	}
		
	const handleSave = (itemId) => {
		console.log(newSbj);
		const fieldErrors = validateField(['cat_name']);
		if (Object.keys(fieldErrors).length === 0) {
			// console.log(cats);
			// setCats((prevItems) => {
			// 	const updatedCats = { ...prevItems };
			// 	const item = updatedCats[itemId];
			// 	if (item) {
			// 		item.forEach((catItem) => {
			// 			catItem.category_name = editedText;
			// 		});
			// 	}
			// 	return updatedCats;
			// });
			setCats((prevItems) =>
				prevItems.map((item) =>
					item.id_category === itemId ? { ...item, category_name: editedText } : item
				)
			);
			setEditingItemId(null);
			// console.log(currentData);
			// setErrors({});
			update({id_cat: itemId, cat_name: editedText}) //send current cat data for response to serever
		}else{
			setErrors(fieldErrors);
		}
		setNewSbj({})
    
  };

	const handleAddNewCat = () => {
		const fieldErrors = validateField(['add_cat']);
		// console.log(fieldErrors);

		if (Object.keys(fieldErrors).length === 0) {
			addNewCat()
			
			setErrors({});
			setNewCatname("")
			setIsAddClassVisiable(false)
		}else{
			setErrors(fieldErrors);
		}
    
  };

	const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };
	const handleInputAddCatChange = (e) => {
    setNewCatname(e.target.value);
  };

	const validateField = (fieldNames) => {
    const errors = {};
		fieldNames.forEach(fieldName => {
			// const value = userData[fieldName];

			switch (fieldName) {
				case 'add_cat':
					if (!newCatname.trim()) {
						errors[fieldName] = 'Category name is required';
					}
				break;
			
				default:
					break;
			}
		})
		// console.log(errors);
    return errors;
  };

	const handleSelectChange = async e=>{
		// console.log(e.target.value + " select");
		setNewSbj(e.target.value)
		// setNewCat(sbj: e.target.value)
		// console.log(e.target.options[2].name);
		// if(e.target.name==="role"){
		// 	if(e.target.value==="teacher"){
		// 		setVisiableLevelInput(false)
		// 		setVisiableSbjInput(true)
		// 	}else{
		// 		setVisiableLevelInput(true)
		// 		setVisiableSbjInput(false)
		// 	}
		// }
		// setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
		
	}

	//axios for DB
	const addNewCat = async ()=>{
		axios
		.post(`/teacher/cats/${currentUser.id_user}`, {category_name: newCatname, subject_name: newSbj})
		.then((res) => {
			// console.log(res.data);
			// const tmpCat = res.data
			setCats((prevCats) =>
				[...prevCats, res.data]
			);	
			
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				message: res.status===200 ? "New category added successfully!" : 'Error add category'
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
		const dataToSend = {category_name:currentData.cat_name, subject_name: newSbj} 
		// console.log("currentData.class_name");
		axios
    .put(`/teacher/cat/${currentData.id_cat}`, dataToSend)
    .then((res) => {
			// const msg={
			// 	msgClass: res.status===200 ? "success" : "error",
			// 	message: res.data
			// }
      // setMessage(msg);
			// // setCurrentClass({})
			// // updateUser(userData)//update localstorage and context
			//  // Clear the message after 2 seconds 
			// setTimeout(() => {
			// 	setMessage('');
			// }, 2000);
    })
    .catch((error) => {
      console.error('Error updating class name', error);
    });
  };
	const deleteItem = async (itemId) => {
	
		axios
    .delete(`/teacher/cats/${itemId}`)
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
			fetchData();
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
	
	//fetch cats of teacher
	const fetchData = async () => {
		try {
			const res = await axios.get(`/teacher/${currentUser.id_user}/cats`);
			setCats(res.data)
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
    fetchData();
  }, []);

	useEffect(() => {
		const separateArrays = separateArrayBySubject(cats);
		setCatsFormat(separateArrays);
		// setCountTeacherSbjs(Object.keys(separateArrays).length); //count of current sbjs of teacher
		// setCountTeacherSbjs(currentUser.sbjs.length); //count of current sbjs of teacher
    // const fetchData = async () => {
    //   try {
    //     // const res = await axios.get(`/teacher/${currentUser.id_user}/cats`);
		// 		// console.log(res.data);
		// 		// const separateArrays = separateArrayBySubject(res.data);
				
		// 		// setCats(separateArrays(res.data));
		// 		// console.log(JSON.stringify(separateArrays) + "separateArrays");
		// 		// setCatsFormat(separateArrays);
		// 		// console.log(cats);
				
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();
  }, [cats]);

	//add focus for active input
	useEffect(() => {
    if (editingItemId) {
      inputRef.current.focus();
    }
  }, [editingItemId]);
	
	//effect run once when component was created
	useEffect(() => {
		setNewSbj(currentUser.sbjs[0])// set by default first teacher\s sbj to select (add new cat elem)
  }, []);

  return (
	<div className='mt4 section_categories'>
		<div className="container">
		<h2 className='center'>My Categories</h2>
		<div className="cats__wrap table_data mt4">
			<div className="mt5 msg_block">
				{message ? <span className={message.msgClass}>{message.message}</span> : <span></span>}
			</div>
			{catsFormat && Object.values(catsFormat).map((arr, i) => (
				<div className="subject_section" key={i++}>
					<div className="subject_name mt5"><h3>{arr[0].subject_name}</h3></div>
					
					{arr.map((item) => (
						<div key={item.id_category} className="">
							<div  className="table_item d-flex jcs g2 aic mb2">
								{editingItemId === item.id_category ? (
									<div className="">
										<input
											type="text"
											name="cat_name"
											value={editedText}
											ref={inputRef}
											onChange={handleInputChange}
										/>
										{/* {currentUser.sbjs.length>1 && (
											<select id="sbjs" name="sbj_cat" onChange={handleSelectChange} defaultValue={currentUser.sbjs[i]}>
												{currentUser.sbjs && currentUser.sbjs.map((elem, j)=>(
													<option key={`sbj-${j}`} value={elem}>
														{elem}{j}{i}
													</option>
												))}
											</select>
											)}
										{errors.cat_name && <span className='input_error'>{errors.cat_name}</span>} */}
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
									<button  onClick={() => handleDelete(item.id_category)}><DeleteIcon/></button>
								</div>
							</div>
						</div>
					))}
				</div>
			))}

			{isAddClassVisiable && (
				<div className="cat_item d-flex jcsb aic mb2">
					<div className="d-flex g1">
						<input
							type="text"
							name="add_cat"
							value={newCatname}
							ref={inputRef}
							onChange={handleInputAddCatChange}
						/>
						{currentUser.sbjs.length>1 && (
							<select id="sbjs" name="sbj_cat" onChange={handleSelectChange}>
								{currentUser.sbjs && currentUser.sbjs.map((elem, i)=>(
									<option key={`sbj-${i}`} value={elem}>
										{elem}
									</option>
								))}
							</select>
							)}
						{errors.add_cat && <span className='input_error'>{errors.add_cat}</span>}

					</div>

					<button onClick={() => handleAddNewCat()} className=''>
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
