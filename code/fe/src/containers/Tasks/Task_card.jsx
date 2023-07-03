import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { API_URL } from '../../constans.js';

function Task_card(props) {
	const imageUrl = `${API_URL}/${props.item.task_img}`; // Replace with your server's base URL
// console.log(props.item.task_name);
// task/sequence/
function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
	return (
		<div className="card__inner hover-shadow">
			<Link
				className=""
				to={`/teacher/task/${props.item.id_task}`}
				state={{ task: props.item }}
			>	
				<h4 className='card__title'>{capitalizeFirstLetter(props.item.task_name)}</h4>	
				<div className="task__thumb">
					<img src={imageUrl} alt="Task Image" />
				</div>
			</Link>
			
		</div>	
	)
}

export default Task_card
