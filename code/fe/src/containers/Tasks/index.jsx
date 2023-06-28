import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext.js';

import axios from 'axios';
import { Link} from 'react-router-dom';
import SidebarFilter from './SidebarFilterTeacher.jsx';
import '../containers.scss'
import Task_card from './Task_card.jsx';

import { ReactComponent as BackIcon } from '../../assets/img/back.svg';
import { ReactComponent as AddIcon } from '../../assets/img/add2.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/remove.svg';

const Tasks = () => {
	
	const [message, setMessage] = useState({}); //msg from DB

	const [filteredData, setFilteredData] = useState([]);

	const updateFilteredData = (newData) => {
    setFilteredData(newData);
  };
	const handleDeleteItem = (task) =>{
		if(task.is_done){
			const msg={
				msgClass: "error",
				text: 'You can not delete this task as it has already been completed by the student/s'
			}
			setMessage(msg);
			setTimeout(() => {
				setMessage('');
			}, 2000);
		}else{
			deleteItem(task.id_task)
		}
		// 
	}
	const deleteItem = async(id_task)=>{
		console.log(id_task);
		axios
		.delete(`/tasks/task/${id_task}`)
		.then((res) => {
			
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				text: res.status===200 ? "Task deleted successfully!" : 'Error delete task'
			}
			setMessage(msg);
			 // Clear the message after 2 seconds 
			setTimeout(() => {
				setMessage('');
			}, 2000);

			const index = filteredData.findIndex(task => task.id_task === id_task);
			if (index !== -1) {
				filteredData.splice(index, 1);
			}
		})
		.catch((error) => {
			console.error('Error add item', error);
		});
	}
	return (
		<div className='d-flex '>
			<div className="container ">
				<h2 className='center mt4'>Tasks</h2>
				<div className="back mt2 btn_main">
					<Link className="d-flex aic g1" to="/teacher/classes"><BackIcon/><span>Go Back</span></Link>
				</div>
				<div className="msg_block">
					{message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
				</div>

				<div className="add_newItem mt2">
					<Link className="d-flex aic g1" to="/teacher/newtask">
					<AddIcon/><span>add new task</span>
					</Link>

					
				</div>
				<div className="arr_wrap tasks_wrap d-flex flex-4 jcsb">
					
						{filteredData && filteredData.map((elem, i) => (
							<div className="arr_item d-flex f-column jcc" key={"task-"+i}>
								<Task_card item={elem.task_name} className=""/>
								{<button onClick={() => handleDeleteItem(elem)} className={elem.is_done&&'no-active_info'}><DeleteIcon/></button>}

							</div>
						))}
					
					
				</div>
			</div>
			
			<div className="sidebar_filter"><SidebarFilter updateFilteredData={updateFilteredData}/></div>
		</div>
	)
}

export default Tasks
