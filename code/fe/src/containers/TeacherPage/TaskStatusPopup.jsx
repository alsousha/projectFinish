import axios from 'axios';
import React, { useEffect, useState } from 'react';

function TaskStatusPopup({ classId, selectedClass, taskId, taskName, idTeacher, handlePopupClose }) {
	// console.log(taskId);
	const [studentsByClass, setStudentsByClass] = useState([]);
	const [tasksDataPerStudent, setTasksDataPerStudent] = useState([]);
	
	const fetchStudentsByClass = async () => {		
		try {
			const res = await axios.post(`/teacher/${idTeacher}/students`, {id_class: classId});
			console.log(res.data.data);
			setStudentsByClass(res.data.data)
			fetchTaskDataPerStudent(res.data.data)
			
		} catch (error) {
			console.error('Error fetching class statistics', error);
		}
  };
	const fetchTaskDataPerStudent = async (students) => {		
		try {
			const idArray = students.map(student => student.id_user);
			const res = await axios.post(`/teacher/taskdataperstudent`, {students: idArray, taskId:taskId});
			// console.log(res.data);
			setTasksDataPerStudent(res.data)
			
		} catch (error) {
			console.error('Error fetching class statistics', error);
		}
  };

	useEffect(() => {
    fetchStudentsByClass();
  }, []);

	// console.log(tasksDataPerStudent);
  return (
    <div className="popup">
			<button className="btn__close popup__btn-close" onClick={handlePopupClose}></button>

      <h2>Task name: {taskName}</h2>
			<h3 className='mt2'>Class: {selectedClass}</h3>
      <table className='table_block mt3'>
        <thead>
          <tr className='d-flex g2'>
            <th className='w40 d-flex'>Student</th>
						<th className='w20 d-flex jcc'>status</th>
            
          </tr>
        </thead>
        <tbody className=''>
          {tasksDataPerStudent&&tasksDataPerStudent.map(student => (
            <tr key={student.id_user} className='d-flex g2'>
              <td className='w40'>{student.name} {student.lastname}</td>
							<td className='w20 d-flex jcc'>{student.is_task_done ? 'V' : '-'}</td>   
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskStatusPopup;
