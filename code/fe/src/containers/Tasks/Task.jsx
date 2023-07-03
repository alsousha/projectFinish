import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import ReactQuill from 'react-quill';

import axios from 'axios'

import './Task.scss';

import { ReactComponent as InfoIcon } from '../../assets/img/info.svg';
import { ReactComponent as QuestionIcon } from '../../assets/img/question.svg';
import { ReactComponent as EditIcon } from '../../assets/img/edit3.svg';
import TaskSequence from './TaskSequence.jsx';
import Loading from '../../components/Loading.jsx';


const Task = () => {
	const { id } = useParams(); //id task

	const { currentUser} = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(true);
	const [hasAccess, setHasAccess] = useState(false);
	
	const [showMoreInfo, setShowMoreInfo] = useState(false);
	const [showTaskText, setShowTaskText] = useState(true); //instruction of task

	//get task's data from Link
	const location = useLocation();
	const task = location.state?.task;
	
	useEffect(() => {
    const checkOwnership = async () => {
      try {
        // Make an API request to check if the task ID exists for the teacher
        const res = await axios.get(`/tasks/all/${currentUser.id_user}`);
				// console.log(res);
        setHasAccess(res.data.some((item) => item.id_task === Number(id)));
      } catch (error) {
      }finally {
        setIsLoading(false);
      }
    };
    checkOwnership();
  }, [id, currentUser.id_user]);
	
	
	const handleToggleShowInfo = () => {
		setShowMoreInfo(prev => !prev);  
		setShowTaskText(false);  
	};
	const handleToggleTaskText = () => {
		setShowTaskText(prev => !prev);  
		setShowMoreInfo(false); 
	};
	function capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	if (isLoading) {
    return <Loading/>;
  }
	if (!hasAccess) {
    return <div>Error: You do not have access to this task.</div>;
  }
	const textResult = {
		'success': `Well done! You answered correctly. Congrats you got ${task.task_weight} points`,
		'fail': 'Your answer is not entirely correct. Try again!'
	}


	return (
		<div className="task_wrap mt3">
			<div className="container">
				<div className="task_inner">
					<h1 className='center'>{capitalizeFirstLetter(task.task_name)}</h1>
					<div className="task_inner-top">
						<div className="task_btns d-flex">
							<button className="task__info d-flex aic" onClick={handleToggleTaskText}>
								<QuestionIcon/>
							</button>
							<button className="task__info d-flex aic" onClick={handleToggleShowInfo}>
								<InfoIcon/>
							</button>
							<Link
								className="d-flex aic ml03"
								to={`/teacher/taskedit/${task.id_task}`}
								state={{ task: task }}
							>					<EditIcon/>
							</Link>
						</div>
					
						{showTaskText&&(
							<div className="task__text">
								<ReactQuill
									value={task.task_text}
									readOnly={true}
									theme={"bubble"}
								/>
								{/* <div className="">{task.task_text}</div> */}
								<div className="d-flex jcc"><button className="btn_accent" onClick={handleToggleTaskText}>Ok</button></div>
							</div>
						)}
						{showMoreInfo&&(
						<div className="more__info">
							<div className="more__info-inner">
								<div className="more__info-item d-flex g1">
									<span>Subject:</span>
									<span>{task.subject_name}</span>
								</div>
								<div className="more__info-item d-flex g1">
									<span>Category:</span>
									<span>{task.category_name}</span>
								</div>
								<div className="more__info-item d-flex g1">
									<span>Task weight:</span>
									<span>{task.task_weight} points</span>
								</div>
								<div className="more__info-item d-flex g1">
									<span>Task level:</span>
									<span>{task.task_level} class</span>
								</div>
							</div>
						</div>
					)}
					</div>
					<div className="task_todo mt3">
						{task&&task.template_name==="Sequance"&&(
							<TaskSequence task={task} textResult={textResult}/>
						)}
						
					</div>
				</div>
			</div>
		</div>
	)
}

export default Task
