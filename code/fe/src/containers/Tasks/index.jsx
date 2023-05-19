import React from 'react'
import { Link} from 'react-router-dom';


const Tasks = () => {
	const tasks = [
		 {
			id: 1,
			title: "Task1",
			desc: "Desc1",
			img: "https://loremflickr.com/320/240/Paris"

		 },
		 {
			id: 2,
			title: "Task2",
			desc: "Desc2",
			img: "https://loremflickr.com/320/240/girl"

		 },
		 {
			id: 3,
			title: "Task3",
			desc: "Desc1",
			img: "https://loremflickr.com/320/240/boy"

		 },
		 {
			id: 4,
			title: "Task4",
			desc: "Desc4",
			img: "https://loremflickr.com/320/240/USA"

		 }
	]
	return (
		<div>
			<h1>Tasks</h1>
			<div className="tasks__wrap">
				{tasks.map(task=>(
					<Link to={`/teacher/task/${task.id}`} key={task.id} >
					<div className="task mb3" >
						<img src={task.img} alt="task img" />
						<h2>{task.title}</h2>
						
					</div>
					</Link>
					
				))}
			</div>
		</div>
	)
}

export default Tasks
