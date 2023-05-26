import React from 'react'
import { Link} from 'react-router-dom';


function NotFound() {
	return (
		<div className='container'>
			<div className="d-flex f-column aic jcc mt6">
				<h1>404</h1>
				<h2>Page not found</h2>
				<button className='btn_main mt2'><Link to="/">return to main page</Link></button>
			</div>
			
		</div>
	)
}

export default NotFound
