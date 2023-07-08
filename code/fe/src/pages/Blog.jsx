import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { API_URL } from '../constans';

function Blog() {
	const [dataArray, setDataArray] = useState([]);
	const maxCountToDisplayWords = 20
	//fetch articles
	const fetchData = async () => {
		try {
			const res = await axios.get(`/users/articles`);
			setDataArray(res.data)
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
    fetchData();
  }, []);
	function capitalizeFirstLetter(str) {
		return str&&str.charAt(0).toUpperCase() + str.slice(1);
	}
	return (
		<div className='mt5'>
			<div className="container">
				<h1 className='center'>Blog</h1>
				<div className="sbjs__wrap mt6" >
				{dataArray && dataArray.map((elem, i) => (
					<div className={`sbj__item d-flex mb4 g2 ${i%2===0 && 'f-rreverce'}`} key={"art-"+i}>
						<img src={`${API_URL}/uploads/${elem.art_img}`} alt="art_icon" className="art__icon" />
						<div className="text">
							<h2 className='mb2'>{capitalizeFirstLetter(elem.art_title)}</h2>
							<div className="art_text">
							{elem.art_text.split(' ').length > 100
								? elem.art_text
										.split(' ')
										.slice(0, maxCountToDisplayWords)
										.join(' ') + '...'
								: elem.art_text}
							</div>
						</div>
						
					</div>
				))}
				</div>
			</div>
		</div>
	)
}

export default Blog
