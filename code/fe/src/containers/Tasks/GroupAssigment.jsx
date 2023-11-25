import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext.js';

import axios from 'axios';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './Task.scss';

function GroupAssigment({ task, textResult, handleGoBack }) {
  const { currentUser, updateUser } = useContext(AuthContext);

  const jsonTask = JSON.parse(task.specific_data);
  const leftItems = { ...jsonTask.leftBoxItems };
  const rightItems = { ...jsonTask.rightBoxItems };
  const [box2Data, setBox2Data] = useState([]); // State for the second box
  const [box3Data, setBox3Data] = useState([]); // State for the third box
  const [popupVisiable, setPopupVisiable] = useState(false);
  const [resultClass, setResultClass] = useState('');
  const [btnClass, setBtnClass] = useState('no-active');
  const [taskResultText, setTaskResultText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [userData, setUserData] = useState(currentUser);

  // Combine both objects into an array and shuffle it
  const allItems = [
    ...Object.values(leftItems).map((value) => ({ value, source: 0 })),
    ...Object.values(rightItems).map((value) => ({ value, source: 1 })),
  ];
  console.log(allItems);

  // const [data, setData] = useState(["Item 1", "Item 2", "Item 3"]); // Sample data for the first box
  const [data, setData] = useState(shuffleArray(allItems)); // Sample data for the first box

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    // If the destination is null or the item is dropped back to the same position, do nothing
    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }
    // Find the item in the data array using the draggableId from the result
    const draggedItem = data.find((item) => item.value.toString() === result.draggableId);
    // const sourceValue = draggedItem.source; //index of distination box (right answer)

    const removeFromBox = (boxData, index) => {
      const newData = [...boxData];
      newData.splice(index, 1);
      return newData;
    };

    const addToBox = (boxData, index, item) => {
      const sourceValue = draggedItem.source; //index of distination box (right answer)
      const newData = [...boxData];
      // newData.splice(index, 0, item);
      newData.splice(index, 0, { value: item, source: sourceValue });
      // console.log(newData);
      return newData;
    };

    if (source.droppableId === 'box-1') {
      // Remove the item from the first box (box-1)
      setData((prevData) => removeFromBox(prevData, source.index));

      // Add the item to the second box (box-2) or the third box (box-3)
      if (destination.droppableId === 'box-2') {
        setBox2Data((prevData) => addToBox(prevData, destination.index, result.draggableId));
      } else if (destination.droppableId === 'box-3') {
        setBox3Data((prevData) => addToBox(prevData, destination.index, result.draggableId));
      }
    } else if (source.droppableId === 'box-2' && destination.droppableId === 'box-3') {
      // Moving from box-2 to box-3
      const newBox2Data = [...box2Data];
      const itemToMove = newBox2Data.splice(source.index, 1)[0];
      setBox2Data(newBox2Data);
      setBox3Data((prevData) => [...prevData, itemToMove]);
    } else if (source.droppableId === 'box-3' && destination.droppableId === 'box-2') {
      // Moving from box-3 to box-2
      const newBox3Data = [...box3Data];
      const itemToMove = newBox3Data.splice(source.index, 1)[0];
      setBox3Data(newBox3Data);
      setBox2Data((prevData) => [...prevData, itemToMove]);
    }

    if (data.length === 1) {
      setBtnClass('');
    }
  };
  const handleOkBtn = () => {
    setPopupVisiable(false);
    if (correctAnswer) {
      setTimeout(() => {
        handleGoBack();
      }, 500);
    }
  };
  const handleOnCheck = () => {
    // console.log(box2Data);
    // console.log(box3Data);

    setPopupVisiable(true);
    // check if answers are correct
    const isCorrectAnswers = (box1, box2) => {
      const allElementsHaveSource0 = box1.every((item) => item.source === 0);
      const allElementsHaveSource1 = box2.every((item) => item.source === 1);
      return allElementsHaveSource0 && allElementsHaveSource1;
    };

    if (isCorrectAnswers(box2Data, box3Data)) {
      setCorrectAnswer(true);
      setResultClass('success');
      setTaskResultText(textResult.success);
      if (currentUser.role === 'student') {
        updatePoints(task.task_weight);
        updateTaskDone();
      }
    } else {
      setCorrectAnswer(false);
      setResultClass('fail');
      setTaskResultText(textResult.fail);
    }
  };
  const updatePoints = async (task_weight) => {
    // console.log(task_weight);
    axios
      .put(`/student/updatepoints/${currentUser.id_user}`, { task_weight: task_weight })
      .then((res) => {
        const tmpUserData = (prevUserData) => ({
          ...prevUserData,
          points: prevUserData.points + task_weight,
        });
        setUserData(tmpUserData);
        updateUser(tmpUserData); //update localstorage and context

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
  };
  const updateTaskDone = async () => {
    axios
      .put(`/tasks/updatetaskdone/${currentUser.id_user}`, { id_task: task.id_task })
      .then((res) => {})
      .catch((error) => {
        console.error('Error add item', error);
      });
  };
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  return (
    <div className='task_content d-flex f-column jcsb'>
      <div className={`task_content-inner`}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='box-1'>
            {(provided) => (
              <ul className='seq__wrap group' {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((item, index) => (
                  <Draggable
                    key={`item-${item.value}`}
                    draggableId={item.value.toString()}
                    index={index}
                    tt={item.source}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`item ${index === 0 ? 'accent' : 'no-active'}`}>
                        {item.value}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <div className='answer_boxes d-flex jcsb g1'>
            <div className='box w50' id='box-2'>
              <h3>{jsonTask.leftBoxTitle}</h3>
              {/* Second box to drop data */}
              <Droppable droppableId='box-2'>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    className='items-container'
                    {...provided.droppableProps}>
                    {box2Data.map((item, index) => (
                      <Draggable
                        key={`itembox2-${item.value}`}
                        draggableId={item.value.toString()}
                        index={index}
                        tt={item.source}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className='item'>
                            {item.value}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className='box w50' id='box-3'>
              <h3>{jsonTask.rightBoxITitle}</h3>
              {/* Third box to drop data */}
              <Droppable droppableId='box-3'>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='items-container'>
                    {box3Data.map((item, index) => {
                      return (
                        <Draggable
                          key={`itembox3-${item.value}`}
                          draggableId={item.value.toString()}
                          index={index}
                          tt={item.source}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className='item'>
                              {item.value}
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
          </div>
        </DragDropContext>
      </div>

      <button className={`btn_accent ${btnClass}`} onClick={handleOnCheck}>
        Check
      </button>
      {popupVisiable && (
        <div className={`popup__taskresult  ${resultClass}`}>
          {taskResultText}
          <button className='btn_transp_main' onClick={handleOkBtn}>
            Ok
          </button>
        </div>
      )}
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
}

export default GroupAssigment;
