import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import '../containers.scss';

import { ReactComponent as DoneIcon } from '../../assets/img/done.svg';
import { ReactComponent as NotDoneIcon } from '../../assets/img/notdone.svg';

function Statistic() {
  const { currentUser } = useContext(AuthContext);

  const [sbjs, setSbjs] = useState([]);
  const [statData, setStatData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

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
    console.log(currentUser.id_user);
    try {
      // const response = await axios.get(`/student/statisticdata/${currentUser.id_user}`);
      const res = await axios.post(`/student/statisticdata`, {
        id_subject: id_subject,
        id_user: currentUser.id_user,
      });

      console.log(res.data);
      const groupedArray = [];

      res.data.forEach((item) => {
        const existingGroup = groupedArray.find(
          (group) => group.id_tskFolder === item.id_tskFolder,
        );

        if (existingGroup) {
          existingGroup.tasks.push({
            id_task: item.id_task,
            task_name: item.task_name,
            is_task_done: item.is_task_done,
          });
        } else {
          groupedArray.push({
            id_tskFolder: item.id_tskFolder,
            tskFolder_name: item.tskFolder_name,
            tasks: [
              {
                id_task: item.id_task,
                task_name: item.task_name,
                is_task_done: item.is_task_done,
              },
            ],
          });
        }
      });

      console.log(groupedArray);
      setStatData(groupedArray);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSbjs();
  }, []);

  const handleSubjectClick = (id_subject, i) => {
    setActiveTab(i);
    // setTasks([])
    fetchStatisticData(id_subject);
  };

  // console.log(sbjs);

  return (
    <div className='mt4 section_student_subjects'>
      <div className='container'>
        <h1>Statisitc</h1>
        <div className='d-flex mt3 tab-list'>
          {sbjs &&
            sbjs.map((item, i) => (
              <button
                key={'subject_studentStat' + item.id_subject}
                className={i === activeTab ? 'active tab-item' : 'tab-item'}
                onClick={() => handleSubjectClick(item.id_subject, i)}>
                {item.subject_name}
              </button>
            ))}
        </div>
        <div className='statistic_data mt4'>
          <div className='tab-content'>
            {/* List of tasks and their statuses */}
            <div className='statistic_title d-flex mb2'>
              <div className='w30'>
                <h3>Folders</h3>
              </div>
              <div className='w70'>
                <h3>Tasks</h3>
              </div>
            </div>
            {statData &&
              statData.map((group) => (
                <div key={group.id_tskFolder} className='d-flex mb1 table_item'>
                  <div className='w30'>
                    <h3>{group.tskFolder_name}</h3>
                  </div>
                  <ul className='d-flex g3 w70 '>
                    {group.tasks.map((task) => (
                      <li key={task.id_task} className='task-status d-flex  aic'>
                        {task.task_name} {task.is_task_done === 1 ? <DoneIcon /> : <NotDoneIcon />}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistic;
