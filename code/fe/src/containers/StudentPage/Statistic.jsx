import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import axios from 'axios'
import '../containers.scss'

function Statistic() {
	const { currentUser} = useContext(AuthContext)

  const [sbjs, setSbjs] = useState([]);

	const fetchSbjs = async () => {
		try {
			const response = await axios.get(`/student/sbjs/${currentUser.id_user}`);
			// if(response.data.length){

			// }
			setSbjs(response.data);
		} catch (err) {
			console.log(err);
		}
	};
	const fetchStatisticData = async (id_subject) => {
		console.log(id_subject);
		// try {
		// 	const response = await axios.get(`/student/sbjs/${currentUser.id_user}`);
		// 	// if(response.data.length){

		// 	// }
		// 	setSbjs(response.data);
		// } catch (err) {
		// 	console.log(err);
		// }
	};
	useEffect(() => {
    fetchSbjs();
  }, []);

	const handleSubjectClick = (id_subject) => {
		// setTasks([])
		fetchStatisticData(id_subject)
  };

	// console.log(sbjs);
  return (
		<div className='mt4 section_student_subjects'>
			<div className="container">
				<h1>Statisitc</h1>
				<div className="d-flex g1 mt3">
					{sbjs&&sbjs.map((item) => (
						<div className="btn_maincolor" key={"subject_studentStat"+item.id_subject}>
							<button className=""  onClick={() => handleSubjectClick(item.id_subject)}>
								{item.subject_name}
							</button>
						</div>
					))}
				</div>
			</div>
	  
	</div>
  )
}

export default Statistic
