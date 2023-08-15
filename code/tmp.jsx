<table>
<thead>
	<tr>
		<th>Student</th>
		
		{classData.map((folderData, index) => (
			<th key={index}>
				<div>
					<p>Folder: {folderData.folder.tskFolder_name}</p>
					{folderData.tasks && Array.isArray(folderData.tasks) && (
						<ul className="d-flex g1">
							{folderData.tasks.map((task) => (
								<li key={task.id_task + "tasktitle"}>
									{/* <p>Task: {task.task_name}</p> */}
									<p>{task.task_name}</p>
									<p>{calculateTaskCompletion(task.id_task)}</p>
								</li>
							))}
						</ul>
					)}
				</div>
			</th>
		))}
	</tr>
</thead>
<tbody>
	{studentsByClass.map((student) => (
		<tr key={student.id_user}>
			<td>{student.name} {student.lastname}</td>
			{classData.map((folderData, index) => {
				return (
					<td key={index + "classData" + student.id_user}>
						<ul>
							{folderData.tasks &&
								Array.isArray(folderData.tasks) && (
									<li>
										{/* <p>Folder: {folderData.folder.tskFolder_name}</p> */}
										<ul className='d-flex g1'>
											{folderData.tasks.map((task) => {
												
												const taskStatusEntry = taskStatusData.find(
													(entry) =>
														entry.id_task === task.id_task &&
														entry.id_user === student.id_user
												);

												const isTaskDone = taskStatusEntry ? taskStatusEntry.is_task_done : false;
												return (
													<li key={task.id_task + "taskStatus" + student.id_user}>
														<p>{isTaskDone ? "V" : "-"}</p>
													</li>
												);
											})}
										</ul>
									</li>
								)}
						</ul>
					</td>
				);
			})}
		</tr>
	))}
</tbody>
</table>