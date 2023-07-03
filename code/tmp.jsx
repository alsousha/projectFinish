import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { API_URL } from '../../constans.js';
import { ReactComponent as InfoIcon } from '../../assets/img/info.svg';

function Task_card(props) {
	const imageUrl = `${API_URL}/${props.item.task_img}`; // Replace with your server's base URL
console.log(props);
// task/sequence/
	
	return (
			<div className="arr_item-inner hover-shadow">
				{/* <Link className='' to={`/teacher/task/sequence/${props.item.id_task}`}> */}
<Link
	className=""
	to={`/teacher/task/sequence/${props.item.id_task}`}
	state={{ task: props.item }}
>					{props.item.task_name}
	<img src={imageUrl} alt="Task Image" />
</Link>
				
			</div>	
	)
}

export default Task_card
