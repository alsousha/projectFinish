import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext.js';

import axios from 'axios';
import '../containers.scss'

function SidebarFilterGlobal({ updateFilteredData, subjects, templates, levels, weights, page}) {
	const { currentUser} = useContext(AuthContext)

	//object with selected filter checkboxes
	const [dataObject, setDataObject] = useState({
		selectedSubjects:['all'],
		selectedTemplates: ['all'],
		selectedLevels: ['all'],
		selectedWeights: ['all']
	});
	
	useEffect(() => {
    // Fetch initial list of tasks   
		fetchSubjects().then(data => {
			setDataObject(prevData => ({
				...prevData,
				selectedSubjects: ['all']
			}))
		});
		fetchTemplates().then(data => {
			setDataObject(prevData => ({
				...prevData,
				selectedTemplates: ['all']
			}))
		});

  }, []);


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

	const handleSubjectsChange = async (subject) => {
		if (subject === 'all') {
      // setSelectedSubjects(['all']);
			setDataObject(prevData => ({
				...prevData,
				selectedSubjects: ['all']
			}));
    } else {			
			// Update selected subjects based on checkbox status
			const updatedSubjects = dataObject.selectedSubjects.includes('all')
      ? [subject]
      : dataObject.selectedSubjects.includes(subject)
      ? dataObject.selectedSubjects.filter(item => item.id_subject !== subject.id_subject)
      : [...dataObject.selectedSubjects, subject];

			setDataObject(prevData => ({
				...prevData,
				selectedSubjects: updatedSubjects.length !== 0 ? updatedSubjects : 'all'
			}));
		}
  };
	const handleTemplateChange = (template) => {
		if (template === 'all') {
			setDataObject(prevData => ({
				...prevData,
				selectedSubjects: ['all']
			}));
    } else {			
			// Update selected subjects based on checkbox status
			const updatedTemplates = dataObject.selectedTemplates.includes('all')
      ? [template]
      : dataObject.selectedTemplates.includes(template)
      ? dataObject.selectedTemplates.filter(item => item.id_template !== template.id_template)
      : [...dataObject.selectedTemplates, template];

			setDataObject(prevData => ({
				...prevData,
				selectedTemplates: updatedTemplates.length !== 0 ? updatedTemplates : 'all'
			}));
		}
  };
	const handleLevelChange = (level) => {
		if (level === 'all') {
			setDataObject(prevData => ({
				...prevData,
				selectedLevels: ['all']
			}));
    } else {			
			// Update selected subjects based on checkbox status
			const updatedLevels = dataObject.selectedLevels.includes('all')
      ? [level]
      : dataObject.selectedLevels.includes(level)
      ? dataObject.selectedLevels.filter(item => item !== level)
      : [...dataObject.selectedLevels, level];

			setDataObject(prevData => ({
				...prevData,
				selectedLevels: updatedLevels.length !== 0 ? updatedLevels : 'all'
			}));
		}


	};
	const handleWeightChange = (weight) => {
		if (weight === 'all') {
			setDataObject(prevData => ({
				...prevData,
				selectedWeights: ['all']
			}));
    } else {			
			// Update selected subjects based on checkbox status
			const updatedWeights = dataObject.selectedWeights.includes('all')
      ? [weight]
      : dataObject.selectedWeights.includes(weight)
      ? dataObject.selectedWeights.filter(item => item !== weight)
      : [...dataObject.selectedWeights, weight];

			setDataObject(prevData => ({
				...prevData,
				selectedWeights: updatedWeights.length !== 0 ? updatedWeights : 'all'
			}));
		}

	};

  useEffect(() => {
		updateFilteredData(dataObject);
  }, [dataObject.selectedSubjects, dataObject.selectedTemplates, dataObject.selectedLevels, dataObject.selectedWeights, page]);

	return (
		<div className='d-flex'>
			<div className="main">
				{subjects && subjects.length > 1 && (
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
							{subjects.map((subject, i) => (
								<label key={i+"sbj" + subject.id_subject}>
									<input
										type="checkbox"
										checked={dataObject.selectedSubjects.includes(subject)}
										onChange={() => handleSubjectsChange(subject)}
									/>
									{subject.subject_name}
								</label>
							))}
						</div>
					</div>
				)}
				{templates && templates.length>1 && (
					<div className='filter_item'>
						<h3>Templates</h3>
						<label>
							<input
								type="checkbox"
								checked={dataObject.selectedTemplates.includes('all')}
								onChange={() => handleTemplateChange('all')}
							/>
							All
						</label>
						<div className="filter_item-inner">
							{templates.map((template, i) => (
								<label key={i+"temp"+template.id_template}>
									<input
										type="checkbox"
										checked={dataObject.selectedTemplates.includes(template)}
										onChange={() => handleTemplateChange(template)}
									/>
									{template.template_name}
								</label>
							))}
						</div>
					</div>
				)}
				<div className='filter_item'>
					<h3>Levels</h3>
					<label>
						<input
							type="checkbox"
							checked={dataObject.selectedLevels.includes('all')}
							onChange={() => handleLevelChange('all')}
						/>
						All
					</label>
					<div className="filter_item-inner">
						{levels.map((level, i) => (
							<label key={i+"lvl"+level}>
								<input
									type="checkbox"
									checked={dataObject.selectedLevels.includes(level)}
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
							checked={dataObject.selectedWeights.includes('all')}
							onChange={() => handleWeightChange('all')}
						/>
						All
					</label>
					<div className="filter_item-inner">
						{weights.map((weight, i) => (
							<label key={i+"weight"+weight}>
								<input
									type="checkbox"
									checked={dataObject.selectedWeights.includes(weight)}
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
