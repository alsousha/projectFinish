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
	
	const [editingItemId, setEditingItemId] = useState(null);
	const [editedText, setEditedText] = useState('');

	const [class_name, setClassName] = useState('');
	const [tskfolders, setTaskfolders] = useState([]);
	// const [catsFormat, setCatsFormat] = useState()
	// const [editing, setEditing] = useState(false);
	// const [errors, setErrors] = useState({}); //Validations errors
	// const [editedText, setEditedText] = useState('');
	const [message, setMessage] = useState({}); //msg from DB
	const [errors, setErrors] = useState({}); //Validations errors
	//add new class
	const [newItemName, setNewItemName] = useState('')
	// const [newSbj, setNewSbj] = useState({})
	const[isAddItemVisiable, setIsAddItemVisiable] = useState(false)

	// console.log(cats);
	const handleEdit = (itemId, initialText) => {
		setErrors({})
    setEditingItemId(itemId);
		setEditedText(initialText);
  };

	const handleDelete = (itemId) => {
		if (window.confirm('are you sure you want to delete this folder and all its tasks?')) {
			deleteItem(itemId)
    }
	}
		
	const handleSave = (itemId) => {
		console.log(editedText);
		const fieldErrors = validateField(['item_name']);
		console.log(fieldErrors);
		if (Object.keys(fieldErrors).length === 0) {
			setTaskfolders((prevItems) =>
				prevItems.map((item) =>
					item.id_tskFolder === itemId ? { ...item, tskFolder_name: editedText } : item
				)
			);
			setEditingItemId(null);
			setErrors({});

			update({id_tskfolder: itemId, tskFolder_name: editedText}) //send current data for response to serever
		}else{
			setErrors(fieldErrors);
		}
    
  };

	
	const handleAddNewItem = () => {
		const fieldErrors = validateField(['new_item']);
		// console.log(fieldErrors);

		if (Object.keys(fieldErrors).length === 0) {
			addNewItem()
			
			// setErrors({});
			// setNewCatname("")
			// setIsAddClassVisiable(false)
		}else{
			setErrors(fieldErrors);
		}
    
  };

	const handleInputChange = (e) => {
    setEditedText(e.target.value);
		// console.log(newItemName);
  };
	const handleInputAddItemChange = (e) => {
    setNewItemName(e.target.value);
  };

	const validateField = (fieldNames) => {
    const errors = {};
		fieldNames.forEach(fieldName => {

			switch (fieldName) {
				case 'item_name':
					if (!editedText.trim()) {
						errors[fieldName] = 'Name is required';
					}
					break;
				case 'item_name':
					if (!newItemName.trim()) {
						errors[fieldName] = 'Name is required';
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
		console.log(e.target.value + " select");
		// setNewSbj(e.target.value)
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
	const addNewItem = async ()=>{
		
		axios
		.post(`/teacher/tskfolder`, {tskFolder_name: newItemName, id_class: id_class})
		.then((res) => {
			// console.log(res.data);
			// const tmpCat = res.data
			setTaskfolders((prevCats) =>
				[...prevCats, res.data]
			);	
			
			console.log(res.status===200);
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				message: res.status===200 ? "New student added successfully!" : 'Error add student'
			}
      setMessage(msg);
			fetchData()
			setNewItemName('')
			setIsAddItemVisiable(false)
			 // Clear the message after 2 seconds 
			
    })
    .catch((error) => {
      console.error('Error updating class name', error);
			const msg={
				msgClass:  "error",
				message: 'Error add student'
			}
      setMessage(msg);
    })
		.finally(() => {
      setTimeout(() => {
				setMessage('');
			}, 2000);
    });
	}
	const update = async (currentData) => {
		console.log(currentData);
		axios
    .put(`/teacher/tskfolder/${currentData.id_tskfolder}`, currentData)
    .then((res) => {
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				message: res.data
			}
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
    .delete(`/teacher/tskfolder/${itemId}` )
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
			// fetchData();
    })
    .catch((error) => {
      console.error('Error deleting student', error);
    });
		fetchData()
  };

	//separate categories by id_subject
	function separateArrayBySubject(data) {
		// return data.reduce((result, item) => {
		// 	const idSubject = item.id_subject;
		// 	if (!result[idSubject]) {
		// 		result[idSubject] = [];
		// 	}
		// 	result[idSubject].push(item);
		// 	return result;
		// }, {});
	}
	
	//fetch tsks folders of teacher
	const fetchData = async () => {
		// console.log(id_class);
		try {
			const res = await axios.post(`/teacher/${currentUser.id_user}/taskfolders`, {id_class: id_class});
			if(!res.data.noElements){
				// console.log(res.data.data[0].class_name);
				setClassName(res.data.data[0].class_name)
				setTaskfolders(res.data.data)
				// console.log(tskfolders);
			}else{
				setClassName(res.data.class_name)
			}
			// console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	// Helper function to check email format using regular expression
	const isValidEmail = (email) => {
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		return emailRegex.test(email);
	};

	//add focus for active input
	useEffect(() => {
		if (editingItemId) {
			inputRef.current.focus();
		}
	}, [editingItemId]);
		
	useEffect(() => {
    fetchData();
  }, []);

	// useEffect(() => {
	// 	const separateArrays = separateArrayBySubject(cats);
	// 	setCatsFormat(separateArrays);
	// 	// setCountTeacherSbjs(Object.keys(separateArrays).length); //count of current sbjs of teacher
	// 	// setCountTeacherSbjs(currentUser.sbjs.length); //count of current sbjs of teacher
  //   // const fetchData = async () => {
  //   //   try {
  //   //     // const res = await axios.get(`/teacher/${currentUser.id_user}/cats`);
	// 	// 		// console.log(res.data);
	// 	// 		// const separateArrays = separateArrayBySubject(res.data);
				
	// 	// 		// setCats(separateArrays(res.data));
	// 	// 		// console.log(JSON.stringify(separateArrays) + "separateArrays");
	// 	// 		// setCatsFormat(separateArrays);
	// 	// 		// console.log(cats);
				
  //   //   } catch (err) {
  //   //     console.log(err);
  //   //   }
  //   // };
  //   // fetchData();
  // }, [cats]);

	//add focus for active input
	// useEffect(() => {
  //   if (editingItemId) {
  //     inputRef.current.focus();
  //   }j
  // }, [editingItemId]);
	
	//effect run once when component was created
	// useEffect(() => {
	// 	setNewSbj(currentUser.sbjs[0])// set by default first teacher\s sbj to select (add new cat elem)
  // }, []);

		//add focus for active input
	
	useEffect(() => {
		if (isAddItemVisiable) {
			inputRef.current.focus();
		}
	}, [isAddItemVisiable]);

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
  return (
	<div className='mt4 section_accounts'>
		<div className="container">
		<h2>Class folder of Class: {class_name}</h2>
			<div className="back mt2 btn_main">
				<Link className="d-flex aic g1" to="/teacher/classes"><BackIcon/><span>Go Back</span></Link>
			</div>
			<div className="mt5">
				{message ? <span className={message.msgClass}>{message.message}</span> : <span></span>}
			</div>
		<div className="table__wrap folder mt4 d-flex jcsb">
			
			
			{tskfolders.length!==0 ? tskfolders.map((item, i) => (
				<div key={item.id_tskFolder + i} className="table_item mb2">
					<div className="folder big d-flex f-column">
						
						<FolderIcon/>
						{editingItemId === item.id_tskFolder ? (
							<>

							<div className="">
								<input
									type="text"
									name="item_name"
									value={editedText}
									ref={inputRef}
									onChange={handleInputChange}
								/>
							</div>
							{errors.item_name && <span className='input_error'>{errors.item_name}</span>} 

							</>
						
						) : (
							<div className="item_title center">
								<span className=''>{item.tskFolder_name}</span>
							</div>
						)}
					
					
						<div className="icons__wrap">
						<div className="table_icon">
							{editingItemId === item.id_tskFolder ? (
								<button onClick={() => handleSave(item.id_tskFolder)} className=''>
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
			)):(
				<div className="no-items">Class folder is empty</div>
			)}

			
			
		</div>
		{isAddItemVisiable && (
				<>
				<div>Enter folder name:</div>
				<div className="new_item d-flex jcsb aic mb2">
					<div className="d-flex g1">
						
						<input
							type="text"
							name="new_item"
							value={newItemName}
							ref={inputRef}
							onChange={handleInputAddItemChange}
						/>
						
						{errors.new_item && <span className='input_error'>{errors.new_item}</span>}

					</div>

					<button onClick={() => handleAddNewItem()} className=''>
						<AddUserIcon/>
					</button>
				</div>
				</>
				
			)}
		<div className="add_newItem mt4"><button className="link d-flex jcsb aic g1" onClick={() => setIsAddItemVisiable(true)}><AddIcon/>create new folder</button></div>

		</div>
	  

	</div>
  )
}


export default Classfolder
