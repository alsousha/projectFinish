import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [sbjs, setSbjs] = useState([]);
  const [inputs, setInputs] = useState({
    role: '',
    sbjs: [],
    class_level: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    img_url: 'avatar-2.svg',
  });
  // const [err, setError] = useState(null);
  const [visiableSbjInput, setVisiableSbjInput] = useState(false);
  const [visiableLevelInput, setVisiableLevelInput] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]); //has names of sbjs

  const [errors, setErrors] = useState({}); //Validations errors
  const [message, setMessage] = useState({}); //msg from DB

  //set sbjs from bd
  useEffect(() => {
    const fetchSbjs = async () => {
      try {
        const res = await axios.get('/sbjs/');
        setSbjs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSbjs();
  }, []);

  const maxLevel = 12; // Maximum level
  const lvlsElem = [];
  for (let i = 1; i <= maxLevel; i++) {
    lvlsElem.push(
      <option key={`level-${i}`} value={i}>
        {`Class ${i}`}
      </option>,
    );
  }

  const navigate = useNavigate();
  //manage checboxes of sbjs
  const handleSubjectChange = (e) => {
    const { value } = e.target;
    const updatedSelectedSubjects = [...selectedSubjects];

    if (updatedSelectedSubjects.includes(value)) {
      // Remove the subject from the selected subjects if it was unchecked
      const index = updatedSelectedSubjects.indexOf(value);
      updatedSelectedSubjects.splice(index, 1); //remove unchecked item from list (updatedSelectedSubjects)
    } else {
      // Add the subject to the selected subjects if it was checked
      updatedSelectedSubjects.push(value);
    }
    // console.log(updatedSelectedSubjects);

    setSelectedSubjects(updatedSelectedSubjects); //update selected sbjs
    inputs.sbjs = updatedSelectedSubjects;
  };
  const handleChange = async (e) => {
    // console.log(e.target.name);
    // console.log(e.target.options[2].name);
    if (e.target.name === 'role') {
      if (e.target.value === 'teacher') {
        setVisiableLevelInput(false);
        setVisiableSbjInput(true);
      } else {
        setVisiableLevelInput(true);
        setVisiableSbjInput(false);
      }
    }
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validateField();

    if (Object.keys(fieldErrors).length === 0) {
      // console.log(inputs);
      setErrors({});
      await axios
        .post('/auth/register', inputs)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res);
            console.log('Registration successful');
            setMessage({
              msgClass: 'success',
              message: res.data,
            });
            setTimeout(() => {
              setMessage('');
              navigate('/');
            }, 2000);
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            console.log('User already exists!');
            setMessage({
              msgClass: 'error',
              message: error.response.data,
            });
          } else {
            console.error('Error registering user:', error);
            setMessage({
              msgClass: 'error',
              message: error.response.data,
            });
          }
        });
      // console.log(message);
    } else {
      setErrors(fieldErrors);
      // setIsCurrentInputValid(false)
    }
    setErrors(fieldErrors);
  };

  const validateField = () => {
    const errors = {};
    const fieldNames = [
      'role',
      'sbjs',
      'class_level',
      'name',
      'email',
      'password',
      'confirmpassword',
    ];
    fieldNames.forEach((fieldName) => {
      const value = inputs[fieldName];
      // console.log(value);

      switch (fieldName) {
        case 'role':
          if (value.length === 0) {
            errors[fieldName] = 'Select at your role';
          }
          break;
        case 'sbjs':
          if (inputs['role'] === 'teacher' && selectedSubjects && selectedSubjects.length === 0) {
            errors[fieldName] = 'Select at least one subject';
          }
          break;
        case 'name':
          if (!value.trim()) {
            errors[fieldName] = 'Name is required';
          }
          break;
        case 'email':
          if (!value.trim()) {
            errors[fieldName] = 'Email is required';
          } else if (!isValidEmail(value)) {
            errors[fieldName] = 'Invalid email format';
          }
          break;
        case 'password':
          if (!value.trim()) {
            errors[fieldName] = 'Password is required';
          }
          break;
        case 'confirmpassword':
          if (!value.trim()) {
            errors[fieldName] = 'Confirm password is required';
          } else if (value !== inputs['password']) {
            errors[fieldName] = 'Passwords do not match';
          }

        default:
          break;
      }
    });

    return errors;
  };
  // Helper function to check email format using regular expression
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className='auth'>
      <h1 className='mb2'>Register</h1>
      <form action=''>
        <select id='mySelect' name='role' onChange={handleChange}>
          <option value=''>Select a role</option>
          <option value='teacher'>Teacher</option>
          <option value='student'>Student</option>
        </select>
        {errors.role && <span className='input_error'>{errors.role}</span>}

        {/* {visiableSbjInput && (
							<select id="sbjs" name="sbj" onChange={handleChange}>
								 {sbjs.map(option => (
										<option key={option.id_subject} value={option.id_subject}>
											{option.subject_name}
										</option>
									))}
									
							</select>
							
							)} */}
        {/* subjects for teacher */}
        <div className='d-flex g2 f-wrap'>
          {visiableSbjInput &&
            sbjs &&
            sbjs.map((subject) => (
              <div key={subject.id_subject}>
                <label>
                  <input
                    type='checkbox'
                    name='sbjs'
                    value={subject.subject_name}
                    checked={selectedSubjects.includes(subject.subject_name)}
                    onChange={handleSubjectChange}
                  />
                  {subject.subject_name}
                </label>
              </div>
            ))}
        </div>

        {errors.sbjs && <span className='input_error'>{errors.sbjs}</span>}

        {/* class lrevels for student */}
        {visiableLevelInput && (
          <select id='lvls' name='class_level' onChange={handleChange}>
            {lvlsElem}
          </select>
        )}

        <input type='text' placeholder='Name:' name='name' onChange={handleChange} />
        {errors.name && <span className='input_error'>{errors.name}</span>}

        <input type='text' placeholder='Lastname:' name='lastname' onChange={handleChange} />

        <input type='email' placeholder='Email:' name='email' onChange={handleChange} />
        {errors.email && <span className='input_error'>{errors.email}</span>}

        <input type='password' placeholder='Password:' name='password' onChange={handleChange} />
        {errors.password && <span className='input_error'>{errors.password}</span>}

        <input
          type='password'
          placeholder='Confirm password:'
          name='confirmpassword'
          onChange={handleChange}
        />
        {errors.confirmpassword && <span className='input_error'>{errors.confirmpassword}</span>}

        <button onClick={handleSubmit} className='btn_accent hover-scale'>
          Register
        </button>
        <div className='mt2'>
          {message && <span className={message.msgClass}>{message.message}</span>}
        </div>
        <div className='mt2 hover-line dark'>
          <span>Do you have an account?</span>&emsp;
          <span className='italic'>
            <Link to='/'>Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
