import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { API_URL } from '../../constans.js';
import { AuthContext } from '../../context/authContext.js';

function Task_card(props) {
	// console.log(props.item);
	const { currentUser } = useContext(AuthContext);
	const imageUrl = `${API_URL}/${props.item.task_img}`; // Replace with your server's base URL

	// console.log(props.item.task_name);
// task/sequence/
function capitalizeFirstLetter(str) {
	return str&&str.charAt(0).toUpperCase() + str.slice(1);
}
	return (
		<div className="card__inner hover-shadow">
			<Link
				className=""
				to={`/${currentUser.role}/task/${props.item.id_task}`}
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
