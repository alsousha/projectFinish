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
import ExcelUploadComponent from '../Tasks/ExcelUploadComponent.jsx';

function Accounts() {
	const { id_class } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [hasAccess, setHasAccess] = useState(false);

	const inputRef = useRef(null);
	const { currentUser} = useContext(AuthContext)
	
	const [class_name, setClassName] = useState('');
	const [accounts, setAccounts] = useState([]);
	const [message, setMessage] = useState({}); //msg from DB
	const [errors, setErrors] = useState({}); //Validations errors
	//add new student
	const [newItemName, setNewItemName] = useState('')
	const [errorEmails, setErrorEmails] = useState([])
	const [notFoundEmails, setNotFoundEmails] = useState([])
	const [studentsArray, setStudentsArray] = useState([]) //array students accounts from upload file
	const[isAddItemVisiable, setIsAddItemVisiable] = useState(false)

	const handleDelete = (itemId) => {
		if (window.confirm('Are you sure delete this class?')) {
			deleteItem(itemId)
    }
	}

	const handleAddNewItem = () => {
		const fieldErrors = validateField(['email']);
		// console.log(fieldErrors);

		if (Object.keys(fieldErrors).length === 0) {
			addNewItem(newItemName, true)
			
			// setErrors({});
			// setNewCatname("")
			// setIsAddClassVisiable(false)
		}else{
			setErrors(fieldErrors);
		}
    
  };

	const handleInputAddItemChange = (e) => {
    setNewItemName(e.target.value);
  };
	//add students from file
	// const handleStudentsArray = (arr) => {
	// 	arr.map((email)=>{
	// 		if(!isValidEmail(email)){
	// 			//add invalid email to arr
	// 			setErrorEmails((prevErrorEmails) => [...prevErrorEmails, ...email]);

	// 			const msg={
	// 				msgClass: "error",
	// 				message: `Next emails are not correct. First change file of students and try again: ${errorEmails.join(', ')}`
	// 			}
	// 			setMessage(msg);		
	// 			console.log(errorEmails);
	// 			// errorEmails.push(email)

				
				
	// 		}else {
	// 			// setNewItemName(email)
	// 			addNewItem(email)
	// 			// validEmails.push(email)
	// 		}
	// 	})
  // };
	
	// const handleStudentsArray = (arr) => {
	// 	const invalidEmails = [];
	// 	const notFoundEmail = [];
	
	// 	arr.forEach((email) => {
	// 		if (email.length!=0 && !isValidEmail(email)) {
	// 			invalidEmails.push(email);
	// 		} else {
	// 			addNewItem(email);
	// 		}
	// 	});
	
	// 	if (invalidEmails.length > 0) {
	// 		const msg = {
	// 			msgClass: "error",
	// 			message: `Next emails are not correct. First change the file of students and try again: ${invalidEmails.join(", ")}`,
	// 		};
	// 		setMessage(msg);
	// 	}
	// };
	const handleStudentsArray = async (arr) => {
		const invalidEmails = [];
		const notFoundEmails = [];
	
		for (const email of arr) {
			if (email.length !== 0 && !isValidEmail(email)) {
				invalidEmails.push(email);
			} else {
				try {
					// Await the promise from addNewItem
					await addNewItem(email);
				} catch (error) {
					if (error.notFoundEmail) {
						// If user not found, add the email to notFoundEmails array
						notFoundEmails.push(error.notFoundEmail);
					} 
				}
			}
		}
	
		if (invalidEmails.length > 0) {
			const msg = {
				msgClass: "error",
				message: `Next emails are not correct. First change the file of students and try again: ${invalidEmails.join(", ")}`,
			};
			setMessage(msg);
		}
	
		if (notFoundEmails.length > 0) {
			const msg = {
				msgClass: "error",
				message: `Next users not found: ${notFoundEmails.join(", ")}`,
			};
			setMessage(msg);
		}
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


	//axios for DB
	// const addNewItem = async (email)=>{
	// 	axios
	// 	.post(`/teacher/students/${currentUser.id_user}`, {student_email: email, id_class:id_class})
	// 	.then((res) => {
	// 		if(res.status===209){
	// 			//add not found emails to arr
	// 			const notFound = [...notFoundEmails];
	// 			setNotFoundEmails((prevEmails) => [...prevEmails, ...email]);
	// 			const msg={
	// 				msgClass: "error",
	// 				message: `Next users not found: ${notFound.join(", ")}` 
	// 			}
	// 			setMessage(msg);
	// 		}else{
	// 			// const tmpCat = res.data
	// 			setAccounts((prevCats) =>
	// 			[...prevCats, res.data]
	// 			);	

	// 			// console.log(res.status===200);
	// 			// const msg={
	// 			// msgClass: res.status===200 ? "success" : "error",
	// 			// message: res.status===200 ? "New student added successfully!" : 'Error add student'
	// 			// }
	// 			// setMessage(msg);
	// 			fetchData()
	// 			setNewItemName('')
	// 			setIsAddItemVisiable(false)
	// 			// Clear the message after 2 seconds 
	// 		}
			
			
  //   })
  //   .catch((error) => {
	// 		// console.log(email);
	// 		// setErrorEmails((prevErrorEmails) => [...prevErrorEmails, ...email]);
	// 		// errorEmails.push(email)
  //     console.error('Error add student', error);
	// 		const msg={
	// 			msgClass:  "error",
	// 			message: 'Error add student'
	// 		}
  //     // setMessage(msg);
  //   })
	// 	.finally(() => {
  //     // setTimeout(() => {
	// 		// 	setMessage('');
	// 		// }, 2000);
  //   });
	// }
	const addNewItem = async (email, isSingleEmail) => {
		if(isSingleEmail){
		axios
			.post(`/teacher/students/${currentUser.id_user}`, {student_email: email, id_class:id_class})
			.then((res) => {
				if(res.status===209){
					
					const msg={
						msgClass: "error",
						message: `User ${email} not found` 
					}
					setMessage(msg);
				}else{
					// const tmpCat = res.data
					setAccounts((prevCats) =>
					[...prevCats, res.data]
					);	

					// console.log(res.status===200);
					const msg={
					msgClass: res.status===200 ? "success" : "error",
					message: res.status===200 ? "New student added successfully!" : 'Error add student'
					}
					setMessage(msg);
					fetchData()
					setNewItemName('')
					setIsAddItemVisiable(false)
					// Clear the message after 2 seconds 
				}
				
				
			})
			.catch((error) => {
				// console.log(email);
				// setErrorEmails((prevErrorEmails) => [...prevErrorEmails, ...email]);
				// errorEmails.push(email)
				console.error('Error add student', error);
				const msg={
					msgClass:  "error",
					message: 'Error add student'
				}
				// setMessage(msg);
			})
			.finally(() => {
				// setTimeout(() => {
				// 	setMessage('');
				// }, 2000);
			});
		}else{
			return new Promise((resolve, reject) => {
				axios
					.post(`/teacher/students/${currentUser.id_user}`, { student_email: email, id_class: id_class })
					.then((res) => {
						if (res.status === 209) {
							// If user not found, reject the promise with not found email
							reject({ notFoundEmail: email });
							fetchData()
							setNewItemName('')
							setIsAddItemVisiable(false)
						} else {
							// If user is found, resolve the promise with the data
							resolve(res.data);
						}
					})
					.catch((error) => {
						console.error('Error add student', error);
						reject(error);
					});
			});
		};
		
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
	function capitalizeFirstLetter(str) {
		return str&&str.charAt(0).toUpperCase() + str.slice(1);
	}
	// console.log(errorEmails);
	// console.log(notFoundEmails);
  return (
	<div className='mt4 section_accounts'>
		<div className="container">
		<h2 className='center'>Accounts of Class: {class_name}</h2>
			<div className="back mt2 btn_main">
				<Link className="d-flex aic g1" to="/teacher/classes"><BackIcon/><span>Go Back</span></Link>
			</div>
			<div className="mt5">
				{message ? <span className={message.msgClass}>{message.message}</span> : <span></span>}
			</div>
			<div className="add_newItem mt4 mb3"><button className="link d-flex jcsb aic g1" onClick={() => setIsAddItemVisiable(true)}><AddIcon/>add new student</button></div>

			{isAddItemVisiable && (
				<>
					<div className=''>
						<div className="cat_item d-flex g2 aic mb2">
							<p>Enter student's email:</p>
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
						<div className="cat_item d-flex g2 aic">
							<p>Load file with student's email:</p>
							<ExcelUploadComponent handleStudentsArray={handleStudentsArray} />
						</div>
					</div>
				</>
				
			)}
		<div className="cats__wrap table_data mt4 tab-content">
			
			<div className="table_item title d-flex jcsb aic mb2">
				<span className='table_elem small'>N.</span>
				<span className='table_elem'>Name</span>
				<span className='table_elem'>Lastname</span>
				<span className='table_elem'>Email</span>
			</div>
			{accounts.length!==0 ? accounts.map((item, i) => (
				<div key={"account-"+item.id_user + i} className="table_item d-flex jcsb aic">
					<div className="d-flex jcsb aic table">
							<span className='table_elem small'>{i+1}.</span>
							<span className='table_elem'>{capitalizeFirstLetter(item.name)}&nbsp;</span>
							<span className='table_elem'>{capitalizeFirstLetter(item.lastname)}&nbsp;</span>
							<span className='table_elem'>{item.email}</span>
					</div>
					<div className="class_delete table_icon">
						<button onClick={() => handleDelete(item.id_user)} ><DeleteIcon/></button>
					</div>
				</div>
			)):(
				<div className="no-items">Student's list is empty</div>
			)}

			
			
		</div>

		</div>
	  

	</div>
  )
}


export default Accounts;
