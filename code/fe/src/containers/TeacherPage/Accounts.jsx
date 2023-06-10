import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext.js';
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'


import { ReactComponent as AddUserIcon } from '../../assets/img/add_user.svg';
import { ReactComponent as BackIcon } from '../../assets/img/back.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/delete.svg';
import { ReactComponent as AddIcon } from '../../assets/img/add2.svg';
import Loading from '../../components/Loading.jsx';

function Accounts() {
	const { id_class } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [hasAccess, setHasAccess] = useState(false);

	const inputRef = useRef(null);
	const { currentUser} = useContext(AuthContext)
	
	const [class_name, setClassName] = useState('');
	const [accounts, setAccounts] = useState([]);
	// const [catsFormat, setCatsFormat] = useState()
	// const [editing, setEditing] = useState(false);
	// const [errors, setErrors] = useState({}); //Validations errors
	// const [editingItemId, setEditingItemId] = useState(null);
	// const [editedText, setEditedText] = useState('');
	const [message, setMessage] = useState({}); //msg from DB
	const [errors, setErrors] = useState({}); //Validations errors
	//add new class
	const [newItemName, setNewItemName] = useState('')
	// const [newSbj, setNewSbj] = useState({})
	const[isAddItemVisiable, setIsAddItemVisiable] = useState(false)

	// console.log(cats);
	const handleEdit = (itemId, initialText) => {
		// setErrors({})
    // setEditingItemId(itemId);
		// setEditedText(initialText);
  };

	const handleDelete = (itemId) => {
		if (window.confirm('Are you sure delete this class?')) {
			deleteItem(itemId)
    }
	}
		
	const handleSave = (itemId) => {
		// const fieldErrors = validateField(['cat_name']);
		// if (Object.keys(fieldErrors).length === 0) {
		// 	// console.log(cats);
		// 	// setCats((prevItems) => {
		// 	// 	const updatedCats = { ...prevItems };
		// 	// 	const item = updatedCats[itemId];
		// 	// 	if (item) {
		// 	// 		item.forEach((catItem) => {
		// 	// 			catItem.category_name = editedText;
		// 	// 		});
		// 	// 	}
		// 	// 	return updatedCats;
		// 	// });
		// 	setAccounts((prevItems) =>
		// 		prevItems.map((item) =>
		// 			item.id_category === itemId ? { ...item, category_name: editedText } : item
		// 		)
		// 	);
		// 	setEditingItemId(null);
		// 	// console.log(currentData);
		// 	// setErrors({});
		// 	update({id_cat: itemId, cat_name: editedText}) //send current cat data for response to serever
		// }else{
		// 	setErrors(fieldErrors);
		// }
    
  };

	const handleAddNewItem = () => {
		const fieldErrors = validateField(['email']);
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
    // setEditedText(e.target.value);
  };
	const handleInputAddItemChange = (e) => {
    setNewItemName(e.target.value);
  };

	const validateField = (fieldNames) => {
    const errors = {};
		fieldNames.forEach(fieldName => {

			switch (fieldName) {
				case 'email':
					if (!newItemName.trim()) {
						errors[fieldName] = 'Email is required';
					}else if (!isValidEmail(newItemName)) {
						errors[fieldName] = 'Invalid email format';
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
		.post(`/teacher/students/${currentUser.id_user}`, {student_email: newItemName, id_class:id_class})
		.then((res) => {
			// console.log(res.data);
			// const tmpCat = res.data
			setAccounts((prevCats) =>
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
		// const dataToSend = {"cat_name":currentData.cat_name} 
		// console.log("currentData.class_name");
		// axios
    // .put(`/teacher/cat/${currentData.id_cat}`, dataToSend)
    // .then((res) => {
		// 	const msg={
		// 		msgClass: res.status===200 ? "success" : "error",
		// 		message: res.data
		// 	}
    //   setMessage(msg);
		// 	// setCurrentClass({})
		// 	// updateUser(userData)//update localstorage and context
		// 	 // Clear the message after 2 seconds 
		// 	setTimeout(() => {
		// 		setMessage('');
		// 	}, 2000);
    // })
    // .catch((error) => {
    //   console.error('Error updating class name', error);
    // });
  };
	const deleteItem = async (itemId) => {
	
		axios
    .delete(`/teacher/students/${itemId}?class=${id_class}` )
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
	
	//fetch students of teacher
	const fetchData = async () => {
		// console.log(id_class);
		try {
			const res = await axios.post(`/teacher/${currentUser.id_user}/students`, {id_class: id_class});
			if(!res.data.noStudents){
				setClassName(res.data.data[0].class_name)
				setAccounts(res.data.data)
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

	useEffect(() => {
    fetchData();
  }, []);

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
		<h2>Accounts of Class: {class_name}</h2>
			<div className="back mt2 btn_main">
				<Link className="d-flex aic g1" to="/teacher/classes"><BackIcon/><span>Go Back</span></Link>
			</div>
		<div className="cats__wrap table_data mt4">
			<div className="mt5">
				{message ? <span className={message.msgClass}>{message.message}</span> : <span></span>}
			</div>
			<div className="table_item title d-flex jcsb aic mb2">
				<span className='table_elem small'>N.</span>
				<span className='table_elem'>Name</span>
				<span className='table_elem'>Lastname</span>
				<span className='table_elem'>Email</span>
			</div>
			{accounts.length!==0 ? accounts.map((item, i) => (
				<div key={item.id_user + i} className="table_item d-flex jcsb aic mb2">
					<div className="d-flex jcsb aic table">
							<span className='table_elem small'>{i+1}.</span>
							<span className='table_elem'>{item.name}&nbsp;</span>
							<span className='table_elem'>{item.lastname}&nbsp;</span>
							<span className='table_elem'>{item.email}</span>
					</div>
					<div className="class_delete table_icon">
						<button onClick={() => handleDelete(item.id_user)} ><DeleteIcon/></button>
					</div>
				</div>
			)):(
				<div className="no-items">Student's list is empty</div>
			)}

			{isAddItemVisiable && (
				<>
				<div>Enter student's email:</div>
				<div className="cat_item d-flex jcsb aic mb2">
					<div className="d-flex g1">
						
						<input
							type="text"
							name="email"
							value={newItemName}
							ref={inputRef}
							onChange={handleInputAddItemChange}
						/>
						
						{errors.email && <span className='input_error'>{errors.email}</span>}

					</div>

					<button onClick={() => handleAddNewItem()} className=''>
						<AddUserIcon/>
					</button>
				</div>
				</>
				
			)}
			
		</div>
		<div className="add_newItem mt4"><button className="link d-flex jcsb aic g1" onClick={() => setIsAddItemVisiable(true)}><AddIcon/>add new student</button></div>

		</div>
	  

	</div>
  )
}


export default Accounts;
