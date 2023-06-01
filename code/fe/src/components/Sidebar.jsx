import React,{ useState, useContext } from 'react'

import { Link, NavLink } from "react-router-dom";
import './components.scss'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import UserEditForm from './Forms/UserEditForm';
import { ReactComponent as LogoutIcon } from '../assets/img/logout.svg';
import { ReactComponent as EditIcon } from '../assets/img/edit.svg';
import { AuthContext } from '../context/authContext';

function Sidebar({items, handleLink, setIsLoggedIn}) {
	const { currentUser, logout } = useContext(AuthContext)

	const [visibleUserEditForm, setVisibleUserEditForm] = useState(false);
	
	const toggleVisibleUserEditForm = () =>{
		setVisibleUserEditForm(!visibleUserEditForm)
	}
	// console.log(currentUser);
  return (
	<div className='sidebar'>
		<div className='userSection mb5'>
			<div className="top d-flex jce mb1">
				<div className="userSection__btns d-flex">
					<button className='editBtn userSection__btn hover-scale ' title="edit profile">
						<EditIcon className='sidebar__icon' onClick={()=>toggleVisibleUserEditForm()}/>
					</button>
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
		{visibleUserEditForm ? (
			<UserEditForm  currentUser={currentUser} handleEditFormHide={toggleVisibleUserEditForm}/>
		): ("")}
		
	</div>
  )
}

export default Sidebar
