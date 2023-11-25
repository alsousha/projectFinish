import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const ContactForm = ({ handlePopupClose }) => {
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    text: '',
  });
  const [err, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      email: currentUser.email,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendContactForm(formData);
    handlePopupClose();
  };
  const sendContactForm = async (data) => {
    try {
      const response = await axios.post('/users/send-email', data);

      console.log(response.data);
    } catch (error) {
      console.error('Error sending contact form:', error);
    }
  };

  //   const sendEmail = async (data) => {
  //     try {
  //       // Use fetch or axios to send data to  server
  //       try {
  //         const res = await axios.post(`/users/send-email`, { body: JSON.stringify(data) });
  //         if (res.status === 200) {
  //           // setIsFormVisiable(false)

  //           setError('');
  //         } else if (res.status === 204) {
  //           setError('User not found.');
  //         }
  //       } catch (err) {
  //         setError(err.response.data);
  //       }
  //       // const response = await fetch('/users/send-email', {
  //       //   method: 'POST',
  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //   },
  //       //   body: JSON.stringify(data),
  //       // });

  //       // Handle the response if needed
  //       // const result = await res.json();
  //       // console.log(result);
  //     } catch (error) {
  //       console.error('Error sending email:', error);
  //     }
  //   };

  return (
    <div className='popup popup-small'>
      <button className='btn__close popup__btn-close' onClick={handlePopupClose}></button>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Contact us</h2>
          <div className='d-flex g1'>
            <img src={`${API_URL}/uploads/e1.svg`} alt='sbj_icon' className='sbj__icon' />
            <span>Team of FunnyApp</span>
          </div>
          <p>Hi! Please write your message</p>
          <label>Title:</label>
          <input type='text' name='title' value={formData.title} onChange={handleChange} />
        </div>

        <div>
          <label>Text:</label>
          <textarea name='text' value={formData.text} onChange={handleChange}></textarea>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
