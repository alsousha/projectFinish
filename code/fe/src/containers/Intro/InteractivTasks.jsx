import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constans';

function InteractivTasks() {
	const [dataArray, setDataArray] = useState([]);
	// const imageUrl = `${API_URL}/uploads/edit.png`; 

	//fetch sbjs
	const fetchData = async () => {
		try {
			const res = await axios.get(`/sbjs/`);
			setDataArray(res.data)
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
    fetchData();
  }, []);
	function capitalizeFirstLetter(str) {
		return str&&str.charAt(0).toUpperCase() + str.slice(1);
	}
	return (
		<div>
			<div className="container mt4">
				<h2 className='center'>Interactive tasks for grades 1-12</h2>
				<div className="sbjs__wrap d-flex jcsb f-wrap g1 mt3" >
				{dataArray && dataArray.map((elem, i) => (
					<div className="sbj__item d-flex aic mb2 w20" key={"sbj-"+i}>
						<img src={`${API_URL}/uploads/${elem.subject_icon}`} alt="sbj_icon" className="sbj__icon" />
						<span>{capitalizeFirstLetter(elem.subject_name)}</span>
					</div>
				))}
				</div>
			</div>
		</div>
	)
}

export default InteractivTasks
