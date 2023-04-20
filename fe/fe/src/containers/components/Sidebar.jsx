import React from 'react'
import { Link, NavLink } from "react-router-dom";
import './components.scss'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

function Sidebar({items, handleLink, userData, setIsLoggedIn}) {
	// console.log(items);
	const handleLogOut = () => {
		if(window.confirm("Are you sure want to exit?")){
			//change app state for logout
			setIsLoggedIn(false);
			localStorage.setItem('isLoggedIn', false);
			localStorage.setItem('userName', '');
		}
		
	  };
  return (
	<div className='sidebar white'>
		<div className='userSection mb5'>
			<div className="top d-flex jce mb1">
				<div className="userSection__btns d-flex">
					<button className='editBtn userSection__btn hover-scale' title="edit profile"><EditTwoToneIcon/></button>
					<NavLink onClick={handleLogOut} to='/' className='exitBtn userSection__btn hover-scale' title="logout">
						<MeetingRoomTwoToneIcon/>
					</NavLink>
					
				</div>
			</div>
			<div className="bottom">
				<div className="user__info d-flex f-column aic">
					<div className="user__logo">
						<img src={userData.userImgLink} alt="user_avatar" />
					</div>
					<div className="user__name t_24 t_bold"><h3>{userData.lastName} {userData.name}</h3></div>
					<div className="user__role">{userData.role}</div>
					<div className="user__sbj">{userData.sbj}</div>
				</div>
			</div>
		</div>
		<nav>
		{items && items.map((item, ind)=>(
			<li key={`sidebarItem-${ind}`} 
				className='sidebarLink' 
				onClick={handleLink ? ()=>handleLink(ind) : null}>
					<NavLink to={item.link}>{item.linkName}</NavLink>
			</li>
		))}
		</nav>
		
	</div>
  )
}

export default Sidebar
