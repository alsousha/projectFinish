import React, { useContext, useEffect, useState,useRef } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { useNavigate  , useLocation,  useParams, Link  } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'
import Loading from '../../components/Loading.jsx';
import NotFound from '../../pages/404.jsx';

import { ReactComponent as BackIcon } from '../../assets/img/back.svg';



function NewTask() {
	
	const { currentUser} = useContext(AuthContext)

	const inputRef = useRef(null);
	const navigate = useNavigate()

	
	const [templates, setTemplates] = useState([]); // Array of templates
  const [instruction, setInstruction] = useState('');

	const [subjects, setSubjects] = useState([]);
	const [categories, setCategories] = useState([]); 
	const [levels, setLevels] = useState('');
	const [weights, setWeight] = useState('');

	const [newItemName, setNewItemName] = useState('')
	const [selectedSubject, setSelectedSubject] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(''); // Selected category
	const [selectedTemplate, setSelectedTemplate] = useState(''); 
	const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');

	const [createBtnActive, setCreateBtnActive] = useState(false)
	//errors
	const [message, setMessage] = useState({}); //msg from DB
	const [errors, setErrors] = useState({}); //Validations 
	
	useEffect(() => {
		
    fetchSubjects().then(data => setSubjects(data));

		const maxWeight = 10;
		const weightOptions = [];
		for (let i = 1; i <= maxWeight; i++) {
			weightOptions.push(i);
		}
		setWeight(weightOptions);
		setSelectedWeight(weightOptions[0])

		const maxLevel = 12;
		const levelOptions = [];
		for (let i = 1; i <= maxLevel; i++) {
			levelOptions.push(i);
		}
		setLevels(levelOptions);
		setSelectedLevel(levelOptions[0])

  }, []);
	useEffect(() => {
    // Fetch categories based on the selected subject from the server and set the categories state
    if (selectedSubject) {
      fetchCategories().then(data => setCategories(data));
    } else {
      setCategories([]);
    }
  }, [selectedSubject]);


	useEffect(() => {
    // Fetch templates based on the selected subject from the server and set the categories state
    if (selectedCategory) {
			fetchTemplates().then(data => {
				setTemplates(data)
				setSelectedTemplate(data[0].id_template) //set by default first template as selected
				
			}
				);
    } else {
      setTemplates([]);
    }
  }, [selectedCategory]);

// console.log(categories);
	
if (currentUser.role !=='teacher') {
	return <NotFound/>
}
	const fetchSubjects = async () => {
    try {
      const response = await axios.get(`/teacher/sbjs/${currentUser.id_user}`);
			// console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects', error);
      throw error;
    }
  };
	const fetchCategories = async () => {
    try {
      const response = await axios.get(`/teacher/catsbysubject/${selectedSubject}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories', error);
      throw error;
    }
  };
	const fetchTemplates = async () => {
    try {
      const response = await axios.get(`/teacher/templates`);
      return response.data;
    } catch (error) {
      console.error('Error fetching templates', error);
      throw error;
    }
  };
	
	const handleNameChange = (e) => {
    setNewItemName(e.target.value);
  };
	const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedCategory('');
  };
	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
    setSelectedTemplate('');
		setCreateBtnActive(true)
  };
	const handleTemplateChange = (event) => {
		// console.log(selectedTemplate);
    setSelectedTemplate(event.target.value);
  };
	const handleWeightChange = (event) => {
    setSelectedWeight(event.target.value);
  };
	const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };
	
  const handleSave = () => {
		const fieldErrors = validateField(['add_item']);
		if (Object.keys(fieldErrors).length === 0) {
			const taskData = {
				task_name: newItemName,
				id_subject: selectedSubject,
				id_category: selectedCategory,
				id_template: selectedTemplate,
				weight: selectedWeight,
				level: selectedLevel,
				instruction: instruction,
				id_teacher: currentUser.id_user
			};
			// console.log(taskData);
			axios
			.post(`/tasks/createtask`, {taskData: taskData})
			.then((res) => {
				console.log(res.status);
				const msg={
					msgClass: res.status===200 ? "success" : "error",
					text: res.status===200 ? "New task added successfully!" : 'Error add task'
				}
				setMessage(msg);
				 // Clear the message after 2 seconds 
				setTimeout(() => {
					setMessage('');
					navigate('/teacher/tasks');
				}, 2000);
			})
			.catch((error) => {
			  console.error('Error add item', error);
			});
			setErrors({})
		}else{
			setErrors(fieldErrors);
			
		}
    // Save the task data 
    
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
				// case 'item_name':
				// 	if (!editedText.trim()) {
				// 		errors[fieldName] = 'Category name is required';
				// 	}
				// 	// else if(isDublicateItemName(editedText, dataArray, itemId, id_sbj)){
				// 	// 	errors[fieldName] = 'Item with this name exists!';
				// 	// }
				// break;
			
				default:
					break;
			}
		})
		// console.log(errors);
    return errors;
  };

	return (
		<div className='d-flex '>
			<div className="container ">
				<h2 className='center mt4'>New Task</h2>
				<div className="control d-flex jce g1 mt2">
					<div className="back btn_main">
						<Link className="d-flex aic g1" to="/teacher/tasks"><BackIcon/><span>Go Back</span></Link>
					</div>
					<button className={`btn_blue ${createBtnActive ? 'active' : 'no-active'}`} onClick={handleSave}>create</button>

				</div>
				<div className="msg_block">
					{message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
				</div>
				
				<div className="task_data">
					{/* taskname */}
					<div className="task_data-item">
						<span className="label">Task's name:</span>
						<input
							type="text"
							name="add_item"
							value={newItemName}
							ref={inputRef}
							onChange={handleNameChange}
						/>
						{errors.add_item && <span className='input_error mp2'>{errors.add_item}</span>}

				</div>
					{/* subjects */}
					<div className="task_data-item">
						<span className="label">Subject:</span>
						<select value={selectedSubject} onChange={handleSubjectChange}>
							<option value="">Select Subject</option>
							{subjects.map((subject) => (
								<option key={subject.id_subject} value={subject.id_subject}>
									{subject.subject_name}
								</option>
							))}
						</select>
					</div>
					{/* categories */}
					{selectedSubject&&categories&&<div className="task_data-item">
						<span className="label">Category:</span>
						<select value={selectedCategory} onChange={handleCategoryChange}>
							<option value="">Select Category</option>
							{categories.map((cat) => (
								<option key={cat.id_category} value={cat.id_category}>
									{cat.category_name}
								</option>
							))}
						</select>
					</div>}
					{/* templates */}
					{selectedCategory&&templates&&<div className="task_data-item">
						<span className="label">Templates:</span>
						{templates.map((temp) => (
							<label key={"temp"+temp.id_template}>
								<input
									type="radio"
									value={temp.id_template}
									checked={selectedTemplate == temp.id_template}
									onChange={handleTemplateChange}
								/>
								{temp.template_name}
							</label>
						))}
						
					</div>}
					{/* weight */}
					{selectedCategory&&weights&&<div className="task_data-item">
						<span className="label">Weight of task:</span>
						<select value={selectedWeight} onChange={handleWeightChange}>
						{weights.map((weight) => (
								<option key={"weight"+weight} value={weight}>
									{weight}
								</option>
							))}
						</select>
					</div>}
					{/* level */}
					{selectedCategory&&levels&&<div className="task_data-item">
						<span className="label">Level of task:</span>
						<select value={selectedLevel} onChange={handleLevelChange}>
						{levels.map((level) => (
								<option key={"weight"+level} value={level}>
									{level}
								</option>
							))}
						</select>
					</div>}
					{/* instruction */}
					{selectedCategory&&<div className="task_data-item">
						<span className="label">Instruction:</span>
						<textarea value={instruction} onChange={(e) => setInstruction(e.target.value)} />

					</div>}

				</div>
		</div>
		</div>
	)
}

export default NewTask
