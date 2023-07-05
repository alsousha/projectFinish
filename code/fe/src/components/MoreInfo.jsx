import React, {useState} from 'react'
import { ReactComponent as InfoIcon } from '../assets/img/info.svg';


function MoreInfo({text}) {
	const [showTaskText, setShowTaskText] = useState(false); 
	const handleToggleShowInfo = () => {
		// setShowMoreInfo(prev => !prev);  
		setShowTaskText(prev => !prev);  
	};
	return (
		<div>
			<div className="info__wrap">
				<button className="task__info d-flex aic" onClick={handleToggleShowInfo}>
					<InfoIcon/>
				</button>
				{showTaskText&& (
					<div className="info__inner">
						{text}
					</div>
					
				)}
			</div>
			
			
		</div>
	)
}

export default MoreInfo
