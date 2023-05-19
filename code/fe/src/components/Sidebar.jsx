import React,{ useState } from 'react'

import { Link, NavLink } from "react-router-dom";
import './components.scss'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import UserEditForm from './Forms/UserEditForm';
import { ReactComponent as LogoutIcon } from '../assets/img/logout.svg';
import { ReactComponent as EditIcon } from '../assets/img/edit.svg';

function Sidebar({items, handleLink, userData, setIsLoggedIn}) {
	const [visibleUserEditForm, setVisibleUserEditForm] = useState(false);
	// console.log(items);
	const handleLogOut = () => {
		if(window.confirm("Are you sure want to exit?")){
			//change app state for logout
			setIsLoggedIn(false);
			localStorage.setItem('isLoggedIn', false);
			localStorage.setItem('userName', '');
		}
		
	  };
	const toggleVisibleUserEditForm = () =>{
		setVisibleUserEditForm(!visibleUserEditForm)
	}
  return (
	<div className='sidebar'>
		<div className='userSection mb5'>
			<div className="top d-flex jce mb1">
				<div className="userSection__btns d-flex">
					<button className='editBtn userSection__btn hover-scale ' title="edit profile">
						<EditIcon className='sidebar__icon' onClick={()=>toggleVisibleUserEditForm()}/>
					</button>
					<NavLink onClick={handleLogOut} to='/' className='exitBtn userSection__btn hover-scale' title="logout">
						<LogoutIcon className='sidebar__icon'/>
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
		{visibleUserEditForm ? (
			<UserEditForm userData={userData} handleEditFormHide={toggleVisibleUserEditForm}/>
		): ("")}
		
	</div>
  )
}

export default Sidebar
