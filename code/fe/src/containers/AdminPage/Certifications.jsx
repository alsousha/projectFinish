import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { API_URL } from '../../constans';
import { Link, useLocation  } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { AuthContext } from '../../context/authContext';

import { ReactComponent as EditIcon } from '../../assets/img/edit3.svg';
import EditCertifications from './EditCertifications';


function Certifications() {

	const [editMode, setEditMode] = useState(false);
	const location = useLocation();
	const { currentUser} = useContext(AuthContext)
	const isAdmin = currentUser.role==='admin'

	const handleEditMode = () =>{
		setEditMode(!editMode)
		
	}

	return (
		<div className='mt5'>
			<div className="container">
				<h1 className='center'>Certifications</h1>
				<div className="arts__wrap mt6" >
					{isAdmin && !editMode &&(
						<div className="add_newItem mt2 mb3">
							<button onClick={handleEditMode}><EditIcon/><span>Manage certifications</span></button>
						</div>
						
					)}
					{isAdmin && editMode &&(
						<div className="">
							<div className="add_newItem mt2 mb3">
								<button onClick={handleEditMode}><span>Save</span></button>
							</div>
							<EditCertifications/>
						</div>
					)}
					

				</div>
				</div>
			
			
		</div>
	)
}

export default Certifications
