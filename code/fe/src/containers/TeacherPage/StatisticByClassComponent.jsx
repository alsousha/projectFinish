import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import axios from 'axios'
import '../containers.scss'

function StatisticByClassComponent() {
	const { currentUser} = useContext(AuthContext)

	const [selectedClass, setSelectedClass] = useState(''); //id selected class
  const [classes, setClasses] = useState([]);
  const [classData, setClassData] = useState([]);
  const [isVisiable, setIsVisiable] = useState(false);
  const [studentsByClass, setStudentsByClass] = useState([]);
  const [tsksFolders, setTsksFolders] = useState([]);
  const [taskStatusData , setTaskStatusData] = useState([]);
	const [numFoldersToShow, setNumFoldersToShow] = useState(2);
	const [totalTasksCount, setTotalTasksCount] = useState(0);
	
	const fetchTasksData = async () => {
    const tasksData = [];

    for (const folder of tsksFolders) {
      try {
				const res = await axios.post(`/teacher/tasksbyfolder`, {id_folder: folder.id_tskFolder});
        // const res = await axios.post('/teacher/tasks', { tasksFolderId: folder.id_tasks_folder });
        tasksData.push({ folder, tasks: res.data });
      } catch (error) {
        console.error('Error fetching tasks data', error);
      }
    }

    return tasksData;
  };
	
	const fetchClasses = async () => {
		try {
			const response = await axios.get(`${currentUser.id_user}/classes`);
			setClasses(response.data.data);
		} catch (error) {
			console.error('Error fetching classes', error);
		}
    
  };
	const fetchStudentsByClass = async () => {		
		try {
			const res = await axios.post(`/teacher/${currentUser.id_user}/students`, {id_class: selectedClass});
			console.log(res.data.data);
			setStudentsByClass(res.data.data)
			// if(!res.data.noStudents){
			// 	setClassName(res.data.data[0].class_name)
			// 	setAccounts(res.data.data)
			// }else{
			// 	setClassName(res.data.class_name)
			// }
		} catch (error) {
			console.error('Error fetching class statistics', error);
		}
  };
	//fetch tsks folders of teacher
	const fetchTasksFolders = async () => {
		try {
			const res = await axios.post(`/teacher/taskfolders`, {id_class: selectedClass});

			console.log(res.data.data);
			setTsksFolders(res.data.data)
		} catch (err) {
			console.log(err);
		}
	};
	const fetchTaskStatusData = async () => {
		// console.log(studentsByClass);
		// console.log(classData);
		
		try {

			const response = await axios.post(`/teacher/tasksbystudent`, {
				students: studentsByClass.map((student) => student.id_user),
				tasks: classData.map((item) => {
					if (item.tasks !== 'tasks not found') {
						return item.tasks.map((task) => task.id_task);
					}
					return []; // If tasks are not found, return an empty array
				}).flat(), // Flatten the nested arrays into a single array of task IDs
			});
			// console.log(response.data);
			setTaskStatusData(response.data);
		} catch (error) {
			console.error('Error fetching task status data', error);
		}
	};
	useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
		if (selectedClass) {
			setIsVisiable(true)
		
    	fetchStudentsByClass();
			fetchTasksFolders()
			// fetchTaskStatusData()

			
		}
  }, [selectedClass]);

	useEffect(() => {
    if (tsksFolders.length > 0) {
      fetchTasksData().then((data) => {
        setClassData(data)
				// Calculate total tasks count
			let totalTasks = 0;
			data.forEach((folderData) => {
				if (folderData.tasks && Array.isArray(folderData.tasks)) {
					totalTasks += folderData.tasks.length;
				}
			});
			setTotalTasksCount(totalTasks);
				
      });
    }
  }, [tsksFolders]);
	useEffect(() => {
    if (classData.length > 0) {
      fetchTaskStatusData()
    }
  }, [classData]);
	const handleClassChange = (classId) => {
    setSelectedClass(classId);
  };
	const handleNumFoldersToShow = (num) => {
    setNumFoldersToShow(num);
  };

	const calculateTaskCompletion = (taskId) => {
		const completedTasks = taskStatusData.filter(
			(entry) => entry.id_task === taskId && entry.is_task_done
		);
		const totalStudents =studentsByClass&& studentsByClass.length;
		const completedStudents = completedTasks&&completedTasks.length;
	
		const completionPercentage = (completedStudents / totalStudents) * 100;
		return isNaN(completionPercentage) ? '' : completionPercentage.toFixed(2) + "%";
	};
	// console.log(classData);
  return (
    <div className='mt3'>
      <h2>Statistic by Class</h2>
      <select className="mt3" value={selectedClass} onChange={(e) => handleClassChange(e.target.value)}>
        <option value="">Select a Class</option>
        {classes.map((item) => (
          <option key={item.id_class+"-classOpt"} value={item.id_class}>
            {item.class_name}
          </option>
        ))}
      </select>
			{isVisiable && <div className="statistic mt3">
				<div className='d-flex g2'>
					<button onClick={() => handleNumFoldersToShow(2)}>Show 2 last folders</button>
					<button onClick={() => handleNumFoldersToShow(3)}>Show 3 last folders</button>
					<button onClick={() => handleNumFoldersToShow(10)}>Show 10 last folders</button>
					<button onClick={() => handleNumFoldersToShow(tsksFolders.length)}>Show all</button>
				</div>
				<table>
					<thead>
						<tr>
							<th className=''>
								<div className="stud_list">Students</div>
							</th>
							
							{classData&&classData.slice(-numFoldersToShow).map((folderData, index) => (
								<th key={index}>
									<div className='col'>
										<h5>{folderData.folder.tskFolder_name}</h5>
										{folderData.tasks && Array.isArray(folderData.tasks) && (
											<ul className="task-title__wrap d-flex jcsb g1">
												{folderData.tasks.map((task) => (
													<li key={task.id_task + "tasktitle"}>
														{/* <p>Task: {task.task_name}</p> */}
														<h6 className='task_title'>{task.task_name}</h6>
														<p>{calculateTaskCompletion(task.id_task)}</p>
													</li>
												))}
											</ul>
										)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{studentsByClass&&studentsByClass.map((student) => (
							<tr key={student.id_user} className='table_item'>
								<td>{student.name} {student.lastname}</td>
								{classData.slice(-numFoldersToShow).map((folderData, index) => {
									return (
										<td key={index + "classData" + student.id_user}>
											<ul>
												{folderData.tasks &&
													Array.isArray(folderData.tasks) && (
														<li>
															{/* <p>Folder: {folderData.folder.tskFolder_name}</p> */}
															<ul className='d-flex jcsa g1'>
																{folderData.tasks.map((task) => {
																	
																	const taskStatusEntry = taskStatusData.find(
																		(entry) =>
																			entry.id_task === task.id_task &&
																			entry.id_user === student.id_user
																	);

																	const isTaskDone = taskStatusEntry ? taskStatusEntry.is_task_done : false;
																	return (
																		<li key={task.id_task + "taskStatus" + student.id_user} className='d-flex jcc'>
																			<p>{isTaskDone ? "V" : "-"}</p>
																		</li>
																	);
																})}
															</ul>
														</li>
													)}
											</ul>
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
				<div className="mt3">
					<p>Total Tasks: {totalTasksCount}</p> {/* Display total tasks count */}
				</div>
				

			</div>}
			
     
    </div>
  );
}

export default StatisticByClassComponent
