import React from 'react'
import { Link} from 'react-router-dom';

import { ReactComponent as EditIcon } from '../../assets/img/edit.svg'
import { ReactComponent as DeleteIcon } from '../../assets/img/remove.svg'

const Task = ({task}) => {
	return (
		<div>
			<h2>Task test</h2>
			<img src="https://loremflickr.com/320/240/Paris" alt="task img" />
			<div className="task_desc">task.desc</div>
			<Link to={`/teacher/write?edit=2`}><EditIcon/></Link>
			<Link><DeleteIcon/></Link>
		</div>
	)
}

export default Task
