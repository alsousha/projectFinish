import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WriteTask = () => {
	const [value, setValue] = useState('');
	// console.log(value);

	return (
		<div className='add'>
			<input type="text" placeholder='Title'/>
			<div className="editorContainer">
				<ReactQuill theme="snow" value={value} onChange={setValue} />
			</div>
			<div className="menu-task">
				<div className="item">
					<h2>Publish</h2>
					<span>
						<b>Status: </b> Draft
					</span>
					<span>
						<b>Visibility: </b> Public
					</span>
					<input type="file" style={{display: "none"}} id="fileTaskImg"/>
					<label htmlFor="fileTaskImg">Upload task's image</label>
					<div className="buttons">
					<button>Save as a draft</button>
					<button>Update</button>
					</div>
				</div>
				<div className="item">
					<h2>Category</h2>
					<div className="cat">
						<input type="radio" name="cat" value="Present Simple" id="PresentSimple" />
					<label htmlFor="PresentSimple">Present Simple</label>
					</div>
					<div className="cat">
						<input type="radio" name="cat" value="Past Simple" id="PastSimple" />
					<label htmlFor="PastSimple">Past Simple</label>
					</div>
					<div className="cat">
						<input type="radio" name="cat" value="FutureSimple" id="FutureSimple" />
					<label htmlFor="FutureSimple">Future Simple</label>
					</div>
					
					
					
				</div>
			</div>
			Write
		</div>
	)
}

export default WriteTask
