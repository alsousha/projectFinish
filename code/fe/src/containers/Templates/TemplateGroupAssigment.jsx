import React, { useEffect, useState, useContext  } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'


import { ReactComponent as AddIcon } from '../../assets/img/add.svg';
import { ReactComponent as DelIcon } from '../../assets/img/remove.svg';
import MsgBlock from '../../components/MsgBlock.jsx';

function TemplateGroupAssigment({generalTaskData, handleMessage, message, setSelectedData, specificData, idTask}) {
	//specificData - indicate: if exists -> "edit task" else -> new task
	const navigate = useNavigate();

	console.log(Object.values(JSON.parse(specificData)));

	const { currentUser} = useContext(AuthContext)
	let inputArr = specificData ? Object.values(JSON.parse(specificData)) : ['']; //if edit mode -> get specificData
	// console.log(inputArr);
	const [inputLeftValues, setInputLeftValues] = useState(inputArr);
	const [inputRightValues, setInputRightValues] = useState(inputArr);
	
	const [groupAssigmentData, setGroupAssigmentData] = useState({
		leftBoxTitle: specificData ? Object.values(JSON.parse(specificData))[0] : "",
		rightBoxITitle: specificData ? Object.values(JSON.parse(specificData))[1] : "",
		leftBoxItems:specificData ? Object.values(JSON.parse(specificData))[2] : [''],
		rightBoxItems:specificData ? Object.values(JSON.parse(specificData))[3] : ['']
		
	});

	const handleLeftInputTitleChange = (event) => {
		setGroupAssigmentData((prevData) => ({
      ...prevData,
      leftBoxTitle: event.target.value,
    }))
	};
	const handleRightInputTitleChange = (event) => {
		setGroupAssigmentData((prevData) => ({
      ...prevData,
      rightBoxITitle: event.target.value,
    }))
	};
	const handleLeftInputChange = (index, event) => {
		const { value } = event.target;

		setGroupAssigmentData((prevData) => {
			const updatedLeftBoxItems = { ...prevData.leftBoxItems }; // Create a copy of the leftBoxItems object
			updatedLeftBoxItems[index] = value; // Update the specific item in the copy
	
			// Return the updated groupAssigmentData with the modified leftBoxItems
			return {
				...prevData,
				leftBoxItems: updatedLeftBoxItems,
			};
		});
	};

	const handleRightInputChange = (index, event) => {
		const { value } = event.target;

		setGroupAssigmentData((prevData) => {
			const updatedRightBoxItems = { ...prevData.rightBoxItems }; 
			updatedRightBoxItems[index] = value; // Update the specific item in the copy
			return {
				...prevData,
				rightBoxItems: updatedRightBoxItems,
			};
		});

		setInputRightValues((prevInputValues) => {
			const updatedValues = [...prevInputValues];
			updatedValues[index] = value;
			return updatedValues;
		});
	};
	
	const handleAddLeftInput = () => {
		setGroupAssigmentData((prevData) => {
			const updatedLeftBoxItems = { ...prevData.leftBoxItems }; // Create a copy of the leftBoxItems object
			const newIndex = Object.keys(updatedLeftBoxItems).length; // Get the index for the new element
	
			// Add the new empty element to the copy
			updatedLeftBoxItems[newIndex] = '';
	
			// Return the updated groupAssigmentData with the modified leftBoxItems
			return {
				...prevData,
				leftBoxItems: updatedLeftBoxItems,
			};
		});
	};
	const handleAddRightInput = () => {
		setGroupAssigmentData((prevData) => {
			const updatedRightBoxItems = { ...prevData.rightBoxItems }; // Create a copy of the leftBoxItems object
			const newIndex = Object.keys(updatedRightBoxItems).length; // Get the index for the new element
	
			// Add the new empty element to the copy
			updatedRightBoxItems[newIndex] = '';
	
			// Return the updated groupAssigmentData with the modified leftBoxItems
			return {
				...prevData,
				rightBoxItems: updatedRightBoxItems,
			};
		});
	};
	const handleDelLeftInput = (index) => {
		setGroupAssigmentData((prevData) => {
			const updatedLeftBoxItems = { ...prevData.leftBoxItems }; // Create a copy of the leftBoxItems object
	
			// Remove the corresponding element from the copy
			delete updatedLeftBoxItems[index];
	
			// Update the indexes of the next items in the copy
			Object.keys(updatedLeftBoxItems).forEach((itemIndex) => {
				const currentIndex = parseInt(itemIndex, 10);
	
				if (currentIndex > index) {
					// If the current index is greater than the removed index, decrement the index
					const newIndex = currentIndex - 1;
					updatedLeftBoxItems[newIndex] = updatedLeftBoxItems[currentIndex];
					delete updatedLeftBoxItems[currentIndex];
				}
			});
	
			// Return the updated groupAssigmentData with the modified leftBoxItems
			return {
				...prevData,
				leftBoxItems: updatedLeftBoxItems,
			};
		});

  };
	const handleDelRightInput = (index) => {
		setGroupAssigmentData((prevData) => {
			const updatedRightBoxItems = { ...prevData.rightBoxItems }; 
	
			// Remove the corresponding element from the copy
			delete updatedRightBoxItems[index];
	
			// Update the indexes of the next items in the copy
			Object.keys(updatedRightBoxItems).forEach((itemIndex) => {
				const currentIndex = parseInt(itemIndex, 10);
	
				if (currentIndex > index) {
					// If the current index is greater than the removed index, decrement the index
					const newIndex = currentIndex - 1;
					updatedRightBoxItems[newIndex] = updatedRightBoxItems[currentIndex];
					delete updatedRightBoxItems[currentIndex];
				}
			});
	
			return {
				...prevData,
				rightBoxItems: updatedRightBoxItems,
			};
		});
  };
  const handleSaveData = () => {
		//trim items
		const dataLeftObject = {}; //data from elems inputs 
    Object.entries(groupAssigmentData.leftBoxItems).forEach(([key, value]) => {
			dataLeftObject[key] = value.trim();
		});
		const dataRightObject = {}; //data from elems inputs 
		Object.entries(groupAssigmentData.rightBoxItems).forEach(([key, value]) => {
			dataRightObject[key] = value.trim();
		});
		
		const msgValidation1 = validateField(dataLeftObject)
		const msgValidation2 = validateField(dataRightObject) //check inputs 

		if(msgValidation1.msgClass==='error'){
			handleMessage(msgValidation1)
			setTimeout(() => {
				handleMessage('');
			}, 2000);
		}else if( msgValidation2.msgClass==='error'){
			handleMessage(msgValidation2)
			setTimeout(() => {
				handleMessage('');
			}, 2000);
		}else{
			if(specificData){
				//edit task
				editTask(generalTaskData, groupAssigmentData, dataLeftObject, dataRightObject)

			}else{
				addNewItem(generalTaskData, groupAssigmentData, dataLeftObject, dataRightObject)
			}
		 
			setTimeout(() => {
				// setMessage('');
				navigate("/teacher/tasks")
			}, 2000);
		}
		
  };
	// console.log(generalTaskData);
	const validateField = (dataObject) =>{
		const allValuesNotEmpty = Object.values(dataObject).every(value => value !== '');
		// console.log(allValuesNotEmpty);
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
			msg.text='Elements in inputs cannot be empty'
		}else if(groupAssigmentData.leftBoxTitle.trim()===''|| groupAssigmentData.rightBoxITitle.trim()===''){
			msg.msgClass='error';
			msg.text='Title of boxes cannot be empty'
		}
		// else if(Object.values(dataObject).length<2){
		// 	//contains less 2 items in sequance
		// 	msg.msgClass='error';
		// 	msg.text='Count of elements must be more one'
		// }
		return msg;
	}
 
	// const inputElementsLeft = Object.entries(groupAssigmentData.leftBoxItems).map(([index, value]) => (
	// 	<div className="elem mb1" key={`seqelemleft-${index}`}>
	// 		<span className='mr1'>{`Element #${parseInt(index) + 1}:`}</span>
	// 		<input
	// 			type="text"
	// 			value={value}
	// 			onChange={(event) => handleLeftInputChange(index, event)}
	// 		/>
	// 		<button className='ml1' onClick={() => handleDelLeftInput(index)}><DelIcon/></button>
	// 	</div>
	// ));

	const inputElementsLeft = Object.entries(groupAssigmentData.leftBoxItems).map(
		([index, value]) => (
			<div className="elem mb1" key={`seqelem-${index}`}>
				<span className="mr1">{`Element #${parseInt(index) + 1}:`}</span>
				<input
					type="text"
					value={value} // Remove trim() when rendering the input value
					onChange={(event) => handleLeftInputChange(index, event)}
				/>
				<button className="ml1" onClick={() => handleDelLeftInput(index)}>
					<DelIcon />
				</button>
			</div>
		)
	);
	const inputElementsRight = Object.entries(groupAssigmentData.rightBoxItems).map(([index, value]) => (
		<div className="elem mb1" key={`seqelemright-${index}`}>
			<span className='mr1'>{`Element #${parseInt(index) + 1}:`}</span>
			<input
        type="text"
        value={value}
        onChange={(event) => handleRightInputChange(index, event)}
      />
			<button className='ml1' onClick={() => handleDelRightInput(index)}><DelIcon/></button>
		</div>
    
  ));
	

	//axios for DB
	const editTask = async (dataToSend, specificTaskData)=>{
		console.log(dataToSend);
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
	const addNewItem = async (dataToSend, specificTaskData, dataLeftObject, dataRightObject)=>{
		//trimm and change data from specificTaskData
		const specificTaskDataTrim = {...specificTaskData}
		specificTaskDataTrim.leftBoxItems=dataLeftObject
		specificTaskDataTrim.rightBoxItems=dataRightObject
		specificTaskDataTrim.leftBoxTitle=specificTaskDataTrim.leftBoxTitle.trim()
		specificTaskDataTrim.rightBoxITitle=specificTaskDataTrim.rightBoxITitle.trim()

		console.log(specificTaskDataTrim);
		const id_teacher = currentUser.id_user

		const formData = new FormData();
		formData.append('dataToSend', JSON.stringify(dataToSend));
		formData.append('specificTaskData', JSON.stringify(specificTaskDataTrim));
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
    <div className=''>
			<div className="d-flex jcsb mb4 mt2 g3">
				<div className="">
					<div className="mb1">Fill items for <span className='accent'>left</span> box:</div>
					<div className="mb1">
						<span className='mr1'>Left box title</span>
						<input
							type="text"
							value={groupAssigmentData.leftBoxTitle}
							onChange={handleLeftInputTitleChange}
						/>
					</div>
					
					<div className="input-elements-container">{inputElementsLeft}</div>
					<button className="link d-flex jcsb aic g1" onClick={handleAddLeftInput}><AddIcon/> <span className='ml1'>Add new Element</span></button>
				</div>
				<div className="">
					<div className="mb1">Fill items for <span className='accent'>right</span> box:</div>
					<div className="mb1">
						<span className='mr1'>Right box title</span>
						<input
							type="text"
							value={groupAssigmentData.rightBoxITitle}
							onChange={handleRightInputTitleChange}
						/>
					</div>
					
					<div className="input-elements-container">{inputElementsRight}</div>
					<button className="link d-flex jcsb aic g1" onClick={handleAddRightInput}><AddIcon/> <span className='ml1'>Add new Element</span></button>
				</div>
			</div>
			

       {/* <button onClick={handleAddInput}>Add Input</button> */}
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
export default TemplateGroupAssigment;
