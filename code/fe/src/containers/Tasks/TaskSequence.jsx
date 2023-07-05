import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { useLocation, useParams } from 'react-router-dom';

import axios from 'axios'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './Task.scss';


import { ReactComponent as InfoIcon } from '../../assets/img/info.svg';

function TaskSequence({task, textResult, handleGoBack}) {
	// console.log(task);
	const { currentUser, updateUser } = useContext(AuthContext);
	const [userData, setUserData] = useState(currentUser);


	useEffect(() => {
		
    
  }, [currentUser]);
	//convert obj to array (task.specific_data: {"input-0":"dfg","input-1":"ert"})
	//otigin array 
	const arr = task&&Object.entries(JSON.parse(task.specific_data)).map(([key, value]) => {
		const inputIndex = key.split('-')[1]; // Extract the index from the key
		return { input: value, id: inputIndex };
	});
	
	const shuffleArray = (array) => {
		const shuffledArray = [...array];
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
		}
		return shuffledArray;
	};
	
	const shuffledArr = shuffleArray(arr); //random shuffly array
	const [seqItems, setSeqItems] = useState(shuffledArr);
	const [taskResultText, setTaskResultText] = useState('');
	const [resultClass, setResultClass] = useState('');
	const [popupVisiable, setPopupVisiable] = useState(false);

	
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(seqItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSeqItems(items);
  }
	const handleOnCheck = () =>{
		setPopupVisiable(true)
		//chtck if arrays is equals
		const isSameArray = (arr1, arr2) => {
			if (arr1.length !== arr2.length) {
				return false;
			}
			for (let i = 0; i < arr1.length; i++) {
				if (arr1[i].input !== arr2[i].input || arr1[i].id !== arr2[i].id) {
					return false;
				}
			}
			return true;
		};
		
		if(isSameArray(seqItems, arr)){
			setResultClass('success')
			setTaskResultText(textResult.success)
			if(currentUser.role==='student'){
				updatePoints(task.task_weight)
				updateTaskDone()
			}

		}else{
			setResultClass('fail')
			setTaskResultText(textResult.fail)
		}
	}
	const handleOkBtn = () =>{
		setPopupVisiable(false)
		setTimeout(() => {
			handleGoBack()
		}, 500);

	}
	
	const updatePoints = async(task_weight)=>{	
		// console.log(task_weight);		
		axios
		.put(`/student/updatepoints/${currentUser.id_user}`, {task_weight:task_weight})
		.then((res) => {
		const tmpUserData = ((prevUserData) => ({
			...prevUserData,
			points: prevUserData.points + task_weight,
		}));
			setUserData(tmpUserData);
			updateUser(tmpUserData)//update localstorage and context
		
			// const msg={
			// 	msgClass: res.status===200 ? "success" : "error",
			// 	text: res.status===200 ? "Task added successfully!" : 'Error add task'
			// }
			// setMessage(msg);
			//  // Clear the message after 2 seconds 
			// setTimeout(() => {
			// 	setMessage('');
			// }, 2000);
		})
		.catch((error) => {
			console.error('Error add item', error);
		});
	}
	const updateTaskDone = async()=>{	
		axios
		.put(`/tasks/updatetaskdone/${currentUser.id_user}`, {id_task:task.id_task})
		.then((res) => {
		
		})
		.catch((error) => {
			console.error('Error add item', error);
		});
	}
  return (
		<div className="task_content d-flex f-column jcsb">
				
			<div className={`task_content-inner ${resultClass}`}>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="characters">
						{(provided) => (
							<ul className="seq__wrap" {...provided.droppableProps} ref={provided.innerRef}>
								{seqItems.map(({input, id}, index) => {
									return (
										<Draggable key={id} draggableId={id} index={index}>
											{(provided) => (
												<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='seq__item'>
													
													<p>
														{ input }
													</p>
												</li>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
			</div>
			
			<button className='btn_accent' onClick={handleOnCheck}>Check</button>
			{popupVisiable && (<div className={`popup__taskresult  ${resultClass}`}>
				{taskResultText}
				<button className='btn_transp_main' onClick={handleOkBtn}>Ok</button>
			</div>)}
		</div>
			
				
  );
}

export default TaskSequence
