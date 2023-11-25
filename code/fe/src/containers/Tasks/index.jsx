import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarFilter from './SidebarFilterTeacher.jsx';
import '../containers.scss';
import Task_card from './Task_card.jsx';

import { ReactComponent as BackIcon } from '../../assets/img/back.svg';
import { ReactComponent as AddIcon } from '../../assets/img/add2.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/remove.svg';

const Tasks = () => {
  const [message, setMessage] = useState({}); //msg from DB

  const [filteredData, setFilteredData] = useState([]);

  const updateFilteredData = (newData) => {
    setFilteredData(newData);
  };
  const handleDeleteItem = (task) => {
    if (task.is_done) {
      const msg = {
        msgClass: 'error',
        text: 'You can not delete this task as it has already been completed by the student/s',
      };
      setMessage(msg);
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } else {
      if (window.confirm('Are you sure delete this task?')) {
        deleteItem(task.id_task);
      }
    }
  };
  const deleteItem = async (id_task) => {
    // console.log(id_task);
    axios
      .delete(`/tasks/task/${id_task}`)
      .then((res) => {
        const msg = {
          msgClass: res.status === 200 ? 'success' : 'error',
          text: res.status === 200 ? 'Task deleted successfully!' : 'Error delete task',
        };
        setMessage(msg);
        // Clear the message after 2 seconds
        setTimeout(() => {
          setMessage('');
        }, 2000);

        const index = filteredData.findIndex((task) => task.id_task === id_task);
        if (index !== -1) {
          filteredData.splice(index, 1);
        }
      })
      .catch((error) => {
        console.error('Error add item', error);
      });
  };
  console.log(filteredData);
  return (
    <div className='d-flex '>
      <div className='container '>
        <h1 className='mt4'>Tasks</h1>
        <div className='back mt2 btn_main'>
          <Link className='d-flex aic g1' to='/teacher/classes'>
            <BackIcon />
            <span>Go Back</span>
          </Link>
        </div>
        <div className='msg_block'>
          {message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
        </div>
        <div className='add_newItem mt2'>
          <Link className='d-flex aic g1' to='/teacher/newtask'>
            <AddIcon />
            <span>create task</span>
          </Link>
        </div>
        <div className='arr_wrap tasks_wrap d-flex flex-4 jcsb'>
          {filteredData &&
            filteredData.map((elem, i) => (
              <div className='arr_item d-flex f-column jcc' key={'task-' + i}>
                <Task_card item={elem} className='' />
                {
                  <button
                    onClick={() => handleDeleteItem(elem)}
                    className={`${elem.is_done && 'no-active_info'} d-flex g1`}>
                    <DeleteIcon />
                    <span>Delete</span>
                  </button>
                }
              </div>
            ))}
        </div>
      </div>
      {/* Pagination controls */}
      {/* <div className='pagination d-flex g1 mt4'>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <div className='pagination-numbers'>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}>
              {index + 1}
            </button>
          ))}
        </div>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div> */}

      <div className='sidebar_filter'>
        <SidebarFilter updateFilteredData={updateFilteredData} />
      </div>
    </div>
  );
};

export default Tasks;
