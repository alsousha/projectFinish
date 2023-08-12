import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading.jsx';
import SidebarFilterGlobal from './SidebarFilterGlobal.jsx';
import Task_card from './Task_card.jsx';


function GlobalTasks() {
	const [filterOptions, setFilterOptions] = useState({
    subject: '',
    templateType: '',
    level: '',
    weight: '',
  });

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
	const [filteredData, setFilteredData] = useState([]); //tasks by filter from SidebarFilterGlobal

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get('/api/tasks', { params: filterOptions });
			setTasks(response.data);
		} catch (error) {
			console.error('Error fetching tasks', error);
		} finally {
			setIsLoading(false);
		}
		// try {
		// 	const res = await axios.get(`/admin/${currentUser.id_user}/teachers`);
		// 	setDataArray(res.data)

		// } catch (err) {
		// 	console.log(err);
		// }
	};
	
  useEffect(() => {
    // async function fetchTasks() {
    //   setIsLoading(true);
    //   try {
    //     const response = await axios.get('/api/tasks', { params: filterOptions });
    //     setTasks(response.data);
    //   } catch (error) {
    //     console.error('Error fetching tasks', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    // fetchData();
  }, [filterOptions]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };
	const updateFilteredData = (newData) => {
		// console.log(newData);
    setFilteredData(newData);
  };

// console.log(filteredData);
  return (
    <div className='d-flex '>
			<div className="container ">
				<h1 className='mt4'>Tasks</h1>
				<div>
					{isLoading ? (
						<p>Loading tasks...</p>
					) : (
						<div className="arr_wrap tasks_wrap d-flex flex-4 jcsb">
				
							{filteredData ? filteredData.map((elem, i) => (
								<div className="arr_item d-flex f-column jcc" key={"task-"+i}>
									<Task_card item={elem} className=""/>
									{/* {<button onClick={() => handleDeleteItem(elem)} className={elem.is_done&&'no-active_info'}><DeleteIcon/></button>} */}

								</div>
							)) : (
								<div className="arr_item d-flex f-column jcc">Task's list is empty
								</div>
							)}
							
						</div>
					)}
				</div>
				
			</div>			
			<div className="sidebar_filter"><SidebarFilterGlobal updateFilteredData={updateFilteredData}/></div>
			
     

    </div>
  );
}

export default GlobalTasks
