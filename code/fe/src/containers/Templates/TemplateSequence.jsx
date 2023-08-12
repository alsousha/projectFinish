import React, { useEffect, useState, useContext  } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'


import { ReactComponent as AddIcon } from '../../assets/img/add.svg';
import { ReactComponent as DelIcon } from '../../assets/img/remove.svg';
import MsgBlock from '../../components/MsgBlock.jsx';

function TemplateSequence({generalTaskData, handleMessage, message, setSelectedData, specificData, idTask}) {
	//specificData - indicate: if exists -> "edit task" else -> new task
	const navigate = useNavigate();

// console.log(generalTaskData);

	const { currentUser} = useContext(AuthContext)
	let inputArr = specificData ? Object.values(JSON.parse(specificData)) : ['']; //if edit mode -> get specificData
	const [inputValues, setInputValues] = useState(inputArr);

	const handleInputChange = (index, event) => {
		const { value } = event.target;
		setInputValues((prevInputValues) => {
			const updatedValues = [...prevInputValues];
			updatedValues[index] = value;
			return updatedValues;
		});
	};
	const handleAddInput = () => {
		setInputValues((prevInputValues) => {
			const updatedValues = [...prevInputValues, ''];
			return updatedValues;
		});
	};
	const handleDelInput = (index) => {
    setInputValues((prevInputValues) => {
      const updatedValues = [...prevInputValues];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };
  const handleSaveData = () => {
		const dataObject = {}; //data from elems inputs 
    inputValues.forEach((value, index) => {
      dataObject[`input-${index}`] = value.trim();
    });
		const msgValidation = validateField(dataObject) //check inputs and task's name
		if(msgValidation.msgClass==='error'){
			handleMessage(msgValidation)
			setTimeout(() => {
				handleMessage('');
			}, 2000);
		}else{
			if(specificData){
				//edit task
				editTask(generalTaskData, dataObject)

			}else{
				addNewItem(generalTaskData, dataObject)
			}
			// console.log(dataObject);
		 
			setTimeout(() => {
				// setMessage('');
				navigate("/teacher/tasks")
			}, 2000);
		}
		
  };
	// console.log(generalTaskData);
	const validateField = (dataObject) =>{
		// console.log(generalTaskData.selectedFile.type);
		const allValuesNotEmpty = Object.values(dataObject).every(value => value !== '');
		// console.log(Object.values(dataObject).length);
		// console.log(dataObject);
		const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
		const msg = {
			msgClass:'',
			text:''
		}
		//check task's name
		if(generalTaskData.newItemName===''){
			msg.msgClass='error';
			msg.text='Task\'s name is require'
		}else if(generalTaskData.instruction===''){
			msg.msgClass='error';
			msg.text='Instruction is require'
		}else if(generalTaskData.selectedFile===''){
			msg.msgClass='error';
			msg.text='Image file is require'
		}else if(!specificData&&!allowedFormats.includes(generalTaskData.selectedFile.type)){
			msg.msgClass='error';
			msg.text='Incorrect type of image file.'
		}else if(!allValuesNotEmpty){
			//check inputs
			msg.msgClass='error';
			msg.text='Elements of sequence cannot be empty'
		}else if(Object.values(dataObject).length<2){
			//contains less 2 items in sequance
			msg.msgClass='error';
			msg.text='Count of elements must be more one'
		}
		return msg;
	}
  const inputElements = inputValues.map((value, index) => (
		<div className="elem mb1" key={`seqelem-${index}`}>
			<span className='mr1'>{`Element #${index+1}:`}</span>
			<input
        type="text"
        value={value}
        // ref={(ref) => {
        //   inputRefs.current[index] = ref;
        // }}
        onChange={(event) => handleInputChange(index, event)}
      />
			<button className='ml1' onClick={() => handleDelInput(index)}><DelIcon/></button>
		</div>
    
  ));

	//axios for DB
	const editTask = async (dataToSend, specificTaskData)=>{
		// console.log(dataToSend);
		const id_teacher = currentUser.id_user

		const formData = new FormData();
		formData.append('dataToSend', JSON.stringify(dataToSend));
		formData.append('specificTaskData', JSON.stringify(specificTaskData));
		formData.append('id_teacher', id_teacher);
		formData.append('selectedFile', dataToSend.selectedFile); 
		// console.log(formData.get('selectedFile'));
		// console.log(specificTaskData);
		axios
		.post(`/tasks/edittask/${idTask}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    })
		.then((res) => {
			const msgText = specificData ? 'Task updated' : "Create the task successfully!"
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				text: res.status===200 ?  msgText : 'Error add task'
			}
			handleMessage(msg);
			// Clear the message after 2 seconds 
			setTimeout(() => {
				handleMessage('');
			}, 2000);
		})
		.catch((error) => {
			console.error('Error add item', error);
		});
	}
	const addNewItem = async (dataToSend, specificTaskData)=>{
		// console.log(dataToSend);
		const id_teacher = currentUser.id_user

		// console.log(dataToSend);
		const formData = new FormData();
		formData.append('dataToSend', JSON.stringify(dataToSend));
		formData.append('specificTaskData', JSON.stringify(specificTaskData));
		formData.append('id_teacher', id_teacher);
		formData.append('selectedFile', dataToSend.selectedFile); 
// console.log(formData.get('selectedFile'));

		axios
		.post(`/tasks/createtask/1`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    })
		.then((res) => {
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				text: res.status===200 ? "Create the task successfully!" : 'Error add task'
			}
			handleMessage(msg);
			// Clear the message after 2 seconds 
			setTimeout(() => {
				handleMessage('');
			}, 2000);
		})
		.catch((error) => {
			console.error('Error add item', error);
		});
	}
  return (
    <div>
			<div className="mb1 mt2">Enter elements in right sequance:</div>
      <div className="input-elements-container">{inputElements}</div>
      {/* <button onClick={handleAddInput}>Add Input</button> */}
			<button className="link d-flex jcsb aic g1" onClick={handleAddInput}><AddIcon/> <span className='ml1'>Add new Element</span></button>
			<button
				className='btn_blue active mt2 mb2'
				onClick={handleSaveData}>
				{specificData ? 'Save' : 'Create task'}
			</button>
			<MsgBlock message={message}/>
      {/* <button className="btn-main" onClick={handleSaveData}>Save Data</button> */}
    </div>
  );
}
// function SaveButton({ handleSaveData }) {
//   return <button onClick={handleSaveData}>Save Data</button>;
// }
export default TemplateSequence;
