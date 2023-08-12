import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

import ReactQuill from 'react-quill';
import { API_URL } from '../constans';
import { ReactComponent as BackIcon } from '../assets/img/back.svg';
import NotFound from './404';

import axios from 'axios'

function CreateArticle() { 
	const inputRef = useRef(null);
	const navigate = useNavigate();

	const { id } = useParams(); //id article
	const location = useLocation();
	const article = location.state?.item;
	const { currentUser } = useContext(AuthContext);
	const [hasAccess, setHasAccess] = useState(false);

	//errors
  const [message, setMessage] = useState({}); //msg from DB
  const [errors, setErrors] = useState({}); //Validations

	const [selectedData, setSelectedData] = useState({});
	const [imagePreview, setImagePreview] = useState('');

	const specificData = true

	
	useEffect(() => {
		setHasAccess(true)
  }, [id, currentUser.id_user]);
	
	useEffect(() => {
		if (currentUser.role === 'admin') {
			const articleObj = {
				selectedTitle: '',
				selectedText: '',
				selectedImage: '',
			}
			setSelectedData(articleObj)
			// setImagePreview(`${API_URL}/${article.art_img}`)
		}
  }, []);
	if (!hasAccess) {
    return <div>Error: You do not have access to this page.</div>;
  }
	
	// console.log(article);
	
	const handleTitleChange = (event) => {
    setSelectedData((prevData) => ({
      ...prevData,
      selectedTitle: event.target.value,
    }));
  };
	const handleTextChange = (val) => {
    // console.log(val);
    setSelectedData((prevData) => ({
      ...prevData,
      selectedText: val,
    }));
  };
	const handleFileChange = (event) => {
		const file = event.target.files[0];
    const msg = {
      msgClass: '',
      text: '',
    };
    setMessage(msg);

    // Check if a valid file is selected
    if (!file || !file.type.startsWith('image/')) {
      msg.msgClass = 'error';
      msg.text = 'Incorrect type of image file.';
      setMessage(msg);
      return;
    }

    setSelectedData((prevData) => ({
      ...prevData,
      selectedFile: event.target.files[0],
    }));
		// Create a file reader for thumb
    const reader = new FileReader();
    // Set up the file reader onload event
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    // Read the image file as a data URL
    reader.readAsDataURL(file);
  };
	const handleSaveData = () => {
	
		const msgValidation = validateField() //check inputs and task's name
		// console.log(!selectedData.selectedFile || selectedData.selectedFile==='');
		if(msgValidation.msgClass==='error'){
			setMessage(msgValidation)
			setTimeout(() => {
				setMessage('');
			}, 2000);
		}else{
			//edit task
			createTask()
			setTimeout(() => {
				// setMessage('');
				navigate("/admin/blog")
			}, 2000);
		}
		
  };
	const validateField = () =>{
		const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
		// console.log(selectedData.selectedFile.type);
		// console.log(!selectedData&&!allowedFormats.includes(selectedData.selectedFile.type));
		// const allValuesNotEmpty = Object.values(dataObject).every(value => value !== '');
		// console.log(Object.values(dataObject).length);
		// console.log(dataObject);
		
		const msg = {
			msgClass:'',
			text:''
		}
		//check task's name
		if(selectedData.selectedTitle===''){
			msg.msgClass='error';
			msg.text='Article\'s name is require'
		}else if(selectedData.selectedText===''){
			msg.msgClass='error';
			msg.text='Text is require'
		}else if(!selectedData.selectedFile || selectedData.selectedFile===''){
			msg.msgClass='error';
			msg.text='Image file is require'
		}else if(!selectedData&&!allowedFormats.includes(selectedData.selectedFile.type)){
			msg.msgClass='error';
			msg.text='Incorrect type of image file.'
		}
		return msg;
	}
	//axios for DB
	const createTask = async ()=>{
		// console.log(dataToSend);
		// const id_teacher = currentUser.id_user

		const formData = new FormData();
		formData.append('dataToSend', JSON.stringify(selectedData));
		formData.append('id_articel', id);
		formData.append('selectedFile', selectedData.selectedFile); 
		axios
		.post(`/admin/createarticle`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    })
		.then((res) => {
			const msgText = "Create the article successfully!"
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				text: res.status===200 ?  msgText : 'Error add task'
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
// console.log(selectedData.selectedText);
	
	if (currentUser.role !== 'admin') {
    return <NotFound />;
  }
	
	// const articleName = article.art_title
	// const imageUrl = `${API_URL}/${article.art_img}`;

	// console.log(selectedData);
	return (
		<div className='container'>
			<h2 className='center mt4'>Create article</h2>
			<div className='control d-flex jce g1 mt2'>
				<div className='back btn_main'>
					<Link className='d-flex aic g1' to='/admin/blog'>
						<BackIcon />
						<span>Go Back</span>
					</Link>
				</div>
			</div>
			<div className='msg_block'>
          {message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
			</div>
			<div className='article_data'>
				{/* article title */}
				<div className='task_data-item w100'>
					<span className='label'>Title:</span>
					<input
						type='text'
						name='name'
						value={selectedData.selectedTitle}
						ref={inputRef}
						onChange={handleTitleChange}
					/>
					{errors.add_item && <span className='input_error mp2'>{errors.add_item}</span>}
				</div>
				{/* img */}
				<div className='task_data-group d-flex mt3'>
					<div className='task_data-item'>
						<span className='label'>Task's image:</span>
						<input type='file' onChange={handleFileChange} />
						<div className="task__thumb w50">
							{/* <img src={imageUrl} alt="Task Image" /> */}
							{imagePreview&&<img src={imagePreview} alt='Image Preview' />}

						</div>
					</div>
				</div>
				{/* article text */}
				<div className='editorContainer art mt3'>
					{selectedData&& <ReactQuill
						theme='snow'
						value={selectedData.selectedText}
						onChange={(e) => handleTextChange(e)}
					/>}
				</div>

				
			</div>
			<button
				className='btn_blue active mt2 mb2'
				onClick={handleSaveData}>
				Create task
			</button>
		
		</div>
	)
}

export default CreateArticle
