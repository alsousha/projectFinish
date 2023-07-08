import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../constans';

import { ReactComponent as BackIcon } from '../assets/img/back.svg';

function Article(props) {
	const location = useLocation();
	const item = location.state?.article;
	return (
		<div className='mt6 mb6'>
			<div className="container">
			<div className="back mb5 btn_main">
				<Link className="d-flex aic g1" to="/teacher/"><BackIcon/><span>Go Back</span></Link>
			</div>
			<div className="article__wrap">
				<img src={`${API_URL}/uploads/${item.art_img}`} alt="art_icon" className="art__icon" />

				<h2 className='center mt3 mb3'>{item.art_title}</h2>
				<div className="article__text">{item.art_text}</div>
			</div>
		</div>
			
			
			
		</div>
	)
}

export default Article
