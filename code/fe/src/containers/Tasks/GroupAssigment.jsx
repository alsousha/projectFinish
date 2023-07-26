import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext.js';

import axios from 'axios'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './Task.scss';

function GroupAssigment({task, textResult, handleGoBack}) {
	const [box2Data, setBox2Data] = useState([]); // State for the second box
  const [box3Data, setBox3Data] = useState([]); // State for the third box
	const [data, setData] = useState(["Item 1", "Item 2", "Item 3"]); // Sample data for the first box

	const handleOnDragEnd = (result) => {
		const { source, destination } = result;
		
		// If the destination is null or the item is dropped back to the same position, do nothing
		if (!destination || (source.droppableId === destination.droppableId )) {
			return;
		}
		const removeFromBox = (boxData, index) => {
			const newData = [...boxData];
			newData.splice(index, 1);
			return newData;
		};
	
		const addToBox = (boxData, index, item) => {
			const newData = [...boxData];
			newData.splice(index, 0, item);
			return newData;
		};
	
		if (source.droppableId === "box-1") {
			// Remove the item from the first box (box-1)
			setData((prevData) => removeFromBox(prevData, source.index));
	
			// Add the item to the second box (box-2) or the third box (box-3)
			if (destination.droppableId === "box-2") {
				setBox2Data((prevData) => addToBox(prevData, destination.index, result.draggableId));
			} else if (destination.droppableId === "box-3") {
				setBox3Data((prevData) => addToBox(prevData, destination.index, result.draggableId));
			}
		}else	if (source.droppableId === "box-2") {
			// Remove the item from the second box (box-2)
			setBox2Data((prevData) => removeFromBox(prevData, source.index));
	
			// Add the item to the first box (box-1) or the third box (box-3)
			if (destination.droppableId === "box-1") {
				setData((prevData) => addToBox(prevData, destination.index, result.draggableId));
			} else if (destination.droppableId === "box-3") {
				setBox3Data((prevData) => addToBox(prevData, destination.index, result.draggableId));
			}
		}else if (source.droppableId === "box-3") {
			// Remove the item from the third box (box-3)
			setBox3Data((prevData) => removeFromBox(prevData, source.index));
	
			// Add the item to the first box (box-1) or the second box (box-2)
			if (destination.droppableId === "box-1") {
				setData((prevData) => addToBox(prevData, destination.index, result.draggableId));
			} else if (destination.droppableId === "box-2") {
				setBox2Data((prevData) => addToBox(prevData, destination.index, result.draggableId));
			}
		}

	}
	
  return (
		<div className="task_content d-flex f-column jcsb">
			<div className={`task_content-inner`}>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="box-1">
              {(provided) => (
                <ul
								className="seq__wrap" {...provided.droppableProps} 
								ref={provided.innerRef}
                >
                  {/* {data.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="item"
                        >
                          {item}
                        </div>
                      )}
                    </Draggable>
                  ))} */}
									{data.map((item, index) => {
									return (
										<Draggable key={`item-${item}`} draggableId={item.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="item"
                        >
                          {item}
                        </div>
                      )}
                    </Draggable>
									);
								})}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
						<div className="box" id="box-2">
            <h3>Second Box</h3>
            {/* Second box to drop data */}
            <Droppable droppableId="box-2">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="items-container" {...provided.droppableProps} 
                >
									{box2Data.map((item, index) => {
										return (
											<Draggable key={`itembox2-${item}`} draggableId={item.toString()} index={index}>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className="item"
													>
														{item}
													</div>
												)}
											</Draggable>
										);
									})}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="box" id="box-3">
            <h3>Third Box</h3>
            {/* Third box to drop data */}
            <Droppable droppableId="box-3">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="items-container"
                >
									{box3Data.map((item, index) => {
										return (
											<Draggable key={`itembox3-${item}`} draggableId={item.toString()} index={index}>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className="item"
													>
														{item}
													</div>
												)}
											</Draggable>
										);
									})}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
				</DragDropContext>
			</div>
			
			{/* <button className='btn_accent' onClick={handleOnCheck}>Check</button>
			{popupVisiable && (<div className={`popup__taskresult  ${resultClass}`}>
				{taskResultText}
				<button className='btn_transp_main' onClick={handleOkBtn}>Ok</button>
			</div>)} */}
		</div>
    // <div className="task_content d-flex f-column jcsb">
		// 	<div className={`task_content-inner`}>
		// 		<DragDropContext onDragEnd={handleOnDragEnd}>
		// 			<Droppable droppableId="box-1">
		// 						{(provided) => (
		// 							<ul
		// 							className="seq__wrap" {...provided.droppableProps} 
		// 							ref={provided.innerRef}
		// 							>
		// 								{/* {data.map((item, index) => (
		// 									<Draggable key={item} draggableId={item} index={index}>
		// 										{(provided) => (
		// 											<div
		// 												ref={provided.innerRef}
		// 												{...provided.draggableProps}
		// 												{...provided.dragHandleProps}
		// 												className="item"
		// 											>
		// 												{item}
		// 											</div>
		// 										)}
		// 									</Draggable>
		// 								))} */}
		// 								{data.map((item, index) => {
		// 								return (
		// 									<Draggable key={`item-${item}`} draggableId={item.toString()} index={index}>
		// 										{(provided) => (
		// 											<div
		// 												ref={provided.innerRef}
		// 												{...provided.draggableProps}
		// 												{...provided.dragHandleProps}
		// 												className="item"
		// 											>
		// 												{item}
		// 											</div>
		// 										)}
		// 									</Draggable>
		// 								);
		// 							})}
		// 								{provided.placeholder}
		// 							</ul>
		// 						)}
		// 			</Droppable>
					
		// 		</DragDropContext>
		// 	</div>
			
    // </div>
  );
};

export default GroupAssigment;