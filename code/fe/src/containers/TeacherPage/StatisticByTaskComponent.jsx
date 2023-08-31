import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import axios from 'axios'
import '../containers.scss'
import TaskStatusPopup from './TaskStatusPopup';


function StatisticByTaskComponent() {
	const { currentUser} = useContext(AuthContext)

	const [classes, setClasses] = useState([]);
	const [taskDataPerClass, setTaskDataPerClass] = useState([]);

	const [sbjs, setSbjs] = useState('');
	const [cats, setCats] = useState('');
	const [tasks, setTasks] = useState('');
	const [selectedSubject, setSelectedSubject] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedTask, setSelectedTask] = useState('');
	const [selectedClass, setSelectedClass] = useState(''); //for data in popup

	//more info about class
	const [showPopup, setShowPopup] = useState(false);
  const [selectedClassTasks, setSelectedClassTasks] = useState(null);

	const taskWithSpecificId = tasks&&tasks.find(task => task.id_task === Number(selectedTask));
	const taskName = taskWithSpecificId&&taskWithSpecificId.task_name
	//#region fetch
	const fetchSbjs = async () => {
		try {
			const response = await axios.get(`/teacher/sbjs/${currentUser.id_user}`);
			// if(response.data.length){

			// }
			setSbjs(response.data);
		} catch (err) {
			console.log(err);
		}
	};
	const fetchCats = async () => {
		if(selectedSubject){
			try {
				const response = await axios.get(`/teacher/catsbysubject/${selectedSubject}`);
				console.log(response.data);
				setCats(response.data)
			} catch (error) {
				console.error('Error fetching categories', error);
				throw error;
			}
		}
    
  };
	const fetchTasks = async () => {
		if(selectedCategory){
			try {
				const res = await axios.get(`/tasks/taskscategory/${selectedCategory}`);
				// console.log(res.data);
				if(res.status===200)
				setTasks(res.data) 
			} catch (error) {
				console.error('Error fetching tasks', error);
				throw error;
			}
		}
  };
	const fetchClasses = async () => {
		try {
			const response = await axios.get(`${currentUser.id_user}/classes`);
			setClasses(response.data.data);
		} catch (error) {
			console.error('Error fetching classes', error);
		}
    
  };
	const fetchTasksData = async () => {
		const taskDataPerClass = [];

		// Loop through each class
		for (const classInfo of classes) {
			const classId = classInfo.id_class;
			console.log(classId);
			// console.log(selectedTask);

			// Fetch task completion data for the selected task and class
			try {
				const response = await axios.post('/teacher/taskcompletion', {
					selectedTask: selectedTask,
					classId: classId,
				});

				console.log(response.data);
				const taskCompletionData = response.data;
				
				// Calculate percentage task done
				const totalStudents = taskCompletionData[0].total_students;
				// const completedStudents = taskCompletionData.filter((entry) => entry.completed_students).length;
				const completedStudents = taskCompletionData[0].completed_students;
				const percentageDone = (completedStudents / totalStudents) * 100;

				// Add data to the taskDataPerClass array
				taskDataPerClass.push({
					classId: classInfo.id_class,
					className: classInfo.class_name,
					percentageDone: percentageDone.toFixed(2) + '%',
				});
			} catch (error) {
				console.error('Error fetching task completion data', error);
			}
		}

		// taskDataPerClass array with percentage task done for each class
		console.log(taskDataPerClass);
		setTaskDataPerClass(taskDataPerClass)
    
  }
	//#endregion fetch
	
	//#region useEffect
	useEffect(() => {
    fetchSbjs();
		fetchClasses()
  }, []);

	useEffect(() => {
    fetchCats();
  }, [selectedSubject]);
	
	useEffect(() => {
    fetchTasks();
  }, [selectedCategory]);

	useEffect(() => {
    fetchTasksData();
  }, [selectedTask]);
	//#endregion useEffect

	//#region handle
	const handleSbjChange = (id) => {
    setSelectedSubject(id);
  };
	const handleCatChange = (id) => {
    setSelectedCategory(id);
  };
	const handleTaskChange = (id) => {
    setSelectedTask(id);
  };

	const handlePopupOpen = (classId) => {
		// console.log(tasks);
		// console.log(selectedTask);
		const taskWithSpecificId = tasks.find(task => task.id_task === Number(selectedTask));
		const classWithSpecificId = classes.find(item => item.id_class === Number(classId));
		// console.log(classWithSpecificId.class_name);
    setSelectedClassTasks({classId});
		setSelectedClass(classWithSpecificId.class_name)
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedClassTasks(null);
  };
	//#endregion handle

	console.log(taskDataPerClass);
	// console.log(tasks);
	return (
		<div className='mt1'>
			{/* <h2>Statistic by Task</h2> */}
			<div className="selects d-flex g2">
				<select className="mt3" value={selectedSubject} onChange={(e) => handleSbjChange(e.target.value)}>
					<option value="">Select a Subject</option>
					{sbjs && sbjs.map((item) => (
						<option key={item.id_subject+"-sbjOpt"} value={item.id_subject}>
							{item.subject_name}
						</option>
					))}
				</select>
				<select className="mt3" value={selectedCategory} onChange={(e) => handleCatChange(e.target.value)}>
					<option value="">Select a Category</option>
					{cats && cats.map((item) => (
						<option key={item.id_category+"-catOpt"} value={item.id_category}>
							{item.category_name}
						</option>
					))}
				</select>
				<select className="mt3" value={selectedTask} onChange={(e) => handleTaskChange(e.target.value)}>
					<option value="">Select a Task</option>
					{tasks && tasks.map((item) => (
						<option key={item.id_task+"-taskOpt"} value={item.id_task}>
							{item.task_name}
						</option>
					))}
				</select>
			</div>
			<div className="statistic mt3">
				<div className="d-flex f-column tab-content">
					<div className="d-flex g2">
						<h3 className="w20">Class</h3>
						<h3 className="w20">Done</h3>

					</div>
					{taskDataPerClass&&taskDataPerClass.map(item=>(
						<div className="d-flex g2 " key={item.classId+"classItem"}>
							<div className="w20">{item.className} </div>
							<div className="w20 cursor_pointer hover-scale" onClick={() => handlePopupOpen(item.classId)}>
								{item.percentageDone}
							</div>
							
						</div>
					))}
					{/* Show popup when showPopup is true */}
					{showPopup && selectedClassTasks && (
						<TaskStatusPopup
							classId={selectedClassTasks.classId}
							selectedClass={selectedClass}
							taskId={selectedTask}
							taskName = {taskName}
							idTeacher={currentUser.id_user}
							handlePopupClose={handlePopupClose}
						/>
					)}
				</div>

			</div>
      
		</div>
	)
}

export default StatisticByTaskComponent
