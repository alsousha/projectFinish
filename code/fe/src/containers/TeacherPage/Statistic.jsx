import React, { useContext, useEffect, useRef, useState } from 'react'
import StatisticByClassComponent from './StatisticByClassComponent'
import StatisticByTaskComponent from './StatisticByTaskComponent'
import { AuthContext } from '../../context/authContext';

function Statistic() {
	const [hasAccess, setHasAccess] = useState(false);
	const inputRef = useRef(null);
	const { currentUser} = useContext(AuthContext)


	const [activeTab, setActiveTab] = useState('class'); // 'class' or 'task'

	useEffect(() => {
		if(currentUser.role==='teacher') setHasAccess(true)
    
  }, [currentUser.id_user]);
	if (!hasAccess) {
    return <div>Error: You do not have access to this page.</div>;
  }
	return (
		<div className='mt5'>
			<div className="container">
				<h1 className='center'>Statistic</h1>
				<div className='d-flex g2'>
					<button className='' onClick={() => setActiveTab('class')}>Statistic by Class</button>
					<button onClick={() => setActiveTab('task')}>Statistic by Task</button>
				</div>

				{activeTab === 'class' && <StatisticByClassComponent />}
				{activeTab === 'task' && <StatisticByTaskComponent />}

				</div>
			
		</div>
	)
}

export default Statistic
