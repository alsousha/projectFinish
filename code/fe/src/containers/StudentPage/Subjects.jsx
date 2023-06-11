import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext.js';
import { Link } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'

import { ReactComponent as FolderIcon } from '../../assets/img/folder.svg';



function Subjects() {
	const { currentUser} = useContext(AuthContext)
	const fetchData = async () => {
		try {
			const res = await axios.get(`/student/sbjs/${currentUser.id_user}`);
			console.log(res.data.data);
			// setClasses(res.data.data);
			// console.log(classes[0].class_name + " 2");
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
    fetchData();
  }, []);
  return (
	<div>
	  <h1>Subjects</h1>
	</div>
  )
}

export default Subjects
