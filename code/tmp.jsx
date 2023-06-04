			
			// <div className="userInfo__item d-flex aic">
			// 	<span className='userLabel label'>Email:</span>
			// 	<div className="popup_input change_input w25r d-flex aic">
			// 		<div className='popup_field'>
			// 			<span>{userData.email}</span>
			// 		</div>
			// 	</div>
			// </div>
			// {/* sbjs's checkbox for teacher */}
			// {userData.role==="teacher" && (
			// <div className="userInfo__item d-flex aic">
			// 	<span className='userLabel label'>Subjects:</span>
			// 	<div className="user_sbjs d-flex f-column">
			// 		{editingFields.sbjs ? ( 
			// 			<div className='popup_field'>
			// 				{sbjs && sbjs.map(subject => (
			// 					<div key={subject.id_subject}>
			// 						<label>
			// 							<input
			// 								type="checkbox"
			// 								name="sbjs"
			// 								value={subject.subject_name}
			// 								checked={selectedSubjects.includes(subject.subject_name)}
			// 								onChange={handleSubjectChange}
			// 							/>
			// 							{subject.subject_name}
			// 						</label>
			// 					</div>
			// 				))}

			// 				{errors.sbjs && <span className='input_error'>{errors.sbjs}</span>}
			// 			</div>
			// 		) : (
			// 			userData.sbjs_id && userData.sbjs_id.map(item => (
			// 				<div key={item}>
			// 					{item}
			// 				</div>
			// 			))
			// 		)}
			// 	</div>
				
			// 		{editingFields.sbjs ? (
			// 		<button onClick={() => handleSave('sbjs')}>
			// 			<img src={saveSvg} alt="save img" />
			// 		</button>
			// 	) : (
			// 		<button onClick={() => handleEdit('sbjs')}>
			// 			<img src={editSvg} alt="" />
			// 		</button>
			// 	)}



				
			// 	{/* <span className='userLabel label'>Subjects:</span>
			// 	<div className="popup_input change_input w25r d-flex aic">
			// 		{sbjs && sbjs.map(item => (
			// 			<label key={item.subject_name}>
			// 				<input type="checkbox" name={item.subject_name} />
			// 				{item.subject_name}
			// 			</label>
						
			// 		))}
				
					
			// 	</div> */}

			// 	{/* 
				
			// 	!!! Use it for student!!
				
			// 	<div className="popup_input change_input w25r d-flex aic">
			// 		<select id="sbjs" name="sbj" onChange={handleChange}>
			// 			<option key="0" value='0'>no subject</option>
			// 			{sbjs && sbjs.map(option => (
							
			// 				<option key={option.id_subject} value={option.id_subject}>
			// 					{option.subject_name}
			// 				</option>
			// 			))}
			// 		</select>
			// 	</div> */}
			// </div>
			// )}		
			// <div className="delete_user">
			// 	<button onClick={handleDelete}>Delete this account</button>
			// </div>
			// <div className="mt5">
			// 	{message && <span className={message.msgClass}>{message.message}</span>}
			// </div>