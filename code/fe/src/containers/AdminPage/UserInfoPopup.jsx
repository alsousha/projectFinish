import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'



function UserInfoPopup({data, handleBtnClose, isStudent}) {
	const [additionalUserData, setAdditionalUserData] = useState({});

	const fetchData = async () => {
		if(isStudent){
			try {
				const studentsDataResponse   = await axios.get(`/admin/studentdata/${data.id_user}`);
				
				const totalPointsCount = studentsDataResponse.data[0].total_points;
				const classLevel = studentsDataResponse.data[0].class_level;
	
				const studentData = {
					id_user: data.id_user,
					class_level: classLevel,
					total_points: totalPointsCount,
				};
				setAdditionalUserData(studentData)
			} catch (err) {
				console.log(err);
			}
		}else{
			try {
				// const tasksResponse   = await axios.get(`/admin/tasks/count?id=${data.id_user}`);
				const tasksResponse   = await axios.get(`/admin/tasks/count/${data.id_user}`);
				const classesResponse   = await axios.get(`/admin/classes/count/${data.id_user}`);
				const subjectsResponse   = await axios.get(`/teacher/sbjs/${data.id_user}`);
				const taskCount = tasksResponse.data[0].task_count;
				const classCount = classesResponse.data[0].class_count;
				const sbjs = subjectsResponse.data
				// console.log(tasksResponse.data[0]);
				// console.log(classesResponse.data[0]);
	
				const teacherData = {
					id_teacher: data.id_user,
					task_count: taskCount,
					class_count: classCount,
					sbjs: sbjs
				};
				setAdditionalUserData(teacherData)
			} catch (err) {
				console.log(err);
			}
		}
		
	};
	useEffect(() => {
		fetchData();
  }, []);
	return (
		<div className="popup_content overlay">
			<div className='popup'>
				<button className="btn__close popup__btn-close" onClick={handleBtnClose}></button>
				<div className="popup__inner">
					<div className="top d-flex jcsb aic">
						<div className="">
							<span>Details of {isStudent ? "student" : "teacher"}:</span>
							<span className='p_bold'> {data.name} {data.lastname}</span>
						</div>
						{/* <button className='btn_danger'>Block this user</button> */}
					</div>
					<div className="mid mt4">
						<div className="user__item d-flex aic mb1">
							<span className="label">Email:</span>
							<span className="userData">{data.email}</span>
						</div>
						{isStudent ? (
							<>
								<div className="user__item d-flex aic  mb1">
									<span className="label">Class level:</span>
									<span className="userData">{additionalUserData&&additionalUserData.class_level}</span>
								</div>
								<div className="user__item d-flex aic  mb1">
									<span className="label">Total points:</span>
									<span className="userData">{additionalUserData&&additionalUserData.total_points}</span>
								</div>
							</>
							

						) : (
							<>
								<div className="user__item d-flex  mb1">
									<span className="label ">Subjects:</span>
									<span className="userData">{additionalUserData&&additionalUserData.sbjs&&additionalUserData.sbjs.map((item)=>(
									<p key={"userinfo"+item.subject_name} className="">{item.subject_name}</p>
								))}</span>
								</div>
								<div className="user__item d-flex aic  mb1">
									<span className="label">Count of classes:</span>
									<span className="userData">{additionalUserData&&additionalUserData.class_count}</span>
								</div>
								<div className="user__item d-flex aic  mb1">
									<span className="label">Total count of tasks:</span>
									<span className="userData">{additionalUserData&&additionalUserData.task_count}</span>
								</div>

							</>
							
						)}
						
					</div>

				</div>
				
			</div>
		</div>
		
	)
}

export default UserInfoPopup
