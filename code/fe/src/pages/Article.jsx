import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../constans';
import { AuthContext } from '../context/authContext.js';
import ReactQuill from 'react-quill';


import { ReactComponent as BackIcon } from '../assets/img/back.svg';
import { ReactComponent as EditIcon } from '../assets/img/edit3.svg';
import NotFound from './404';


function Article(props) {
	const { currentUser} = useContext(AuthContext)
	const location = useLocation();
	const isAdmin = currentUser.role==='admin'
	const item = location.state?.article;
	return (
		<div className='mt6 mb6'>
			<div className="container">
			<div className="back mb5 btn_main">
				<Link className="d-flex aic g1" to="/teacher/"><BackIcon/><span>Go Back</span></Link>
			</div>
			{isAdmin && 
				<Link
					className="d-flex aic ml03"
					to={`/admin/blog/edit/${item.id_article}`}
					state={{ item: item }}
				>					
					<EditIcon/>
				</Link>}
				{item ? (
					<div className="article__wrap">
						<img src={`${API_URL}/${item.art_img}`} alt="art_icon" className="art__icon" />
						<h2 className='center mt3 mb3'>{item.art_title}</h2>
						<div className="article__text">
							<ReactQuill
								value={item.art_text}
								readOnly={true}
								theme={"bubble"}
							/>
						</div>
						
					</div>
			): <NotFound/>}
		</div>
			
			
			
		</div>
	)
}

export default Article
