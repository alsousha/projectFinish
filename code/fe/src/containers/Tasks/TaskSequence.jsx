import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { useLocation, useParams } from 'react-router-dom';

import axios from 'axios'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './Task.scss';

import { ReactComponent as InfoIcon } from '../../assets/img/info.svg';

function TaskSequence({task}) {
	// console.log(task);

	//convert obj to array (task.specific_data: {"input-0":"dfg","input-1":"ert"})
	const arr = task&&Object.entries(JSON.parse(task.specific_data)).map(([key, value]) => {
		const inputIndex = key.split('-')[1]; // Extract the index from the key
		return { input: value, id: inputIndex };
	});
	const [seqItems, setSeqItems] = useState(arr);
	// console.log(seqItems);

	
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(seqItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSeqItems(items);
  }
	
	
  return (
		<div className="task_content">
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
			
				
  );
}

export default TaskSequence
