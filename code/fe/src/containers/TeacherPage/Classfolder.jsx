import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext.js';
import { Link, useParams, useLocation  } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'


import { ReactComponent as AddUserIcon } from '../../assets/img/add_user.svg';
import { ReactComponent as BackIcon } from '../../assets/img/back.svg';
import { ReactComponent as FolderIcon } from '../../assets/img/folder.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/delete.svg';
import { ReactComponent as AddIcon } from '../../assets/img/add2.svg';
import { ReactComponent as SaveIcon } from '../../assets/img/save.svg';
import { ReactComponent as CheckIcon } from '../../assets/img/check2.svg';
import { ReactComponent as EditIcon } from '../../assets/img/edit2.svg';
import Loading from '../../components/Loading.jsx';

function Classfolder() {

	const { id_class } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [hasAccess, setHasAccess] = useState(false);

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
	const[isAddVisiable, setIsAddVisiable] = useState(false)

	const [class_name, setClassName] = useState('');

	const [activeTab, setActiveTab] = useState(0);
	const handleEdit = (itemId, itemText) => {
		setErrors({})
    setEditingItemId(itemId);
		setEditedText(itemText);
	
  };

	const handleDelete = (itemId) => {
		if (window.confirm('Are you sure delete this folder?')) {
			deleteItem(itemId)
			if(dataArrayFormat&&dataArrayFormat[activeTab].length===1&&dataArrayFormat.length===activeTab+1){
				//if the last tab and last category, when we delete it or change its sbj -> first tab will be active
				setActiveTab(0)
			}
    }
	}
		
	const handleSave = (itemId, id_sbj) => {
		const fieldErrors = validateField(['item_name'], itemId, id_sbj);
		
		if (Object.keys(fieldErrors).length === 0) {
			const sbjToSend = (editedSbj==='') ? dataArrayFormat && dataArrayFormat[activeTab][0].subject_name : editedSbj

			// console.log(sbjToSend);
			setDataArray((prevItems) =>
				prevItems.map((item) =>
					item.id_tskFolder === itemId ? { ...item, tskFolder_name: editedText, subject_name: sbjToSend} : item
				)
			);
			// console.log(editedText);
			update({id_tskfolder: itemId, tskFolder_name: editedText, subject_name: sbjToSend}) //send current cat data for response to serever
			
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
					}
					// else if(isDublicateItemName(editedText, dataArray, itemId, id_sbj)){
					// 	errors[fieldName] = 'Item with this name exists!';
					// }
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
		setEditedSbj(e.target.value)
		// console.log("sekl"+newSbj);
	}

	const handleSelectAddChange = async e=>{
		// console.log(e.target.value + " select");
		setNewSbj(e.target.value)
		// console.log("sekl"+newSbj);
	}
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
		.post(`/teacher/tskfolder`, {tskFolder_name: newItemName, id_class: id_class, subject_name: sbjToSend})
		.then((res) => {
			// console.log(res.data);
			// setDataArray((prev) =>
			// 	[...prev, res.data]
			// );	
			
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				text: res.status===200 ? "New item added successfully!" : 'Error add item'
			}
			// console.log(msg);
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
		//!!!!
		const dataToSend = {tskFolder_name:currentData.tskFolder_name, subject_name: currentData.subject_name} 
		axios
    .put(`/teacher/tskfolder/${currentData.id_tskfolder}`, dataToSend)
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
    .delete(`/teacher/tskfolder/${itemId}`)
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

	//separate folders by id_subject
	function separateArrayBySubject(data) {
		return data&&data.reduce((result, item) => {
			const idSubject = item.id_subject;
			if (!result[idSubject]) {
				result[idSubject] = [];
			}
			result[idSubject].push(item);
			return result;
		}, {});
	}
	
	// function isDublicateItemName(itemForCheck, arr, itemId, id_sbj){
	// 	return arr.some((obj) => obj.category_name === itemForCheck && obj.id_category !==itemId && obj.id_subject === id_sbj);

	// }

	//fetch tsks folders of teacher
	const fetchData = async () => {
		try {
			const res = await axios.post(`/teacher/taskfolders`, {id_class: id_class});
			// console.log(res.data);
			setClassName(res.data.class_name)
			// console.log(res.data.data);
			setDataArray(res.data.data)
		} catch (err) {
			console.log(err);
		}
	};
	//add focus for active input
	useEffect(() => {
		if (editingItemId) {
			inputRef.current.focus();
		}
	}, [editingItemId]);
		
	useEffect(() => {
    fetchData();
		setEditedSbj("")	
  }, []);

	useEffect(() => {
		const separateArrays = separateArrayBySubject(dataArray);
		// console.log(separateArrays);
		separateArrays&&setDataArrayFormat(Object.values(separateArrays));
		
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

	useEffect(() => {
    const checkOwnership = async () => {
      try {
        // Make an API request to check if the class ID exists for the teacher
        const res = await axios.get(`/teacher/${currentUser.id_user}/classes`);
        setHasAccess(res.data.data.some((item) => item.id_class === Number(id_class)));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    checkOwnership();
  }, [id_class, currentUser.id_user]);
	
	if (isLoading) {
    return <Loading/>;
  }
	if (!hasAccess) {
    return <div>Error: You do not have access to this class.</div>;
  }
	// console.log(dataArray);
	
  return (
	<div className='mt4 section_accounts'>
		<div className="container">
			<h2>Class folder of Class: {class_name}</h2>
			<div className="back mt2 btn_main">
				<Link className="d-flex aic g1" to="/teacher/classes"><BackIcon/><span>Go Back</span></Link>
			</div>
			<div className="mt2">
				{errors.item_name && <span className='input_error mp2'>{errors.item_name}</span>}

				{message ? <span className={message.msgClass}>{message.message}</span> : <span></span>}
			</div>
			<div className="">
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
				<div className="table__wrap flex-4 mt4 d-flex jcsb">
					{dataArrayFormat && dataArrayFormat[activeTab] && dataArrayFormat.length!==0 ? 
						dataArrayFormat[activeTab].map((item, i) => (
							<div key={"tabContent-"+i} >
								<div key={item.id_tskFolder} className="table_item mb2">
									<div  className="folder big d-flex f-column">
										<FolderIcon/>
										{editingItemId === item.id_tskFolder ? (
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
											<div className="item_title center">
												<span className='editUserInfo_field'>{item.tskFolder_name}</span>
											</div>
										)}
										<div className="icons__wrap">
											<div className="table_icon">
												{editingItemId === item.id_tskFolder ? (
													<button onClick={() => handleSave(item.id_tskFolder, item.id_subject)} className=''>
														<CheckIcon/>
													</button>
													
												) : (
													<button onClick={() => handleEdit(item.id_tskFolder,  item.tskFolder_name)} className=''>
														<EditIcon className=""/>
													</button>
												)}
											</div>
											<div className="class_delete table_icon">
												<button  onClick={() => handleDelete(item.id_tskFolder)}><DeleteIcon/></button>
											</div>
										</div>
									</div>
								</div>
							</div>
							)):(
								<div className="no-items">List is empty</div>
							)
					}
				</div>
				{isAddVisiable && (
					<div className="cat_item d-flex jcsb aic mb2">
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
							<CheckIcon/>
						</button>
					</div>
				)}
				<div className="add_newItem mt4"><button className="link d-flex jcsb aic g1" onClick={() => setIsAddVisiable(true)}><AddIcon/>add new folder</button></div>

			</div>
		</div>
	  

	</div>
  )
}


export default Classfolder
