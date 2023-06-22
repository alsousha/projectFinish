import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { useNavigate  , useLocation,  useParams  } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'
import Loading from '../../components/Loading.jsx';
import NotFound from '../../pages/404.jsx';


function NewTask() {
	const { currentUser} = useContext(AuthContext)
	const [templates, setTemplates] = useState([]); // Array of templates
  const [category, setCategory] = useState('');
  // const [classLevel, setClassLevel] = useState('');
  const [instruction, setInstruction] = useState('');

	const [subjects, setSubjects] = useState([]);
	const [categories, setCategories] = useState([]); 
	const [levels, setLevels] = useState('');
	const [weights, setWeight] = useState('');

	const [selectedSubject, setSelectedSubject] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(''); // Selected category
	const [selectedTemplate, setSelectedTemplate] = useState(''); 
	const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');


	//errors
	const [message, setMessage] = useState({}); //msg from DB
	const [errors, setErrors] = useState({}); //Validations 
	useEffect(() => {
    // Fetch initial list of tasks
    // fetchData().then(data => {
		// 	setDataArray(data)
		// 	// setFilteredData(data)
		// 	updateFilteredData(data)
		// });
    fetchSubjects().then(data => setSubjects(data));
    // fetchCategories().then(data => setCategories(data));
    // fetchTemplates().then(data => setTemplates(data));

		// const maxLevel = 12;
		// const levelOptions = [];
		// for (let i = 1; i <= maxLevel; i++) {
		// 	levelOptions.push(i);
		// }
		// setLevels(levelOptions);

		const maxWeight = 10;
		const weightOptions = [];
		for (let i = 1; i <= maxWeight; i++) {
			weightOptions.push(i);
		}
		setWeight(weightOptions);

		// if(currentUser.sbjs.length > 1){
		// 	setSubjects(currentUser.sbjs)
		// }

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
			fetchTemplates().then(data => setTemplates(data));
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
	
	const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedCategory('');
  };
	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
    setSelectedTemplate('');
  };
	const handleTemplateChange = (event) => {
		// console.log(selectedTemplate);
    setSelectedTemplate(event.target.value);
  };
	const handleWeightChange = (event) => {
    setSelectedWeight(event.target.value);
  };
  const handleSave = () => {
    // Save the task data here
    const taskData = {
      subject: selectedSubject,
      category: selectedCategory,
    };
    console.log(taskData);
    // Perform your save logic or API call here
  };
	return (
		<div className='d-flex '>
			<div className="container ">
				<h2 className='center mt4'>New Task</h2>
				<div className="control d-flex jce g1 mt2">
					<button className="btn_blue">save</button>
					<button className="btn_blue">cancel</button>
				</div>
				<div className="task_data">
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
					{selectedCategory&&weights&&<div className="task_data-item">
						<span className="label">Weight:</span>
						<select value={selectedWeight} onChange={handleWeightChange}>
						{weights.map((weight) => (
								<option key={"weight"+weight} value={weight}>
									{weight}
								</option>
							))}
						</select>
					</div>}
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
