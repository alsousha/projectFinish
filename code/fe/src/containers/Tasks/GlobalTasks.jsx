import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading.jsx';
import SidebarFilterGlobal from './SidebarFilterGlobal.jsx';
import Task_card from './Task_card.jsx';

function GlobalTasks() {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]); //tasks by filter from SidebarFilterGlobal
  const [subjects, setSubjects] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [levels, setLevels] = useState([]);
  const [weights, setWeights] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 8;
  const totalPages = Math.ceil(filteredData.length / tasksPerPage);
  const lastItemIndex = currentPage * tasksPerPage;
  const firstItemIndex = lastItemIndex - tasksPerPage;
  const currentItems = filteredData.slice(firstItemIndex, lastItemIndex); //path of filteredData by pages

  useEffect(() => {
    // Fetch initial list of tasks
    fetchSubjects().then((data) => {
      setSubjects(data);
    });
    fetchTemplates().then((data) => {
      setTemplates(data);
    });

    const maxLevel = 12;
    const levelOptions = [];
    for (let i = 1; i <= maxLevel; i++) {
      levelOptions.push(i);
    }
    setLevels(levelOptions);

    const maxWeight = 10;
    const weightOptions = [];
    for (let i = 1; i <= maxWeight; i++) {
      weightOptions.push(i);
    }
    setWeights(weightOptions);
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`/sbjs/`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects', error);
      throw error;
    }
  };
  const fetchTemplates = async () => {
    try {
      const response = await axios.get(`/teacher/templates`);
      return response.data;
    } catch (error) {
      console.error('Error fetching templates', error);
      throw error;
    }
  };
  //fetch tasks by filter
  const fetchData = async (newData) => {
    //in first render does not have time to receive data of sbjs
    if (subjects.length !== 0 && templates.length !== 0) {
      try {
        const res = await axios.post(`/tasks/global/all`, {
          selectedSubjects: newData.selectedSubjects.includes('all')
            ? subjects
            : newData.selectedSubjects,
          selectedTemplates: newData.selectedTemplates.includes('all')
            ? templates
            : newData.selectedTemplates,
          selectedLevels: newData.selectedLevels.includes('all') ? levels : newData.selectedLevels,
          selectedWeights: newData.selectedWeights.includes('all')
            ? weights
            : newData.selectedWeights,
        });
        setFilteredData(res.data); //update task's list
        // return res.data;
      } catch (error) {
        console.error('Error fetching tasks', error);
        throw error;
      }
      setIsLoading(false);
    }
  };
  const updateFilteredData = (newData) => {
    // console.log(newData);
    fetchData(newData); //fetch data by filter items
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='d-flex '>
      <div className='container '>
        <h1 className='mt4'>Global Tasks</h1>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className='arr_wrap tasks_wrap d-flex flex-4 jcsb'>
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((elem, i) => (
                  <div className='arr_item d-flex f-column jcc' key={'task-' + i}>
                    <Task_card item={elem} className='' />
                  </div>
                ))
              ) : (
                <div className='arr_item d-flex f-column jcc'>Task's list is empty</div>
              )}
            </div>
          )}
        </div>
        {/* Pagination controls */}
        <div className='pagination d-flex g1 mt4'>
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
        </div>
      </div>
      <div className='sidebar_filter'>
        <SidebarFilterGlobal
          updateFilteredData={updateFilteredData}
          subjects={subjects}
          templates={templates}
          levels={levels}
          weights={weights}
        />
      </div>
    </div>
  );
}

export default GlobalTasks;
