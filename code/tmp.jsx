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
				<div className="boxes-container">
          <div className="box" id="box-1">
            <h3>All Answers</h3>
            {/* First box with draggable items */}
           
          </div>
          <div className="box" id="box-2">
            <h3>Second Box</h3>
            {/* Second box to drop data */}
            <Droppable droppableId="box-2">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="items-container"
                >
                  {box2Data.map((item, index) => (
                    <div key={index} className="item">
                      {item}
                    </div>
                  ))}
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
                  {box3Data.map((item, index) => (
                    <div key={index} className="item">
                      {item}
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
				
			</div>	
	)
}

export default Task_card
