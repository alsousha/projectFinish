import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext.js';
import { useNavigate  , useLocation,  useParams  } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'
import Loading from '../../components/Loading.jsx';
import Task_card from '../Tasks/Task_card.jsx';

import { ReactComponent as CheckIcon } from '../../assets/img/check.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/remove.svg';
import { ReactComponent as BackIcon } from '../../assets/img/back.svg';
import { ReactComponent as AddIcon } from '../../assets/img/add2.svg';
import { ReactComponent as AddIcon2 } from '../../assets/img/add.svg';
import MoreInfo from '../../components/MoreInfo.jsx';




function SingleClassFolder(props) {
	const { id_tskFolder } = useParams();
	const location = useLocation();
	
	const folder_name = new URLSearchParams(location.search).get('folder_name');
	const subject_name = new URLSearchParams(location.search).get('sbj');
	const [isLoading, setIsLoading] = useState(true);
	const [hasAccess, setHasAccess] = useState(false);

	const { currentUser} = useContext(AuthContext)
	const [dataArray, setDataArray] = useState([]);
	const [categories, setCategories] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [isFolderPublish, setIsFolderPublish] = useState(false);
	// const [notAddedTasks, setNotAddedTasks] = useState([]);

	//errors
	const [message, setMessage] = useState({}); //msg from DB
	const [errors, setErrors] = useState({}); //Validations 

	//add new item
  const [selectedCategory, setSelectedCategory] = useState({});
  // const [selectedTask, setSelectedTask] = useState({});
	const [isAddVisiable, setIsAddVisiable] = useState(false)
	const [publishBtnClass, setPublishBtnClass] = useState('no-active')
	const [textAddTasks, setTextAddTasks] = useState("Please, choose first category")

	const navigate = useNavigate();
 
	const fetchData = async () => {
		try {
			const res = await axios.post(`/teacher/tasksbyfolder`, {id_folder: id_tskFolder});
			// if(res.status===200) setDataArray(res.data)
			if(res.status===200){
				// console.log(res.data);
				return res.data
			} 
		} catch (err) {
			console.log(err);
		}
	};
	const fetchCategories = async () => {
    try {
      const res = await axios.post(`/teacher/catssubject`, {id_folder: id_tskFolder});
			// console.log(res.data[0]);
			if(res.status===200){
				// fetchTasks(res.data[0]).then(data => setTasks(data))
				setSelectedCategory(res.data[0])
				return res.data
			} 
      // return response.data;
    } catch (error) {
      console.error('Error fetching categories', error);
      throw error;
    }
  };
	const fetchTasks = async (id_category) => {
		// console.log(id_category);
    try {
      const res = await axios.get(`/tasks/taskscategory/${id_category}`);
      // console.log(res.data);
			if(res.status===200) return res.data
    } catch (error) {
      console.error('Error fetching categories', error);
      throw error;
    }
  };
	const fetchFolderStatus = async () => {
		try {
			const res = await axios.get(`/tasks/folderstatus/${id_tskFolder}`);
			// console.log(res.data );
			if(res.status===200) return res.data
		} catch (err) {
			console.log(err);
		}
	};
	

	useEffect(() => {
		// Fetch initial list of tasks
    fetchData().then(data => setDataArray(data));
		fetchFolderStatus().then(data=>{
			console.log(data);
			setIsFolderPublish(data)
		})
    fetchCategories().then(data => {
			setCategories(data)
			// setSelectedCategory(categories[0])
			
			// fetchTasks().then(data => setTasks(data));
		})
		// console.log(selectedCategory);
    // fetchTasks().then(data => setTasks(data));

		
  }, []);
	// console.log(selectedCategory);
	useEffect(() => {
		// console.log("rrr");
    const checkOwnership = async () => {
      try {
        // Make an API request to check if the folder ID exists for the teacher
        const res = await axios.post(
					`/teacher/folder`,
					{id_teacher:currentUser.id_user, id_folder: id_tskFolder});
        setHasAccess(res.data.some((item) => item.id_tskFolder === Number(id_tskFolder)));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    checkOwnership();
  }, [id_tskFolder, currentUser.id_user]);
	
	if (isLoading) {
    return <Loading/>;
  }
	if (!hasAccess) {
    return <div>Error: You do not have access to this class.</div>;
  }
	const handleAddSection = () => {
		setIsAddVisiable(!isAddVisiable)
	}
	const handleGoBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

	const handleAddNewItem = (id_task) => {
		// console.log(id_task);
		addNewItem(id_task)
		// setIsAddVisiable(false)
		fetchData().then(data => {
			setDataArray(data)
			setTasks(updatedTasks(id_task));
		});
  };

	const handleDeleteItem = (id_task) =>{
		// console.log(id_task);
		deleteItem(id_task)
	}
	const handleSelectAddChange = async e=>{
		// console.log(e.target.value);
		if(e.target.value!=="empty"){
			setTextAddTasks("There isn't tasks in this category")
			setSelectedCategory(e.target.value)
			
			const {id_category} = categories.find(item => item.category_name === e.target.value)
			// console.log(id_category);
			fetchTasks(id_category).then(data=>{
				const updatedItems = (dataArray) ? updatedTasksInAddSection(data) : data
				setTasks(updatedItems)

			})
		}else{
			setSelectedCategory({})
			setTasks()
			setTextAddTasks("Please, choose first category")
		}
		// setNewSbj(e.target.value)
		// console.log("sekl"+newSbj);
		
	}
	const handlePublishTasks = () =>{
		// console.log(dataArray);
		if (window.confirm('Are you sure want to publish this folder?')) {
      publishFolder();
      // setCurrentUser(null);
    }
	}

//update array of tasks: if task was added -> set class 'no-active'
const updatedTasksInAddSection = (data) => {
	return data && data.map(item => {
		if (dataArray && dataArray.some(choosedItem => choosedItem.id_task === item.id_task)) {
			return { ...item, className: 'no-active' };
		} else {
			return { ...item, className: 'active' };
		}
	});
};
//func for change class of added task
const updatedTasks = (id_task) => tasks.map(item => {
	// console.log(item);
  if (item.id_task === id_task) {
		// console.log(item.classNam);
		const newClassName = item.className === 'no-active' ? 'active' : 'no-active';
    return { ...item, className: newClassName };
  } else {
    return item;
  }
});

//axios for DB
const addNewItem = async(id_task)=>{			
	axios
	.post(`/tasks/tasktofolder/${id_task}`, {id_tskFolder: id_tskFolder})
	.then((res) => {
		// console.log(res.data);
		setDataArray((prev) =>{
			//check if dataArray is empty (undefined)
			if (prev === undefined) {
				return [res.data];
			} else {
				return [...prev, res.data];
			}
		});	
		setPublishBtnClass('active')
		const msg={
			msgClass: res.status===200 ? "success" : "error",
			text: res.status===200 ? "Task added successfully!" : 'Error add task'
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
const deleteItem = async(id_task)=>{
	axios
	.delete(`/tasks/taskfromfolder/${id_task}?folder=${id_tskFolder}`)
	.then((res) => {
		// console.log(res.data);
		// setDataArray((prev) =>{
		// 	//check if dataArray is empty (undefined)
		// 	if (prev === undefined) {
		// 		return [res.data];
		// 	} else {
		// 		return [...prev, res.data];
		// 	}
		// });	
		if(dataArray.length=== 1) setPublishBtnClass('no-active')
		fetchData().then(data => {
			setDataArray(data)
			setTasks(updatedTasks(id_task));
		});
		const msg={
			msgClass: res.status===200 ? "success" : "error",
			text: res.status===200 ? "Task deleted successfully!" : 'Error delete task'
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
	// fetchData()
}
const publishFolder = async()=>{			
	axios
	.post(`/tasks/publishfolder/${id_tskFolder}`)
	.then((res) => {
		if(res.status===200){
			setIsFolderPublish(1)
		}
		const msg={
			msgClass: res.status===200 ? "success" : "error",
			text: res.status===200 ? "Folder published successfully!" : 'Error publish folder'
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
const isPublishText = 'You can not modify this folder bacause it was published'
const isNotPublishText = 'Add/Remove Tasks and click the "Publish Tasks" button. Please note that once a folder is published, you will NOT be able to edit or delete the folder'
return (
		<div className='mt3'>
			<div className="container">
				<h2>Folder: {folder_name}</h2>

				<h3 className='mt2 mb1'>Subject: {subject_name}</h3>
				
				<div className="mt2 mb1">
					<h3 className='mb1'>Status: {isFolderPublish? 'publish' : 'not publish'}</h3>	
					{!isFolderPublish && <button className={`btn_accent ${publishBtnClass}`} onClick={handlePublishTasks}>Publish tasks</button>}
				</div>
				<MoreInfo text={isFolderPublish ? isPublishText : isNotPublishText}/>
				<div className="back mt2 btn_main">
					<button onClick={handleGoBack} className="d-flex aic g1"><BackIcon/><span>Go Back</span></button>
				</div>
				<div className="msg_block">
					{message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
				</div>
				

				<div className="arr_wrap tasks_wrap d-flex flex-4 jcsb">
					{dataArray&&dataArray.length!==0 ?
						dataArray.map((item,i)=>(
							<div key={"f-task"+item.id_task} className="arr_item d-flex f-column jcc">
								<Task_card item={item}/>
								{!isFolderPublish && <button onClick={() => handleDeleteItem(item.id_task)} className='mt1'><DeleteIcon/></button>}
							</div>
						)
						
						) : (
							<div className="no-items">List is empty</div>
						)	
						
					}
					<div className="arr_item"></div>
					<div className="arr_item"></div>
				</div>
				{!isFolderPublish && <div className="add_newItem mt2">
					<button className="link d-flex jcsb aic g1" onClick={handleAddSection}>
						<AddIcon/>
						add new task
					</button>
				</div>}

				{!isFolderPublish&&isAddVisiable && (
					<div className="mb2">
						{categories && categories.length>0 ? (
							<div className="add_tasks__wrap d-flex jcsb">
								<div className="select">
									<select 
										id="cats" 
										name="cat" 
										onChange={handleSelectAddChange} 
											>
										<option value="empty">Select a category</option>
										{categories.map((elem, i)=>(
											<option key={`cat_f-${i}`} value={elem.category_name}>
												{elem.category_name}
											</option>
										))}
									</select>
								</div>
								
								<div className="add_tasks__inner arr_wrap tasks_wrap d-flex flex-3 jcsb">
									
									{tasks&&tasks.length!==0 ?
										tasks.map((item,i)=>(
											<div key={"add-task"+item.id_task} className={`arr_item d-flex f-column ${item.className}`}>
												<Task_card item={item}/>
												<button onClick={() => handleAddNewItem(item.id_task)} className='mt1'>
													<AddIcon2/>
												</button>
											</div>
										)) : (
											// {selectedCategory==="se"}
											<div className="no-items">{textAddTasks}</div>
										)	
									}

								</div>
							</div>
						
						):(
							<div>First you need create category for current subject ({subject_name})</div>
						)}
						{errors.add_item && <span className='input_error'>{errors.add_item}</span>}


						<button onClick={() => handleAddNewItem()} className=''>
							<CheckIcon/>
						</button>
					</div>
				)}

			</div>
			
			
		</div>
	)
}

export default SingleClassFolder
