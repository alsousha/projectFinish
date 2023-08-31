import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import '../containers.scss'
import Task_card from '../Tasks/Task_card';
import { AuthContext } from '../../context/authContext';


function Homework() {
	const { currentUser} = useContext(AuthContext)

	const [hwTasks, setHWTasks] = useState([]);


	useEffect(() => {
    fetchData();
  }, []);

	const fetchData = async () => {
		try {
			const res = await axios.get(`/student/hwtasks/${currentUser.id_user}`);
			// console.log(res.data);
			if(res.data){
				setHWTasks(res.data)
			}
		} catch (err) {
			console.log(err);
		}
	};

	


  return (
		<div className='mt4 section_student_subjects'>
		<div className="container">
			<h1>Homework</h1>
			<div className="main_content mt2">
			<div className="d-flex g1 mt3 f-wrap">
				{hwTasks&&hwTasks.map((item) => (
					<div className="arr_item d-flex f-column jcc" key={"task_student"+item.id_task}>
						<Task_card item={item}/>
					</div>
				))}
				{hwTasks && hwTasks.length===0 && (<div>Well done! you have no homework left to do</div>)}
				</div>
			</div>
		</div>
	</div>
  )
}

export default Homework
