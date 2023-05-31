<form action='' className='editUserInfo popup' onSubmit={updateUserInfo}>
		<button className='btnClose hover-scale' onClick={handleEditFormHide}>
			<CancelTwoToneIcon />
		</button>
		<div className="editUserInfo__wrap d-flex jcsb">
			<div className="editUserInfo__left w55">
				<h2>Edit user: {currentUser.name}</h2>
				<div className="userInfo">
					<div className="userInfo__item d-flex">
						<span className='userLabel label'>Lastname:</span>
						<div className="change_input w25r d-flex">
							<input 
								ref={lastnameInput}
								className={isActiveInputLastname? 'active change_input ': 'change_input '}
								placeholder="Enter name"
								style={inputStyleInputLastname}
								readOnly={isReadonlyInputLastname}
								value={inputLastnameValue} 
								// onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
								onChange={e => setInputLastnameValue(e.target.value)} 
							/>
							<div className={isActiveInputName? 'input__btn active': 'input__btn '} >
								<img 
									src={editIconInputLastname} 
									alt="edit icon"
									onClick={editUserLastname}
								/>							
							</div>
						</div>
					</div>
					<div className="userInfo__item d-flex">
						<span className='userLabel label'>Name:</span>
						<div className="change_input w25r d-flex">
							<input 
								ref={nameInput}
								className={isActiveInputName? 'active change_input ': 'change_input '}
								placeholder="Enter name"
								style={inputStyleInputName}
								readOnly={isReadonlyInputName}
								value={inputNameValue} 
								// onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
								onChange={e => setInputNameValue(e.target.value)} 
							/>
							<div className={isActiveInputName? 'input__btn active': 'input__btn '} >
								<img 
									src={editIconInputName} 
									alt="edit icon"
									onClick={editUserName}
								/>							
							</div>
						</div>
					</div>
					{currentUser.role === "teacher" ? (
						<div className="userInfo__item d-flex">
							<span className='userLabel label'>Subject:</span>
							<span className='label'>{currentUser.sbj}</span>
						</div>
					)
						: (<div></div>)
					}
					
				</div>
			</div>
			<div className="editUserInfo__right w40">
				{/* <img src={currentUser.userImgLink} alt="user Image" className='userImg' /> */}
				<span>Change your avatar</span>
			</div>
		</div>
		<div className="form__bottom d-flex jcsb">
			<input type="submit" />
			<span onClick={deleteUser}>sdf
				{/* <Link className="link" to="/">Delete account</Link> */}
			</span> 

			{/* <button>Delete account</button> */}
		</div>
		

		
	</form>