<div className="main">
			<h2>Filter Tasks</h2>
			{subjects && subjects.length>1 && (
				<div>
					<h3>Subjects</h3>
					<label>
						<input
							type="checkbox"
							checked={selectedSubjects.includes('all')}
							onChange={() => handleSubjectsChange('all')}
						/>
						All
					</label>
					{subjects.map(subject => (
						<label key={"sbj"+subject.id_subject}>
							<input
								type="checkbox"
								checked={selectedSubjects.includes(subject.id_subject)}
								onChange={() => handleSubjectsChange(subject)}
							/>
							{subject.subject_name}
						</label>
					))}
				</div>
			)}
        

      <div>
        <h3>Categories</h3>
				<label>
          <input
            type="checkbox"
            checked={selectedCategories.includes('all')}
            onChange={() => handleCategoryChange('all')}
          />
          All
        </label>
        {categories.map(category => (
          <label key={"cat"+category.id_category}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id_category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category.category_name}
          </label>
        ))}
      </div>
			<div>
        <h3>Templates</h3>
				<label>
          <input
            type="checkbox"
            checked={selectedTemplates.includes('all')}
            onChange={() => handleTemplateChange('all')}
          />
          All
        </label>
        {templates.map(template => (
          <label key={"temp"+template.id_template}>
            <input
              type="checkbox"
              checked={selectedTemplates.includes(template.id_template)}
              onChange={() => handleTemplateChange(template)}
            />
            {template.template_name}
          </label>
        ))}
      </div>
			<div>
			
			</div>
			<div>
        <h3>Levels</h3>
				<label>
          <input
            type="checkbox"
            checked={selectedLevels.includes('all')}
            onChange={() => handleLevelChange('all')}
          />
          All
        </label>
        {levels.map(level => (
					<label key={"lvl"+level}>
						<input
							type="checkbox"
							checked={selectedLevels.includes(level)}
							onChange={() => handleLevelChange(level)}
						/>
						{level}
					</label>
				))}
      </div>
			<div>
        <h3>Weight</h3>
				<label>
          <input
            type="checkbox"
            checked={selectedWeights.includes('all')}
            onChange={() => handleWeightChange('all')}
          />
          All
        </label>
        {weights.map(weight => (
					<label key={"weight"+weight}>
						<input
							type="checkbox"
							checked={selectedWeights.includes(weight)}
							onChange={() => handleWeightChange(weight)}
						/>
						{weight}
					</label>
				))}
      </div>


			<div className="arr__wrap">
				{filteredData && filteredData.map((elem, i) => (
					<div key={"task-"+i} className="arr_item">{elem.task_name}</div>	

				))}
			</div>
      {/* 
      <div>
        <h3>Task Weight</h3>
        {taskWeights.map(weight => (
          <label key={weight}>
            <input
              type="radio"
              checked={selectedTaskWeight === weight}
              onChange={() => handleTaskWeightChange(weight)}
            />
            {weight}
          </label>
        ))}
      </div>
      <h2>Tasks</h2>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul> */}
			</div>