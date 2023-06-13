import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext.js';

import axios from 'axios';
import { Link} from 'react-router-dom';
import SidebarFilter from './SidebarFilterTeacher.jsx';
import '../containers.scss'



const Tasks = () => {
	// const { currentUser} = useContext(AuthContext)

	// //filter data
	// const [subjects, setSubjects] = useState([]);
	// const [categories, setCategories] = useState([]);
	// const [templates, setTemplates] = useState([]);
	// const [levels, setLevels] = useState([]);
	// const [weights, setWeights] = useState([]);
	


	// const [dataArray, setDataArray] = useState([]);
  // const [selectedSubjects, setSelectedSubjects] = useState(['all']);
  // const [selectedCategories, setSelectedCategories] = useState(['all']);
  // const [selectedTemplates, setSelectedTemplates] = useState(['all']);
  // const [selectedLevels, setSelectedLevels] = useState(['all']);
  // const [selectedWeights, setSelectedWeights] = useState(['all']);
  // const [filteredData, setFilteredData] = useState([]);

	// useEffect(() => {
  //   // Fetch initial list of tasks
  //   fetchData().then(data => {
	// 		setDataArray(data)
	// 		setFilteredData(data)
	// 	});
  //   fetchSubjects().then(data => setSubjects(data));
  //   fetchCategories().then(data => setCategories(data));
  //   fetchTemplates().then(data => setTemplates(data));

	// 	const maxLevel = 12;
	// 	const levelOptions = [];
	// 	for (let i = 1; i <= maxLevel; i++) {
	// 		levelOptions.push(i);
	// 	}
	// 	setLevels(levelOptions);

	// 	const maxWeight = 10;
	// 	const weightOptions = [];
	// 	for (let i = 1; i <= maxWeight; i++) {
	// 		weightOptions.push(i);
	// 	}
	// 	setWeights(weightOptions);

	// 	// if(currentUser.sbjs.length > 1){
	// 	// 	setSubjects(currentUser.sbjs)
	// 	// }

  // }, []);

	// const fetchData = async () => {
	// 	try {
	// 		const response = await axios.get(`/tasks/all/${currentUser.id_user}`);
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error('Error fetching tasks', error);
	// 		throw error;
	// 	}
	// };
	// const fetchSubjects = async () => {
  //   try {
  //     const response = await axios.get(`/teacher/sbjs/${currentUser.id_user}`);
	// 		console.log(response.data);
	// 		console.log("ssssssss");
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching categories', error);
  //     throw error;
  //   }
  // };
	// const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(`/teacher/${currentUser.id_user}/cats`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching categories', error);
  //     throw error;
  //   }
  // };
	// const fetchTemplates = async () => {
  //   try {
  //     const response = await axios.get(`/teacher/templates`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching categories', error);
  //     throw error;
  //   }
  // };
	

	// const handleSubjectsChange = (subject) => {
	// 	if (subject === 'all') {
  //     setSelectedSubjects(['all']);
  //   } else {
	// 		// Update selected categories
	// 		const updatedSubjects = selectedSubjects.includes('all')
	// 		? [subject.id_subject]
	// 		: selectedSubjects.includes(subject.id_subject)
	// 		? selectedSubjects.filter((item)=> item !== subject.id_subject)
	// 		: [...selectedSubjects, subject.id_subject]
	// 		setSelectedSubjects(updatedSubjects)
	// 		// console.log("dddrey");
	// 		// console.log(selectedSubjects.includes(2));
	// 		// console.log(updatedSubjects);
	// 	}
    
  // };

	// const handleCategoryChange = (category) => {
	// 	if (category === 'all') {
  //     setSelectedCategories(['all']);
  //   } else {
	// 		// Update selected categories
	// 		const updatedCategories = selectedCategories.includes('all')
	// 		? [category.id_category]
	// 		: selectedCategories.includes(category.id_category)
	// 		? selectedCategories.filter((item)=> item !== category.id_category)
	// 		: [...selectedCategories, category.id_category]
	// 		setSelectedCategories(updatedCategories)
			
	// 	}
    
  // };
	
	// const handleTemplateChange = (template) => {
	// 	if (template === 'all') {
  //     setSelectedTemplates(['all']);
  //   } else {
	// 		// Update selected categories
	// 		const updatedTemplates = selectedTemplates.includes('all')
	// 		? [template.id_template]
	// 		: selectedTemplates.includes(template.id_template)
	// 		? selectedTemplates.filter((item)=> item !== template.id_template)
	// 		: [...selectedTemplates, template.id_template]
	// 		setSelectedTemplates(updatedTemplates)
	// 	}
  // };
	// const handleLevelChange = (level) => {
	// 	if (level === 'all') {
  //     setSelectedLevels(['all']);
  //   } else {
	// 		// Update selected categories
	// 		const updatedLevels = selectedLevels.includes('all')
	// 		? [level]
	// 		: selectedLevels.includes(level)
	// 		? selectedLevels.filter((item)=> item.task_level !== level)
	// 		: [...selectedLevels, level]
	// 		// console.log(updatedLevels);
	// 		setSelectedLevels(updatedLevels)
	// 	}
	// };

	// const handleWeightChange = (weight) => {
	// 	if (weight === 'all') {
  //     setSelectedWeights(['all']);
  //   } else {
	// 		// Update selected categories
	// 		const updatedWeight = selectedWeights.includes('all')
	// 		? [weight]
	// 		: selectedWeights.includes(weight)
	// 		? selectedWeights.filter((item)=> item.task_weight !== weight)
	// 		: [...selectedWeights, weight]
	// 		// console.log(updatedLevels);
	// 		setSelectedWeights(updatedWeight)
	// 	}
	// };

  // const filterData= () => {
  //   // Apply filters to the list of tasks
  //   const filteredData = dataArray.filter(task =>
	// 		(selectedSubjects.includes('all') || selectedSubjects.includes(task.id_subject)) &&
	// 		(selectedCategories.includes('all') || selectedCategories.includes(task.id_category)) &&
  //   	(selectedTemplates.includes('all') || selectedTemplates.includes(task.id_template)) &&
	// 		(selectedLevels.includes('all') || selectedLevels.includes(task.task_level)) &&
	// 		(selectedWeights.includes('all') || selectedWeights.includes(task.task_weight)) 
  
  //   );
		
  //   // Update the filtered tasks
  //   setFilteredData(filteredData);
  // };

  // useEffect(() => {
  //   // Refresh the list of tasks whenever the filters change
  //   filterData();
  // }, [selectedSubjects, selectedCategories, selectedTemplates, selectedLevels, selectedWeights]);

	// const [dataArray, setDataArray] = useState([])
	
	
	const [filteredData, setFilteredData] = useState([]);
	// const updateDataArray = (newData) => {
  //   setDataArray(newData);
  // };

	const updateFilteredData = (newData) => {
    setFilteredData(newData);
  };
	// console.log(filteredData);

	return (
		<div className='d-flex'>
			<div className="arr_wrap tasks_wrap">
				{filteredData && filteredData.map((elem, i) => (
					<div key={"task-"+i} className="arr_item">{elem.task_name}</div>	
				))}
			</div>
			<div className="sidebar_filter"><SidebarFilter updateFilteredData={updateFilteredData}/></div>
		</div>
	)
}

export default Tasks
