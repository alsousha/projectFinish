import React, { useState, useEffect, useContext } from 'react';
import { API_URL } from '../constans';
import { AuthContext } from '../context/authContext';

import { ReactComponent as PointIcon } from '../assets/img/points.svg';

import axios from 'axios';

function CertificationsView({ role, setActiveBgColor, id_user }) {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [studentCertif, setStudentCertif] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [isFormVisiable, setIsFormVisiable] = useState(false);
  const [message, setMessage] = useState({}); //msg from DB

  //   console.log(id_user);
  const fetchData = async () => {
    try {
      const res = await axios.get(`/users/certificates`);
      console.log(res.data);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchStudentCertif = async () => {
    try {
      const res = await axios.get(`/student/certificates/${id_user}`);
      // console.log(res.data);
      setStudentCertif(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(); //fetch categories
    if (role === 'student') fetchStudentCertif(); //fetch student's certifs
  }, []);
  useEffect(() => {
    if (!selectedCategory && categories && categories.length > 0) {
      // If no category is selected and there are categories, set the first one as selected
      setSelectedCategory(categories[0]);
      setActiveBgColor(categories[0].certif_bg_color);
    } else if (selectedCategory) {
      setActiveBgColor(selectedCategory.certif_bg_color);
    }
  }, [selectedCategory, setActiveBgColor, categories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleGetCertifItem = (img_id, certif_point) => {
    //  console.log(certif_point);
    //  console.log(currentUser.points);
    if (currentUser.points >= certif_point) {
      getCertifItem(img_id, certif_point);
    } else {
      setIsFormVisiable(true);
    }
  };

  const handlePopupClose = () => {
    setIsFormVisiable(false);
  };
  //axios for DB
  const getCertifItem = async (img_id, certif_point) => {
    // const id_user = currentUser.id_user;

    axios
      .put(`/student/incpoints/${id_user}`, { certif_point: certif_point })

      .then((res) => {
        const tmpUserData = (prevUserData) => ({
          ...prevUserData,
          points: prevUserData.points - certif_point,
        });
        updateUser(tmpUserData); //update localstorage and context
        axios
          .put(`/student/putcertifcard/${id_user}`, { img_id: img_id })

          .then((res) => {
            fetchStudentCertif();
            setIsOpen((prevIsOpen) => ({ ...prevIsOpen, [img_id]: true })); // addEffect();
            setTimeout(() => {
              setIsOpen((prevIsOpen) => ({ ...prevIsOpen, [img_id]: false }));
            }, 1000);
          })
          .catch((error) => {
            console.error('Error add item', error);
          });
      })
      .catch((error) => {
        console.error('Error add item', error);
      });
  };

  return (
    <div className='container c16'>
      <div className='msg_block'>
        {message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
      </div>
      <div className='tabs d-flex jce g2 f-grow pt2'>
        {categories &&
          categories.map((category) => (
            <div
              key={`tabCat-${category.id_certif}`}
              className={
                selectedCategory && selectedCategory.id_certif === category.id_certif
                  ? 'active'
                  : ''
              }>
              {/* Display the icon */}
              <div className='tabs d-flex g1'>
                <button>
                  <img
                    src={`${API_URL}/uploads/${category.certif_img_sm}`}
                    alt={category.certif_name}
                    onClick={() => handleCategoryClick(category)}
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className='pb3'>
        {/* Map through the categories array to display icons */}

        {categories &&
          categories.map((category) => (
            <div key={`catArr-${category.id_certif}`} className='mt2'>
              {/* Show additional data when the category is selected */}
              {selectedCategory && selectedCategory.id_certif === category.id_certif && (
                <div className='certifIview d-flex g3'>
                  <div className='certif_big_img w30'>
                    <img
                      src={`${API_URL}/uploads/${category.certif_img_lg}`}
                      alt={category.certif_name}
                      onClick={() => handleCategoryClick(category)}
                    />
                  </div>
                  <div className='certif_elems w70'>
                    <span className='hwhite'>{category.certif_name}</span>
                    {category.certif_imgs_group && (
                      <div className='d-flex f-wrap g1'>
                        {JSON.parse(category.certif_imgs_group).map((img, index) => (
                          <div
                            className='img-prev hover_up'
                            key={`category.certif_imgs_group-${index}`}>
                            {role === 'admin' ? (
                              // Show all images without blocked image for admin
                              <img
                                src={`${API_URL}/${img.path}`}
                                alt={`Image ${index + 1}`}
                                className=''
                                style={{ width: '100px' }}
                              />
                            ) : (
                              // Show images with or without blocked image for non-admin
                              <React.Fragment>
                                {studentCertif.some(
                                  (item) => item.id_certif_item === img.img_id,
                                ) ? (
                                  <img
                                    src={`${API_URL}/${img.path}`}
                                    alt={`Image ${index + 1}`}
                                    className={`certif-img ${isOpen[img.img_id] ? 'open' : ''}`}
                                    style={{ width: '100px' }}
                                  />
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleGetCertifItem(
                                        img.img_id,
                                        category.certif_point,
                                        setIsOpen,
                                      )
                                    }>
                                    {' '}
                                    <img
                                      src={`${API_URL}/uploads/block.svg`}
                                      alt={`Blocked Image ${index + 1}`}
                                      className=''
                                      style={{ width: '100px', backgroundColor: '#ffe560' }}
                                    />
                                  </button>
                                )}
                              </React.Fragment>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
      {isFormVisiable && (
        <div className='popup_content overlay'>
          <div className='popup popup-small'>
            <button className='btn__close popup__btn-close' onClick={handlePopupClose}></button>
            <div className=''>
              <div className='popup_img'>
                <PointIcon />
              </div>
              <p>
                Oops! You are missing <b>points</b>. Complete tasks to get more points for purchases
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificationsView;
