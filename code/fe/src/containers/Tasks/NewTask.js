import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';

import '../containers.scss';
import Loading from '../../components/Loading.jsx';
import NotFound from '../../pages/404.jsx';
import { API_URL } from '../../constans.js';

import { ReactComponent as BackIcon } from '../../assets/img/back.svg';
import TemplateSequence from '../Templates/TemplateSequence';
import TemplateMatch from '../Templates/TemplateMatch';

function NewTask() {
  //#region
  const { currentUser } = useContext(AuthContext);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [levels, setLevels] = useState('');
  const [weights, setWeight] = useState('');
  const [templates, setTemplates] = useState([]); // Array of global templates
  const [imagePreview, setImagePreview] = useState(null);

  const [selectedData, setSelectedData] = useState({
    newItemName: '',
    selectedSubject: '',
    selectedCategory: '',
    selectedTemplate: '',
    selectedFile: '',
    selectedLevel: '',
    selectedWeight: '',
    instruction: '',
  });

  //errors
  const [message, setMessage] = useState({}); //msg from DB
  const [errors, setErrors] = useState({}); //Validations
  //#endregion

  useEffect(() => {
    fetchSubjects().then((data) => setSubjects(data));

    const maxWeight = 10;
    const weightOptions = [];
    for (let i = 1; i <= maxWeight; i++) {
      weightOptions.push(i);
    }
    setWeight(weightOptions);
    setSelectedData((prevData) => ({
      ...prevData,
      selectedWeight: weightOptions[0],
    }));

    const maxLevel = 12;
    const levelOptions = [];
    for (let i = 1; i <= maxLevel; i++) {
      levelOptions.push(i);
    }
    setLevels(levelOptions);
    setSelectedData((prevData) => ({
      ...prevData,
      selectedLevel: levelOptions[0],
    }));
  }, []);

  useEffect(() => {
    // Fetch categories based on the selected subject from the server and set the categories state
    if (selectedData.selectedSubject) {
      fetchCategories().then((data) => setCategories(data));
    } else {
      setCategories([]);
    }
  }, [selectedData.selectedSubject]);

  useEffect(() => {
    // Fetch templates based on the selected subject from the server and set the categories state
    if (selectedData.selectedCategory) {
      fetchTemplates().then((data) => {
        setTemplates(data);
        // setSelectedTemplate(data[0].id_template); //set by default first template as selected
      });
    } else {
      setTemplates([]);
    }
  }, [selectedData.selectedCategory]);

  if (currentUser.role !== 'teacher') {
    return <NotFound />;
  }
  //#region fetch
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`/teacher/sbjs/${currentUser.id_user}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects', error);
      throw error;
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/teacher/catsbysubject/${selectedData.selectedSubject}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories', error);
      throw error;
    }
  };
  const fetchTemplates = async () => {
    try {
      const response = await axios.get(`/teacher/templates`);
      return response.data;
    } catch (error) {
      console.error('Error fetching templates', error);
      throw error;
    }
  };
  //#endregion
  //#region handles
  const handleSubjectChange = (event) => {
    setSelectedData((prevData) => ({
      ...prevData,
      selectedSubject: event.target.value,
      selectedCategory: '',
    }));
  };
  const handleCategoryChange = (event) => {
    setSelectedData((prevData) => ({
      ...prevData,
      selectedCategory: event.target.value,
    }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const msg = {
      msgClass: '',
      text: '',
    };
    setMessage(msg);

    // Check if a valid file is selected
    if (!file || !file.type.startsWith('image/')) {
      msg.msgClass = 'error';
      msg.text = 'Incorrect type of image file.';
      setMessage(msg);
      return;
    }

    setSelectedData((prevData) => ({
      ...prevData,
      selectedFile: event.target.files[0],
    }));

    // Create a file reader for thumb
    const reader = new FileReader();
    // Set up the file reader onload event
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    // Read the image file as a data URL
    reader.readAsDataURL(file);
  };
  const handleTemplateChange = (event) => {
    setSelectedData((prevData) => ({
      ...prevData,
      selectedTemplate: event.target.value,
    }));
  };
  const handleNameChange = (event) => {
    setSelectedData((prevData) => ({
      ...prevData,
      // selectedLevel: event.target.value,
      newItemName: event.target.value,
    }));
  };
  const handleLevelChange = (event) => {
    setSelectedData((prevData) => ({
      ...prevData,
      selectedLevel: event.target.value,
    }));
  };
  const handleWeightChange = (event) => {
    setSelectedData((prevData) => ({
      ...prevData,
      selectedWeight: event.target.value,
    }));
  };
  const handleInstructionChange = (val) => {
    // console.log(val);
    setSelectedData((prevData) => ({
      ...prevData,
      instruction: val,
    }));
  };
  const handleMessageChange = (newMessage) => {
    setMessage(newMessage);
  };

  //#endregion
  return (
    <div className='d-flex '>
      <div className='container '>
        <h2 className='center mt4'>New Task</h2>
        <div className='control d-flex jce g1 mt2'>
          <div className='back btn_main'>
            <Link className='d-flex aic g1' to='/teacher/tasks'>
              <BackIcon />
              <span>Go Back</span>
            </Link>
          </div>
        </div>
        <div className='msg_block'>
          {message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
        </div>
        <div className='task_data'>
          <div className='task_data-item'>
            {/* taskname */}
            <div className='task_data-item w50'>
              <span className='label'>Task's name:</span>
              <input
                type='text'
                name='name'
                value={selectedData.newItemName}
                ref={inputRef}
                onChange={handleNameChange}
              />
              {errors.add_item && <span className='input_error mp2'>{errors.add_item}</span>}
            </div>
          </div>
          <div className='task_data-group d-flex g1 jcsb'>
            {/* subjects */}
            <div className='task_data-item w50'>
              <span className='label'>Subject:</span>
              <select value={selectedData.selectedSubject} onChange={handleSubjectChange}>
                <option value=''>Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id_subject} value={subject.id_subject}>
                    {subject.subject_name}
                  </option>
                ))}
              </select>
            </div>
            {/* categories */}
            {selectedData.selectedSubject && categories && (
              <div className='task_data-item w50'>
                <span className='label'>Category:</span>
                <select value={selectedData.selectedCategory} onChange={handleCategoryChange}>
                  <option value=''>Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id_category} value={cat.id_category}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {/* instruction */}
          {selectedData.selectedCategory && (
            <div className='task_data-item'>
              <span className='label'>Instruction:</span>
              {/* <textarea
                  value={selectedData.instruction}
                  onChange={(e) => handleInstructionChange(e.target.value)}
                /> */}
              <div className='editorContainer'>
                <ReactQuill
                  theme='snow'
                  value={selectedData.instruction}
                  onChange={(e) => handleInstructionChange(e)}
                />
              </div>
            </div>
          )}
          <div className='task_data-group d-flex '>
            {selectedData.selectedCategory && (
              <div className='task_data-item'>
                <span className='label'>Task's image:</span>
                <input type='file' onChange={handleFileChange} />
                <div className='task__thumb w20'>
                  {selectedData.selectedFile && <img src={imagePreview} alt='Image Preview' />}
                </div>
              </div>
            )}
          </div>
          <div className='task_data-group d-flex '>
            {/* weight */}
            {selectedData.selectedCategory && weights && (
              <div className='task_data-item w50'>
                <span className='label'>Weight of task:</span>
                <select value={selectedData.selectedWeight} onChange={handleWeightChange}>
                  {weights.map((weight) => (
                    <option key={'weight' + weight} value={weight}>
                      {weight}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* level */}
            {selectedData.selectedCategory && levels && (
              <div className='task_data-item w50'>
                <span className='label'>Level of task:</span>
                <select value={selectedData.selectedLevel} onChange={handleLevelChange}>
                  {levels.map((level) => (
                    <option key={'weight' + level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {/* templates */}
          {selectedData.selectedCategory && templates && (
            <div className=''>
              <div className='task_data-item'>
                <span className='label'>Templates:</span>
                {templates.map((temp) => (
                  <label key={'temp' + temp.id_template} className='label_img'>
                    <div className='top'>
                      <input
                        type='radio'
                        value={temp.id_template}
                        checked={selectedData.selectedTemplate == temp.id_template}
                        onChange={handleTemplateChange}
                      />
                      {temp.template_name}
                    </div>
                    <img
                      src={require(`../../assets/img/${temp.template_img}`)}
                      alt='template_img'
                      className={
                        selectedData.selectedTemplate == temp.id_template ? 'active' : 'no-active'
                      }
                    />
                  </label>
                ))}
                {/* <span>See example</span> */}
              </div>
              <div className='task-inner mt3'>
                {selectedData.selectedTemplate - 1 === 0 && (
                  <TemplateSequence
                    generalTaskData={selectedData}
                    handleMessage={setMessage}
                    setSelectedData={setSelectedData}
                  />
                )}
                {selectedData.selectedTemplate - 1 === 1 && <TemplateMatch />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewTask;
