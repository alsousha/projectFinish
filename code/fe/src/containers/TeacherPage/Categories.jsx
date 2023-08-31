import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext.js';
import { Link } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'


import { ReactComponent as EditIcon } from '../../assets/img/edit2.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/delete.svg';
import { ReactComponent as AddIcon } from '../../assets/img/add2.svg';
import { ReactComponent as SaveIcon } from '../../assets/img/save.svg';

function Categories() {
	const inputRef = useRef(null);
	const { currentUser} = useContext(AuthContext)

	//main array
	const [dataArray, setDataArray] = useState([]);
	const [dataArrayFormat, setDataArrayFormat] = useState()
	
	const [editingItemId, setEditingItemId] = useState(null);
	const [editedText, setEditedText] = useState('');
	const [editedSbj, setEditedSbj] = useState('');
	//errors
	const [message, setMessage] = useState({}); //msg from DB
	const [errors, setErrors] = useState({}); //Validations errors
	//add new item
	const [newItemName, setNewItemName] = useState('')
	const [newSbj, setNewSbj] = useState('')
	const [isAddVisiable, setIsAddVisiable] = useState(false)

	const [activeTab, setActiveTab] = useState(0);
	// console.log(cats);
	const handleEdit = (itemId, itemText) => {
		setErrors({})
    setEditingItemId(itemId);
		setEditedText(itemText);
	
  };

	const handleDelete = (itemId) => {
		if (window.confirm('Are you sure delete this class?')) {
			deleteItem(itemId)
			if(dataArrayFormat&&dataArrayFormat[activeTab].length===1&&dataArrayFormat.length===activeTab+1){
				//if the last tab and last category, when we delete it or change its sbj -> first tab will be active
				setActiveTab(0)
			}
    }
	}
		
	const handleSave = (itemId, id_sbj) => {
		const fieldErrors = validateField(['item_name'], itemId, id_sbj);
		// console.log(fieldErrors);
		if (Object.keys(fieldErrors).length === 0) {
			const sbjToSend = (editedSbj==='') ? dataArrayFormat && dataArrayFormat[activeTab][0].subject_name : editedSbj

			// // console.log(sbjToSend);
			setDataArray((prevItems) =>
				prevItems.map((item) =>
					item.id_category === itemId ? { ...item, category_name: editedText, subject_name: sbjToSend} : item
				)
			);
			update({id_cat: itemId, cat_name: editedText, subject_name: sbjToSend}) //send current cat data for response to serever
			
			if(dataArrayFormat&&dataArrayFormat[activeTab].length===1&&dataArrayFormat.length===activeTab+1 && editedSbj!==''){
				//if the last tab and last category, when we delete it or change its sbj -> first tab will be active
				setActiveTab(0)
			}
			//reset data
			setEditedSbj('')
			setEditingItemId(null);
			setEditedText('')
			setErrors({})
			fetchData()
		}else{
			setErrors(fieldErrors);
			
		}
   
  };

	const handleAddNewItem = () => {
		// console.log("Sdf");
		const fieldErrors = validateField(['add_item']);
		// console.log(fieldErrors);

		if (Object.keys(fieldErrors).length === 0) {
			addNewItem()
			
			setErrors({});
			setNewItemName("")
			setIsAddVisiable(false)
			fetchData()
		}else{
			setErrors(fieldErrors);
		}
    
  };

	const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

	const handleInputAddChange = (e) => {
    setNewItemName(e.target.value);
  };

	const handleSelectChange = async e=>{
		// console.log(e.target.value + " select");
		setEditedSbj(e.target.value)
		// console.log("sekl"+newSbj);
	}
	const handleSelectAddChange = async e=>{
		// console.log(e.target.value + " select");
		setNewSbj(e.target.value)
		// console.log("sekl"+newSbj);
	}
	const handleAddSection = () => {
		setIsAddVisiable(!isAddVisiable)
	}
	

	const validateField = (fieldNames, itemId, id_sbj) => {
    const errors = {};
		fieldNames.forEach(fieldName => {
			// const value = userData[fieldName];

			switch (fieldName) {
				case 'add_item':
					if (!newItemName.trim()) {
						errors[fieldName] = 'Category name is required';
					}
					
				break;
				case 'item_name':
					if (!editedText.trim()) {
						errors[fieldName] = 'Category name is required';
					}else if(isDublicateItemName(editedText, dataArray, itemId, id_sbj)){
						errors[fieldName] = 'Item with this name exists!';
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
	const addNewItem = async ()=>{

		let sbjToSend=''
		//list of items is empty
		if(dataArrayFormat && dataArrayFormat.length===0){
			//doesn't change select -> will get from currentUSer sbjs list
			sbjToSend = (newSbj==='') ? currentUser.sbjs[0] : newSbj
		}else{
			//if user doesn't change sbj in select->will get first by default
			sbjToSend = (newSbj==='') ? 
			dataArrayFormat && dataArrayFormat.length!==0 && dataArrayFormat[activeTab][0].subject_name 
			: newSbj
		}
				
		axios
		.post(`/teacher/cats/${currentUser.id_user}`, {category_name: newItemName, subject_name: sbjToSend})
		.then((res) => {
			// console.log(res.data);
			setDataArray((prev) =>
				[...prev, res.data]
			);	
			
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				text: res.status===200 ? "New item added successfully!" : 'Error add item'
			}
      setMessage(msg);
			 // Clear the message after 2 seconds 
			setTimeout(() => {
				setMessage('');
			}, 2000);
    })
    .catch((error) => {
      console.error('Error add item', error);
    });
	}
	const update = async (currentData) => {
		const dataToSend = {category_name:currentData.cat_name, subject_name: currentData.subject_name} 
		axios
    .put(`/teacher/cat/${currentData.id_cat}`, dataToSend)
    .then((res) => {
			setDataArray((prev) =>
				[...prev, res.data]
			);	
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				text: res.status===200 ? "Item updated!" : 'Error updating'
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
		// console.log(data);
		return data.reduce((result, item) => {
			const idSubject = item.id_subject;
			if (!result[idSubject]) {
				result[idSubject] = [];
			}
			result[idSubject].push(item);
			return result;
		}, {});
	}

	function isDublicateItemName(itemForCheck, arr, itemId, id_sbj){
		return arr.some((obj) => obj.category_name === itemForCheck && obj.id_category !==itemId && obj.id_subject === id_sbj);

	}
	//fetch cats of teacher
	const fetchData = async () => {
		try {
			const res = await axios.get(`/teacher/${currentUser.id_user}/cats`);
			setDataArray(res.data)
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
    fetchData();
		setEditedSbj("")	
  }, []);

	useEffect(() => {
		const separateArrays = separateArrayBySubject(dataArray);
		setDataArrayFormat(Object.values(separateArrays));
		
  }, [dataArray]);

	//add focus for active input
	useEffect(() => {
    if (editingItemId) {
      inputRef.current.focus();
    }
  }, [editingItemId]);

	useEffect(() => {
    if (isAddVisiable) {
      inputRef.current.focus();
    }
  }, [isAddVisiable]);
	
	//effect run once when component was created
	// useEffect(() => {
	// 	setNewSbj(currentUser.sbjs[0])// set by default first teacher\s sbj to select (add new cat elem)
  // }, []);

  // console.log(dataArrayFormat.l);


  return (
	<div className='mt4 section_categories'>
		<div className="container">
		<h1 className=''>My Categories</h1>
		<div className="cats__wrap table_data mt4">
			<div className="mt2 msg_block">
				{errors.item_name && <span className='input_error mp2'>{errors.item_name}</span>}

				{message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
			</div>
			<div>
				<ul className="tab-list">
					{dataArrayFormat && dataArrayFormat.map((tab,i) => (
						<li
							key={"tab-"+i}
							className={i === activeTab ? 'active' : ''}
							onClick={() => setActiveTab(i)}
						>
						{tab[0].subject_name}
						</li>
					))}
				</ul>
				{/* {activeTab} */}
				{/* {catsFormat &&catsFormat[activeTab]&& catsFormat[activeTab][0].subject_name} */}

				<div className="tab-content">
					{dataArrayFormat && dataArrayFormat[activeTab] && dataArrayFormat.length!==0 ? 
						dataArrayFormat[activeTab].map((item, i) => (
							<div key={"tabContent-"+i} className="table_item d-flex jcs g2 aic">
								{editingItemId === item.id_category ? (
											<div className="">
												<input
													type="text"
													name="item_name"
													value={editedText}
													ref={inputRef}
													onChange={handleInputChange}
												/>
												{currentUser.sbjs.length>1 && (
													<select name="sbj_cat" onChange={handleSelectChange} defaultValue={dataArrayFormat[activeTab][0].subject_name}>
														{currentUser.sbjs && currentUser.sbjs.map((elem, j)=>(
															<option key={`sbj-${j}`} value={elem}>
																{elem}
															</option>
														))}
													</select>
													)}
												
											</div>
											
											
										) : (
											<div className="item_title">
												<span className='editUserInfo_field'>{item.category_name}</span>
											</div>
										)}
									
										<div className="cat_edit table_icon">
											{editingItemId === item.id_category ? (
												<button onClick={() => handleSave(item.id_category, item.id_subject)} className=''>
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
							)):(
								<div className="no-items">List is empty</div>
							)
					}
				</div>
			</div>

			{isAddVisiable && (
				<div className="cat_item d-flex aic mb2 g1 p2">
					<div className="d-flex g1">
						<input
							type="text"
							name="add_item"
							value={newItemName}
							ref={inputRef}
							onChange={handleInputAddChange}
						/>
						{currentUser.sbjs.length>1 && (
							<select 
								id="sbjs" 
								name="sbj_cat" 
								onChange={handleSelectAddChange} 
								defaultValue={dataArrayFormat&&dataArrayFormat.length!==0 ? 
									dataArrayFormat[activeTab][0].subject_name : ""}>
								{currentUser.sbjs && currentUser.sbjs.map((elem, i)=>(
									<option key={`sbj-${i}`} value={elem}>
										{elem}
									</option>
								))}
							</select>
							)}
						{errors.add_item && <span className='input_error'>{errors.add_item}</span>}

					</div>

					<button onClick={() => handleAddNewItem()} className=''>
						<SaveIcon/>
					</button>
					<button onClick={() => handleAddSection()} className='btn_blue'>
						Cancel
					</button>
				</div>
			)}
			
		</div>
		{!isAddVisiable && (
			<div className="add_newItem mt4"><button className="link d-flex jcsb aic g1" onClick={handleAddSection}><AddIcon/>add new category</button></div>
		)}
		

		</div>
	  
		
	</div>
  )
}


export default Categories;
