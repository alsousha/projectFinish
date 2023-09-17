import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { API_URL } from '../constans';
import { Link, useLocation  } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { AuthContext } from '../context/authContext';

import { ReactComponent as AddIcon } from '../assets/img/add.svg';
import { ReactComponent as DeleteIcon } from '../assets/img/delete.svg';



function Blog() {
	const location = useLocation();
	const { currentUser} = useContext(AuthContext)
 const isBlogAdminRoute = location.pathname.startsWith('/admin/blog');
	
	const [dataArray, setDataArray] = useState([]);
	const [message, setMessage] = useState({}); //msg from DB

	const isAdmin = currentUser.role==='admin'
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

	const handleDeleteItem = (article) =>{
		if (window.confirm('Are you sure delete this article?')) {
			deleteItem(article.id_article)
		}
		
	}
	const deleteItem = async(id_article)=>{
		// console.log(id_task);
		axios
		.delete(`/admin/deletearticle/${id_article}`)
		.then((res) => {
			const msg={
				msgClass: res.status===200 ? "success" : "error",
				text: res.status===200 ? "Article deleted successfully!" : 'Error delete article'
			}
			setMessage(msg);
			 // Clear the message after 2 seconds 
			setTimeout(() => {
				setMessage('');
			}, 2000);
			fetchData()
		})
		.catch((error) => {
			console.error('Error delete article', error);
		});
	}
	function capitalizeFirstLetter(str) {
		return str&&str.charAt(0).toUpperCase() + str.slice(1);
	}
	return (
		<div className='mt5'>
			<div className="container">
				<h1 className='center'>Blog</h1>
				<div className="arts__wrap mt6" >

					{isAdmin && (
						<div className="add_newItem mt2 mb3">
							<Link className="d-flex aic g1" to="/admin/newarticle">
								<AddIcon/><span>add new article</span>
							</Link>
						</div>
					)}
				{dataArray && dataArray.map((elem, i) => (
					<div key={"art-"+i}>
						<Link 
							to={isBlogAdminRoute ? `/admin/blog/${elem.id_article}` : `blog/${elem.id_article}`}
							state={{ article: elem }}
							className={`art__item d-flex mt4 g2 ${i%2===0 && 'f-rreverce'}`} 
							
							>
							<img src={`${API_URL}/${elem.art_img}`} alt="art_icon" className="art__icon" />
							{/* <img src={`${API_URL}/uploads/art3.svg`} alt="art_icon" className="art__icon" /> */}
							<div className="text">
								<h2 className='mb2'>{capitalizeFirstLetter(elem.art_title)}</h2>
								<div className="art_text">
								<ReactQuill
									value={elem.art_text.split(' ').length > 100
									? elem.art_text
											.split(' ')
											.slice(0, maxCountToDisplayWords)
											.join(' ') + '...'
									: elem.art_text}
									readOnly={true}
									theme={"bubble"}
								/>
								</div>
							</div>
							
						</Link>
						<button onClick={() => handleDeleteItem(elem)}><DeleteIcon/></button>
					</div>
					
				))}
				</div>
			</div>
		</div>
	)
}

export default Blog
