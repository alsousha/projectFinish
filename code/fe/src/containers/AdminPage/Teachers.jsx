import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext.js';
import axios from 'axios'
import Loading from '../../components/Loading.jsx';
import { ReactComponent as AZIcon } from '../../assets/img/az.svg';
import { ReactComponent as ZAIcon } from '../../assets/img/za.svg';
import UserInfoPopup from './UserInfoPopup.jsx';


function Teachers() {
	const { currentUser} = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(true);

	const [dataArray, setDataArray] = useState([]);
	const [formattedData, setFormattedData] = useState([]);
	const [dataActiveOrder, setDataActiveOrder] = useState([]);
	const [activeItem, setIctiveItem] = useState({}); //for send to popup
	const [filterItems, setFilterItems] = useState();
	const [selectedFilterItems, setSelectedFilterItem] = useState('all');
	const [az, setAzActive] = useState(false);
	const [za, setZaActive] = useState(false);
	const [isPopupVisiable, setIsPopupVisiable] = useState(false);

	const [searchQuery, setSearchQuery] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 15; // Number of items to display per page

	//fetch teachers
	const fetchData = async () => {
		try {
			const res = await axios.get(`/admin/${currentUser.id_user}/teachers`);
			setDataArray(res.data)

		} catch (err) {
			console.log(err);
		}
	};
	const fetchSbjs = async () => {
		try {
			const res = await axios.get(`/sbjs/`);
			if(res.status === 200){
				// console.log(res.data); 
				setFilterItems(res.data)
			}
			// console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
    fetchData();
		// setEditedSbj("")	
		fetchSbjs()
		setIsLoading(false)
  }, []);
	useEffect(() => {
    if (dataArray.length > 0) {
      const transformedData = groupSubjectsByEmail(dataArray);
      setDataActiveOrder(transformedData);
			setFormattedData(transformedData)
      setIsLoading(false);
    }
  }, [dataArray]);

	const handleAZ = () => {
		
		setAzActive(prev => !prev)
		setZaActive(false)
		if(az){
			//deactive az filter
			const filtered = filteredAccounts(dataArray, selectedFilterItems);
			setDataActiveOrder(filtered);
		}else{
			let sortedAccounts
			if(selectedFilterItems!=='All Subjects'){
				sortedAccounts = [...dataActiveOrder].sort((a, b) => a.lastname.localeCompare(b.lastname));
			}else{
				
				sortedAccounts = [...dataArray].sort((a, b) => a.lastname.localeCompare(b.lastname));
			}
			setDataActiveOrder(sortedAccounts)
		}
	};
	const handleZA = () => {
		setZaActive(prev => !prev)
		setAzActive(false)
		if(za){
			//deactive za filter
			// setAccountsActiveOrder(accounts)
			const filtered = filteredAccounts(dataArray, selectedFilterItems);
			setDataActiveOrder(filtered);
		}else{
			let sortedAccounts
			if(selectedFilterItems!=='All Subjects'){
				sortedAccounts = [...dataActiveOrder].sort((a, b) => b.lastname.localeCompare(a.lastname));
			}else{
				sortedAccounts = [...dataArray].sort((a, b) => b.lastname.localeCompare(a.lastname));
			}
			setDataActiveOrder(sortedAccounts)


			// const sortedAccounts = [...accounts].sort((a, b) => b.lastname.localeCompare(a.lastname));
			// setAccountsActiveOrder(sortedAccounts)
		}
	};
	const handleShowItem = (item) => {
		setIctiveItem(item)
		setIsPopupVisiable(true)
		
	};
	const handleBtnClose = (item) => {
		setIctiveItem({})
		setIsPopupVisiable(false)
		
	};
	const handleFilterItemChange = (e) => {
		const itemToShow = e.target.value
		setSelectedFilterItem(itemToShow)
		if (itemToShow === 'all') {
			setDataActiveOrder(formattedData);
		} else {
			const filtered = filteredAccounts(dataArray, itemToShow);
			setDataActiveOrder(filtered);
		}
	};
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
const handleSearch = (query) => {
	setSearchQuery(query);
	setCurrentPage(1); // Reset the current page to 1 when performing a search
};

	const filteredAccounts = (accounts, filterItemToShow) => {
		if (filterItemToShow === 'all') {
			// const transformedData = groupSubjectsByEmail(dataArray);
			return formattedData;
		} else {
			return accounts.filter(item => item.subject_name && item.subject_name.toString() === filterItemToShow);
		}
	};
	const filterDataBySearchQuery = (data, query) => {
		return data.filter((item) => {
			// const fullName = `${item.lastname} ${item.name}`.toLowerCase();
			const email = `${item.email}`.toLowerCase();
			return email.includes(query.toLowerCase());
		});
	};
	const filteredData = filterDataBySearchQuery(dataActiveOrder, searchQuery);

	// update the rendering logic for dataActiveOrder
	const lastItemIndex = currentPage * itemsPerPage;
	const firstItemIndex = lastItemIndex - itemsPerPage;
	const currentItems = filteredData.slice(firstItemIndex, lastItemIndex);

	// Calculate the total number of pages
	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

	if (isLoading) {
    return <Loading/>;
  }
	// console.log(activeItem);

	// Function to group subjects by email
	const groupSubjectsByEmail = (data) => {
		const groupedData = data.reduce((acc, curr) => {
			const { id_user, email, name, lastname, img_url, id_subject, subject_name } = curr;
			const existingUser = acc.find((user) => user.email === email);

			if (existingUser) {
				existingUser.subjects.push({ id_subject, subject_name });
			} else {
				acc.push({ id_user, email, name, lastname, img_url, subjects: [{ id_subject, subject_name }] });
			}

			return acc;
		}, []);

		return groupedData;
	};

	return (
		<div className='mt4 section_categories'>
			<div className="container">
				<h1 className=''>All Teachers</h1>
				<div className="btns d-flex g1 mt3">
					{/* <button className={`btn_sort az hover-scale ${az&&'active'}`} onClick={handleAZ}><AZIcon/></button>
					<button className={`btn_sort za ${za&&'active'}`} onClick={handleZA}><ZAIcon/></button> */}
					<select value={selectedFilterItems} onChange={(e)=>handleFilterItemChange(e)}>
						<option value="all">All Subjects</option>
						{/* Render the available classes as options */}
						{filterItems&&filterItems.map((item) => (
							<option key={item.id_subject} value={item.subject_name}>{item.subject_name}</option>
						))}
					</select>
					{/* Search input */}
					<div className="search-input">
						<input type="text" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} placeholder="Search by email" />
					</div>
				</div>
				<div className="cats__wrap table_data mt2">
					<div className="class_item title d-flex jcsb aic mb2">
						<span className='table_elem small'>N.</span>
						<span className='table_elem'>Lastname</span>
						<span className='table_elem'>Name</span>
						<span className='table_elem'>Email</span>
					</div>
					{currentItems && currentItems.length !== 0 ? (
						currentItems.map((item, i) => (
							<div key={`${item.id_user}-${i}-teacher`} className="class_item d-flex jcsb aic cursor_pointer hover_bg" onClick={() => handleShowItem(item)}>
								<div className="d-flex jcsb aic table">
									<span className="table_elem small">{(currentPage - 1) * itemsPerPage + i + 1}.</span>
									<span className="table_elem">{item.lastname}&nbsp;</span>
									<span className="table_elem">{item.name}&nbsp;</span>
									<span className="table_elem">{item.email}</span>
								</div>
							</div>
						))
					) : (
						<div className="no-items">Teacher's list is empty</div>
					)}

				</div>
				{/* Pagination controls */}
				<div className="pagination d-flex g1 mt4">
					<button
						disabled={currentPage === 1}
						onClick={() => handlePageChange(currentPage - 1)}
					>
						Previous
					</button>
					<div className="pagination-numbers">
						{Array.from({ length: totalPages }).map((_, index) => (
							<button
								key={index}
								onClick={() => handlePageChange(index + 1)}
								className={currentPage === index + 1 ? "active" : ""}
							>
								{index + 1}
							</button>
						))}
					</div>
					<button
						disabled={currentPage === totalPages}
						onClick={() => handlePageChange(currentPage + 1)}
					>
						Next
					</button>
				</div>
				{isPopupVisiable && <UserInfoPopup data={activeItem} handleBtnClose={handleBtnClose} isStudent={false}/>}
			</div>
		</div>
	
  )
}

export default Teachers
