import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext.js';
import axios from 'axios'
import Loading from '../../components/Loading.jsx';
// 
import UserInfoPopup from './UserInfoPopup.jsx';
import { maxLevel } from '../../constans.js';

function Students() {
	const { currentUser} = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(true);

	const [dataArray, setDataArray] = useState([]);
	const [formattedData, setFormattedData] = useState([]);
	const [dataActiveOrder, setDataActiveOrder] = useState([]);
	const [activeItem, setIctiveItem] = useState({}); //for send to popup
	const [filterItems, setFilterItems] = useState();
	const [selectedFilterItems, setSelectedFilterItem] = useState('all');
	const [isPopupVisiable, setIsPopupVisiable] = useState(false);

	const [searchQuery, setSearchQuery] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 15; // Number of items to display per page

	//fetch teachers
	const fetchData = async () => {
		try {
			const res = await axios.get(`/admin/${currentUser.id_user}/students`);
			// console.log(res.data);
			setDataArray(res.data)

		} catch (err) {
			console.log(err);
		}
	};
	const fetchClassLevels = async () => {
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
		fetchClassLevels();
		setIsLoading(false)
  }, []);
	useEffect(() => {
    if (dataArray.length > 0) {
      // const transformedData = groupSubjectsByEmail(dataArray);
      setDataActiveOrder(dataArray);
			// setFormattedData(transformedData)
      setIsLoading(false);
    }
  }, [dataArray]);


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
			setDataActiveOrder(dataArray);
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
			return formattedData;
		} else {
			return accounts.filter(item => item.class_level && item.class_level.toString() === filterItemToShow);
		}
	};
	
	const filterDataBySearchQuery = (data, query) => {
		return data.filter((item) => {
			// const fullName = `${item.lastname} ${item.name}`.toLowerCase();
			const email = `${item.email}`.toLowerCase();
			return email.includes(query.toLowerCase());
		});
	};
	
	
	if (isLoading) {
    return <Loading/>;
  }
	const lvlsElem = [];
	for (let i = 1; i <= maxLevel; i++) {
		lvlsElem.push(
			<option key={`level-${i}`} value={i}>
				{`Class ${i}`}
			</option>
		);
	}

	const filteredData = filterDataBySearchQuery(dataActiveOrder, searchQuery);


	// update the rendering logic for dataActiveOrder
	const lastItemIndex = currentPage * itemsPerPage;
	const firstItemIndex = lastItemIndex - itemsPerPage;
	const currentItems = filteredData.slice(firstItemIndex, lastItemIndex); //path of filteredData by pages

	// Calculate the total number of pages
	const totalPages = Math.ceil(filteredData.length / itemsPerPage);
	return (
		<div className='mt4 section_categories'>
			<div className="container">
				<h1 className=''>All Students</h1>
				<div className="btns d-flex g1 mt3">
					<select value={selectedFilterItems} onChange={(e)=>handleFilterItemChange(e)}>
						<option value="all">All class levels</option>
						{lvlsElem}
					</select>
					{/* Search input */}
					<div className="search-input">
						<input type="text" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} placeholder="Search by email" />
					</div>
				</div>
				<div className="cats__wrap table_data mt2">
					<div className="class_item title d-flex jcsb aic mb2">
						{/* Table header elements */}
					</div>
					{currentItems && currentItems.length !== 0 ? (
						currentItems.map((item, i) => (
							<div key={`${item.id_user}-${i}-teacher`} className="class_item d-flex jcsb aic cursor_pointer hover_bg" onClick={()=>handleShowItem(item)}>
									
								<div className="d-flex jcsb aic table">
									<span className='table_elem small'>{i+1}.</span>
									<span className='table_elem'>{item.lastname}&nbsp;</span>
									<span className='table_elem'>{item.name}&nbsp;</span>
									<span className='table_elem'>{item.email}</span>
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
				{isPopupVisiable && <UserInfoPopup data={activeItem} handleBtnClose={handleBtnClose} isStudent={true}/>}
			</div>
		</div>
	
  )
}

export default Students
