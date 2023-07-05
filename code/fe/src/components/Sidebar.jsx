import React,{ useState, useContext } from 'react'

import { Link, NavLink } from "react-router-dom";
import './components.scss'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import UserEditForm from './Forms/UserEditForm';
import { ReactComponent as LogoutIcon } from '../assets/img/logout.svg';
import { ReactComponent as EditIcon } from '../assets/img/edit.svg';
import { ReactComponent as PointIcon } from '../assets/img/point.svg';
import { AuthContext } from '../context/authContext';

function Sidebar({items, handleLink}) {
	const { currentUser, logout } = useContext(AuthContext)


	// console.log(currentUser);
  return (
	<div className='sidebar'>
		<div className='userSection mb5'>
			<div className="top d-flex jcsb aic mb1">
				<div className="point d-flex jcsb aic">
					{currentUser.role==='student' && (
						<>
							<PointIcon/>
							<span>{currentUser.points}</span>
						</>
					)}
				</div>
				<div className="userSection__btns d-flex">
					<Link className="editBtn userSection__btn hover-scale link" to="profile"><EditIcon className='sidebar__icon' /></Link>	
					<span className='exitBtn userSection__btn hover-scale' onClick={logout}><Link className="link" to="/"><LogoutIcon className='sidebar__icon'/></Link></span>	
				</div>
			</div>
			<div className="bottom">
				<div className="user__info d-flex f-column aic">
					<div className="user__logo">
						{/* <img src={userData.userImgLink} alt="user_avatar" /> */}
					</div>
					<div className="user__name t_24 t_bold"><h3>{currentUser.lastname} {currentUser.name}</h3></div>
					<div className="user__role">{currentUser.role}</div>
					{/* <div className="user__sbj">{currentUser.sbj}</div> */}
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
