{catsFormat && catsFormat.map((arr, i) => (
	<div className="subject_section" key={i++}>
		<div className="subject_name mt5"><h3>{arr[0].subject_name}</h3></div>
		
		{arr.map((item) => (
			<div key={item.id_category} className="">
				<div  className="table_item d-flex jcs g2 aic mb2">
					{editingItemId === item.id_category ? (
						<div className="">
							<input
								type="text"
								name="cat_name"
								value={editedText}
								ref={inputRef}
								onChange={handleInputChange}
							/>
							{/* {currentUser.sbjs.length>1 && (
								<select id="sbjs" name="sbj_cat" onChange={handleSelectChange} defaultValue={currentUser.sbjs[i]}>
									{currentUser.sbjs && currentUser.sbjs.map((elem, j)=>(
										<option key={`sbj-${j}`} value={elem}>
											{elem}{j}{i}
										</option>
									))}
								</select>
								)}
							{errors.cat_name && <span className='input_error'>{errors.cat_name}</span>} */}
						</div>
						
					) : (
						<div className="item_title">
							<span className='editUserInfo_field'>{item.category_name}</span>
						</div>
					)}
				
					<div className="cat_edit table_icon">
						{editingItemId === item.id_category ? (
							<button onClick={() => handleSave(item.id_category)} className=''>
								<SaveIcon/>
							</button>
							
						) : (
							<button onClick={() => handleEdit(item.id_category,  item.category_name)} className=''>
								<EditIcon className=""/>
							</button>
						)}
					</div>
					<div className="class_delete table_icon">
						<button  onClick={() => handleDelete(item.id_category)}><DeleteIcon/></button>
					</div>
				</div>
			</div>
		))}
	</div>
))}