import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext.js';

import axios from 'axios';
import '../containers.scss'

function SidebarFilterGlobal({ updateFilteredData}) {
	const { currentUser} = useContext(AuthContext)

	//filter data
	
	const [subjects, setSubjects] = useState([]);
	const [categories, setCategories] = useState([]);
	const [templates, setTemplates] = useState([]);
	const [levels, setLevels] = useState([]);
	const [weights, setWeights] = useState([]);


	const [dataArray, setDataArray] = useState([]);
	const [dataObject, setDataObject] = useState({
		selectedSubjects:[],
		selectedTemplates: [],
		selectedLevels: [],
		selectedWeights: []

	});
	
  const [selectedSubjects, setSelectedSubjects] = useState(['all']);
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [selectedTemplates, setSelectedTemplates] = useState(['all']);
  const [selectedLevels, setSelectedLevels] = useState(['all']);
  const [selectedWeights, setSelectedWeights] = useState(['all']);
  // const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
    // Fetch initial list of tasks
    fetchData(20).then(data => {
			console.log(data);
			setDataArray(data)
			// setFilteredData(data)
			updateFilteredData(data)
		});
    // fetchSubjects().then(data => setSubjects(data));
    fetchSubjects().then(data => {
			setDataObject(prevData => ({
				...prevData,
				selectedSubjects: data
			}))
		});
    // fetchCategories().then(data => setCategories(data));
    fetchTemplates().then(data => setTemplates(data));

		const maxLevel = 12;
		const levelOptions = [];
		for (let i = 1; i <= maxLevel; i++) {
			levelOptions.push(i);
		}
		setLevels(levelOptions);

		const maxWeight = 10;
		const weightOptions = [];
		for (let i = 1; i <= maxWeight; i++) {
			weightOptions.push(i);
		}
		setWeights(weightOptions);
  }, []);

	const fetchData = async (countTask) => {
		// console.log(selectedTemplates);
		try {
			// const response = await axios.get(`/tasks/all}?count=${countTask}`);
			const res = await axios.post(`/tasks/global/all`, {selectedSubjects, selectedTemplates, selectedWeights, selectedLevels});
			return res.data;
		} catch (error) {
			console.error('Error fetching tasks', error);
			throw error;
		}
	};
	const fetchSubjects = async () => {
    try {
      const response = await axios.get(`/sbjs/`);
			// console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects', error);
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
  //     console.error('Error fetching templates', error);
  //     throw error;
  //   }
  // };
	
	const handleSubjectsChange = async (subject) => {
		console.log(dataObject.selectedSubjects);
		if (subject === 'all') {
      // setSelectedSubjects(['all']);
			setDataObject(prevData => ({
				...prevData,
				selectedSubjects: ['all']
			}));
    } else {
			// Update selected categories -> array with ids of sbj
			// const updatedSubjects = selectedSubjects.includes('all')
			// ? [subject.id_subject]
			// : selectedSubjects.includes(subject.id_subject)
			// ? selectedSubjects.filter((item)=> item !== subject.id_subject)
			// : [...selectedSubjects, subject.id_subject]
			// setSelectedSubjects(updatedSubjects)
			// Update selected subjects
			const updatedSubjects = dataObject.selectedSubjects.includes('all')
      ? [subject.id_subject]
      : dataObject.selectedSubjects.includes(subject.id_subject)
      ? dataObject.selectedSubjects.filter(item => item !== subject.id_subject)
      : [...dataObject.selectedSubjects, subject.id_subject];

			console.log(updateFilteredData);
    setDataObject(prevData => ({
      ...prevData,
      selectedSubjects: updatedSubjects
    }));
		}
		// const filteredData = await fetchData();
		// console.log(filterData);
 		// updateFilteredData(filteredData);
    
  };

	const handleCategoryChange = async (category) => {
		if (category === 'all') {
      setSelectedCategories(['all']);
    } else {
			// Update selected categories
			const updatedCategories = selectedCategories.includes('all')
			? [category.id_category]
			: selectedCategories.includes(category.id_category)
			? selectedCategories.filter((item)=> item !== category.id_category)
			: [...selectedCategories, category.id_category]
			setSelectedCategories(updatedCategories)
			
		}
		// const filteredData = await fetchData();
		// console.log(filterData);
  	// updateFilteredData(filteredData);
    
  };
	
	const handleTemplateChange = (template) => {
		if (template === 'all') {
      setSelectedTemplates(['all']);
    } else {
			// Update selected categories
			const updatedTemplates = selectedTemplates.includes('all')
			? [template.id_template]
			: selectedTemplates.includes(template.id_template)
			? selectedTemplates.filter((item)=> item !== template.id_template)
			: [...selectedTemplates, template.id_template]
			setSelectedTemplates(updatedTemplates)
		}
  };
	const handleLevelChange = (level) => {
		if (level === 'all') {
      setSelectedLevels(['all']);
    } else {
			// Update selected categories
			const updatedLevels = selectedLevels.includes('all')
			? [level]
			: selectedLevels.includes(level)
			? selectedLevels.filter((item)=> item !== level)
			: [...selectedLevels, level]
			// console.log(updatedLevels);
			setSelectedLevels(updatedLevels)
		}
	};

	const handleWeightChange = (weight) => {
		if (weight === 'all') {
      setSelectedWeights(['all']);
    } else {
			// Update selected categories
			const updatedWeight = selectedWeights.includes('all')
			? [weight]
			: selectedWeights.includes(weight)
			? selectedWeights.filter((item)=> item !== weight)
			: [...selectedWeights, weight]
			// console.log(updatedLevels);
			setSelectedWeights(updatedWeight)
		}
	};

  const filterData= () => {

    // Apply filters to the list of tasks
    // const filteredData = dataArray.filter(task =>
		// 	(selectedSubjects.includes('all') || selectedSubjects.includes(task.id_subject)) &&
		// 	(selectedCategories.includes('all') || selectedCategories.includes(task.id_category)) &&
    // 	(selectedTemplates.includes('all') || selectedTemplates.includes(task.id_template)) &&
		// 	(selectedLevels.includes('all') || selectedLevels.includes(task.task_level)) &&
		// 	(selectedWeights.includes('all') || selectedWeights.includes(task.task_weight)) 
  
    // );
		console.log(selectedTemplates);
		
		
    // Update the filtered tasks
		// updateFilteredData(filteredData)
    // setFilteredData(filteredData);
  };

  useEffect(() => {
    // Refresh the list of tasks whenever the filters change
	
		// console.log(selectedTemplates);
    // filterData();
  }, [dataObject.selectedSubjects, dataObject.selectedTemplates, dataObject.selectedLevels, dataObject.selectedWeights]);

	return (
		<div className='d-flex'>
			<div className="main">
			{/* <h2>Filter Tasks</h2> */}
			{/* {subjects && subjects.length>1 && (
				<div className='filter_item'>
					<h3>Subjects</h3>
					<label>
						<input
							type="checkbox"
							checked={selectedSubjects.includes('all')}
							onChange={() => handleSubjectsChange('all')}
						/>
						All
					</label>
					<div className="filter_item-inner">
						{subjects.map(subject => (
							
								<label key={"sbj"+subject.id_subject}>
									<input
										type="checkbox"
										checked={selectedSubjects.includes(subject.id_subject)}
										onChange={() => handleSubjectsChange(subject)}
									/>
									{subject.subject_name}
								</label>
						))}
					</div>
				</div>
			)} */}

			{dataObject.selectedSubjects && dataObject.selectedSubjects.length>1 && (
				<div className='filter_item'>
					<h3>Subjects</h3>
					<label>
						<input
							type="checkbox"
							checked={dataObject.selectedSubjects.includes('all')}
							onChange={() => handleSubjectsChange('all')}
						/>
						All
					</label>
					<div className="filter_item-inner">
						{dataObject.selectedSubjects.map(subject => (
							
								<label key={"sbj"+subject.id_subject}>
									<input
										type="checkbox"
										checked={dataObject.selectedSubjects.includes(subject.id_subject)}
										onChange={() => handleSubjectsChange(subject)}
									/>
									{subject.subject_name}
								</label>
						))}
					</div>
				</div>
			)}
      {/* <div className='filter_item'>
        <h3>Categories</h3>
				<label>
          <input
            type="checkbox"
            checked={selectedCategories.includes('all')}
            onChange={() => handleCategoryChange('all')}
          />
          All
        </label>
				<div className="filter_item-inner">
					{categories.map(category => (
						<label key={"cat"+category.id_category}>
							<input
								type="checkbox"
								checked={selectedCategories.includes(category.id_category)}
								onChange={() => handleCategoryChange(category)}
							/>
							{category.category_name}
						</label>
					))}
				</div>
      </div> */}
			<div className='filter_item'>
        <h3>Templates</h3>
				<label>
          <input
            type="checkbox"
            checked={selectedTemplates.includes('all')}
            onChange={() => handleTemplateChange('all')}
          />
          All
        </label>
				<div className="filter_item-inner">
					{templates.map(template => (
						<label key={"temp"+template.id_template}>
							<input
								type="checkbox"
								checked={selectedTemplates.includes(template.id_template)}
								onChange={() => handleTemplateChange(template)}
							/>
							{template.template_name}
						</label>
					))}
				</div>
      </div>
			<div className='filter_item'>
        <h3>Levels</h3>
				<label>
          <input
            type="checkbox"
            checked={selectedLevels.includes('all')}
            onChange={() => handleLevelChange('all')}
          />
          All
        </label>
				<div className="filter_item-inner">
					{levels.map(level => (
						<label key={"lvl"+level}>
							<input
								type="checkbox"
								checked={selectedLevels.includes(level)}
								onChange={() => handleLevelChange(level)}
							/>
							{level}
						</label>
					))}
				</div>
      </div>
			<div className='filter_item'>
        <h3>Weight</h3>
				<label>
          <input
            type="checkbox"
            checked={selectedWeights.includes('all')}
            onChange={() => handleWeightChange('all')}
          />
          All
        </label>
				<div className="filter_item-inner">
					{weights.map(weight => (
						<label key={"weight"+weight}>
							<input
								type="checkbox"
								checked={selectedWeights.includes(weight)}
								onChange={() => handleWeightChange(weight)}
							/>
							{weight}
						</label>
					))}
				</div>
      </div>

			</div>
		</div>
	)
}

export default SidebarFilterGlobal
