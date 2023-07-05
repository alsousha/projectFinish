import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext.js';
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import '../containers.scss'

import { ReactComponent as BackIcon } from '../../assets/img/back.svg';
import { ReactComponent as AZIcon } from '../../assets/img/az.svg';
import { ReactComponent as ZAIcon } from '../../assets/img/za.svg';
import Loading from '../../components/Loading.jsx';

function Students() {
	const [isLoading, setIsLoading] = useState(true);
	
	const { currentUser} = useContext(AuthContext)
	
	const [accounts, setAccounts] = useState([]);
	const [accountsActiveOrder, setAccountsActiveOrder] = useState([]);
	const [classes, setClasses] = useState();
	const [selectedClass, setSelectedClass] = useState('all');
	const [az, setAzActive] = useState(false);
	const [za, setZaActive] = useState(false);

	//fetch students of teacher
	const fetchData = async () => {
		// console.log(id_class);
		try {
			const res = await axios.post(`/teacher/${currentUser.id_user}/students_all`);
			if(res.status === 200){
				setAccounts(res.data)
				setAccountsActiveOrder(res.data)
			}
			// console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	console.log(accountsActiveOrder);
	const fetchClasses = async () => {
		// console.log(id_class);
		try {
			const res = await axios.get(`/teacher/${currentUser.id_user}/classes`);
			if(res.status === 200){
				console.log(res.data);
				setClasses(res.data.data)
			}
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	
	useEffect(() => {
    fetchData();
		fetchClasses()
		setIsLoading(false)
		
  }, []);

	const handleAZ = () => {
		setAzActive(prev => !prev)
		setZaActive(false)
		if(az){
			//deactive az filter
			setAccountsActiveOrder(accounts)
		}else{
			const sortedAccounts = [...accounts].sort((a, b) => a.lastname.localeCompare(b.lastname));

			setAccountsActiveOrder(sortedAccounts)
		}
	};

	const handleZA = () => {
		setZaActive(prev => !prev)
		setAzActive(false)
		if(za){
			//deactive za filter
			setAccountsActiveOrder(accounts)
		}else{
			const sortedAccounts = [...accounts].sort((a, b) => b.lastname.localeCompare(a.lastname));
			setAccountsActiveOrder(sortedAccounts)
		}
	};
	const handleClassChange = (e) => {
		setSelectedClass(e.target.value)
		if (selectedClass === 'all') {
			setAccountsActiveOrder(accounts);
		} else {
			console.log("ddd");
			const filteredAccounts = accounts.filter(item => item.id_class && item.id_class.toString() === selectedClass);
			console.log(filteredAccounts);
			setAccountsActiveOrder(filteredAccounts);
		}
	
		// setSelectedClass(selectedClass);
	};
	
	if (isLoading) {
    return <Loading/>;
  }
  return (
	<div className='mt4 section_accounts'>
		<div className="container">
			<h2>All students:</h2>
			<div className="back mt2 btn_main">
				<Link className="d-flex aic g1" to="/teacher/classes"><BackIcon/><span>Go Back</span></Link>
			</div>
			<div className="btns d-flex g1 mt3">
				<button className={`btn_sort az hover-scale ${az&&'active'}`} onClick={handleAZ}><AZIcon/></button>
				<button className={`btn_sort za ${za&&'active'}`} onClick={handleZA}><ZAIcon/></button>
				<select value={selectedClass} onChange={(e)=>handleClassChange(e)}>
					<option value="all">All Classes</option>
					{/* Render the available classes as options */}
					{classes&&classes.map((classItem) => (
						<option key={classItem.id_class} value={classItem.class_name}>{classItem.class_name}</option>
					))}
				</select>
			</div>
			<div className="cats__wrap table_data mt2">
				<div className="class_item title d-flex jcsb aic mb2">
					<span className='table_elem small'>N.</span>
					<span className='table_elem'>Lastname</span>
					<span className='table_elem'>Name</span>
					<span className='table_elem'>Email</span>
					<span className='table_elem'>Class</span>
				</div>
				
				{/* {accountsActiveOrder && accountsActiveOrder.length !== 0 ? (
				accountsActiveOrder
					.filter(item => selectedClass === 'all' || (item.id_class && selectedClass === item.id_class.toString()))
					.map((item, i) => (
						<div key={`${item.id_user + i}-acc`} className="class_item d-flex jcsb aic mb2">
							<div className="d-flex jcsb aic table">
								<span className='table_elem small'>{i+1}.</span>
								<span className='table_elem'>{item.lastname}&nbsp;</span>
								<span className='table_elem'>{item.name}&nbsp;</span>
								<span className='table_elem'>{item.email}</span>
								<span className='table_elem'>{item.class_name}</span>
							</div>
						</div>
					))
				) : (
					<div className="no-items">Student's list is empty</div>
				)} */}
				
				{accountsActiveOrder && accountsActiveOrder.length!==0 ? accountsActiveOrder.map((item, i) => (
					<div key={`${item.id_user}-${i}-acc`} className="class_item d-flex jcsb aic mb2">
						<div className="d-flex jcsb aic table">
								<span className='table_elem small'>{i+1}.</span>
								<span className='table_elem'>{item.lastname}&nbsp;</span>
								<span className='table_elem'>{item.name}&nbsp;</span>
								<span className='table_elem'>{item.email}</span>
								<span className='table_elem'>{item.class_name}</span>
						</div>
					</div>
				)):(
					<div className="no-items">Student's list is empty</div>
				)}

		
			</div>
		</div>
	</div>
  )
}


export default Students
