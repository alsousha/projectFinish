import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { Link } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'

import { ReactComponent as FolderIcon } from '../../assets/img/folder.svg';
import Task_card from '../Tasks/Task_card.jsx';

import { ReactComponent as DoneIcon } from '../../assets/img/done.svg';
import { ReactComponent as NotDoneIcon } from '../../assets/img/notdone.svg';

function Subjects() {
	const [subjects, setSubjects] = useState([]);
	const [studentClass, setStudentClass] = useState([]);
	const [folders, setFolders] = useState([]);
	const [tasks, setTasks] = useState([]);

	const { currentUser} = useContext(AuthContext)
	useEffect(() => {
    fetchData();
		fetchClass();
  }, []);
	const fetchData = async () => {
		// console.log(currentUser.id_user);
		try {
			const res = await axios.get(`/student/sbjs/${currentUser.id_user}`);
			// console.log(res.data);
			if(res.data){
				setSubjects(res.data)
			}
		} catch (err) {
			console.log(err);
		}
	};
	const fetchClass = async (id_subject) => {
		// console.log(id_subject);
		try {
			const res = await axios.post(`/student/classbysbj/${currentUser.id_user}`, {sbjId:id_subject});
			// console.log(res.data);
			const id_class = res.data[0].id_class
			console.log(id_class);
			if(id_class){
				setStudentClass(res.data)
				fetchFolders(id_subject, id_class);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const fetchFolders = async (id_subject, id_class) => {
		console.log(currentUser.id_user);
		try {
			
			const res = await axios.post(`/student/tasksfolderbysbjandclass/${id_subject}`, {studentClass: id_class});
			console.log(res.data);
			if(res.data){
				setFolders(res.data)
			}
		} catch (err) {
			console.log(err);
		}
  };
	const fetchTasks = async (id_tskFolder) => {
		// console.log(id_subject);
		try {
			const res = await axios.post(`/student/tasksbyfolder/${id_tskFolder}`, {id_user: currentUser.id_user});
			// console.log(res.data);
			if(res.data){
				setTasks(res.data)
			}
		} catch (err) {
			console.log(err);
		}
  };

	const handleSubjectClick = (id_subject) => {
		setTasks([])
		fetchClass(id_subject)
  };
	const handleFolderClick = (id_tskFolder) => {
		setTasks([])
    fetchTasks(id_tskFolder);
  };
	// console.log(tasks);
  return (
	<div className='mt4 section_student_subjects'>
		<div className="container">
			<h1>Subjects</h1>
			<div className="main_content mt2">
				<div className="d-flex g1 mt3">
				{subjects&&subjects.map((item) => (
					<div className="btn_maincolor" key={"subject_student"+item.id_subject}>
						<button className=""  onClick={() => handleSubjectClick(item.id_subject)}>
							{item.subject_name}
						</button>
					</div>
				))}
				</div>
				<div className="d-flex g1 mt3">
				{folders&&folders.map((item) => (
					<div className="folder big d-flex f-column" key={"folder_student"+item.id_tskFolder}>
						<button className=""  onClick={() => handleFolderClick(item.id_tskFolder)}>
							<FolderIcon />
							{item.tskFolder_name}
						</button>
					</div>
				))}
				</div>
				<div className="d-flex g1 mt3">
				{tasks&&tasks.map((item) => (
					<div className="arr_item d-flex f-column jcc task_status" key={"task_student"+item.id_task}>
						{item.is_task_done===1 ? <DoneIcon/> : <NotDoneIcon/>}
						<div className={`${item.is_task_done===1 ? 'no-active' : 'active'}`}>
							<Task_card item={item}/>
						</div>
					
						{/* <button className=""  onClick={() => handleFolderClick(item.id_task)}>
							{item.task_name}
						</button> */}
					</div>
				))}
				</div>
				
			</div>
		</div>
	  
	</div>
  )
}



export default Subjects
