import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import '../containers.scss'
import Task_card from '../Tasks/Task_card';


function GlobalTasks() {
	const [globalTasks, setGlobalTasks] = useState([]);

	useEffect(() => {
    fetchData();
  }, []);
	const fetchData = async () => {
		try {
			const res = await axios.get(`/student/tasksall`);
			// console.log(res.data);
			if(res.data){
				setGlobalTasks(res.data)
			}
		} catch (err) {
			console.log(err);
		}
	};


  return (
		<div className='mt4 section_student_subjects'>
			<div className="container">
				<h1>Global Tasks</h1>
				<div className="main_content mt2">
				<div className="d-flex g1 mt3 f-wrap">
					{globalTasks&&globalTasks.map((item) => (
						<div className="arr_item d-flex f-column jcc" key={"task_student"+item.id_task}>
							<Task_card item={item}/>
						</div>
					))}
					</div>
				</div>
			</div>
		</div>
  )
}

export default GlobalTasks
