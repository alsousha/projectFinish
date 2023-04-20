import React from 'react'
import { Link } from "react-router-dom";
import './components.scss'

function Sidebar({items, handleLink}) {
	// console.log(items);
  return (
	<div className='sidebar white'>
		{items && items.map((item, ind)=>(
			<li key={`sidebarItem-${ind}`} 
				className='sidebarLink' 
				onClick={handleLink ? ()=>handleLink(ind) : null}>
					<Link to={item.link}>{item.linkName}</Link>
			</li>
		))}
	</div>
  )
}

export default Sidebar
