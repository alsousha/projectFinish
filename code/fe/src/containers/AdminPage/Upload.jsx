import React, { useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css'; // Import the styles
import Dropzone from 'react-dropzone-uploader';

function Upload({ cardImgs, onUpload, handleSubmit  }) {
  // Configure the dropzone
  const onChangeStatus = ({ meta, file }, status) => {
	// console.log(file);
	if (status === 'done') {
		onUpload((prevCardImgs) => [...prevCardImgs, file]);
	} else if (status === 'removed') {
		onUpload((prevCardImgs) =>
		 prevCardImgs.filter((img) => img !== file)
	  );
	}
 };
//  const handleSubmit = (files, allFiles) => {
// 	console.log(files.map(f => f.meta))
// 	allFiles.forEach(f => f.remove())
//  }
// console.log(cardImgs);
  return (
	<>
		<Dropzone
			onChangeStatus={onChangeStatus}
			accept="image/*"
			maxFiles={5} // Set a maximum number of allowed files
			multiple={true} // Allow multiple file uploads
			// onSubmit={handleSubmit}
			>
			{({ getRootProps, getInputProps }) => (
				<div className="dropzone">
					<div {...getRootProps()} className="dropzone-content">
						<input {...getInputProps()} />
						<p>Drag & drop or click to select card images</p>
					</div>
				</div>
			)}
		</Dropzone>
	</>
   
  );
}

export default Upload;
