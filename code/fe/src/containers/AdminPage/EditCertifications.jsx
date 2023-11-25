//Manage certifications page by admin
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { API_URL } from '../../constans';
import { ReactComponent as AddIcon } from '../../assets/img/add.svg';
import { ReactComponent as EditIcon } from '../../assets/img/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/delete2.svg';
import { ReactComponent as BackIcon } from '../../assets/img/back.svg';

import ImagePreview from './ImagePreview';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const EditCertifications = ({ handleEditMode }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [previewImages, setPreviewImages] = useState([]);

  const [catId, setCatId] = useState('');
  const [catName, setCatName] = useState('');
  const [catImgSm, setCatImgSm] = useState(null);
  const [catImgLg, setCatImgLg] = useState(null);
  const [imagePreviewSm, setImagePreviewSm] = useState('');
  const [imagePreviewLg, setImagePreviewLg] = useState('');
  const [inputKeys, setInputKeys] = useState({ catImgSm: 0, catImgLg: 0, cardImgs: 0 });

  const [catImgs, setCatImgs] = useState([]); // Array to store card images
  const [catFiles, setCatFiles] = useState([]); // Array to store card images in File format

  const [itemPoints, setItemPoints] = useState('1');
  const [catColor, setCatColor] = useState('#9dc6af');
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isFormVisiable, setIsFormVisiable] = useState(false);

  const [editedCategoryIndex, setEditedCategoryIndex] = useState(null);

  const [message, setMessage] = useState({}); //msg from DB

  //fetch certifs
  const fetchData = async () => {
    try {
      const res = await axios.get(`/users/certificates`);
      // console.log(res.data);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log('catImgs');
    console.log(catImgs);
    //  const previewImages = () => {
    //    const previewContainer = document.getElementById('preview-container');
    //    console.log(previewContainer);
    //    if (!previewContainer) {
    //      return;
    //    }

    //    previewContainer.innerHTML = '';

    //    catImgs.forEach((img) => {
    //      console.log(img);
    //      const reader = new FileReader();
    //      reader.onload = (e) => {
    //        const imgElement = document.createElement('img');
    //        imgElement.src = e.target.result;
    //        imgElement.alt = 'Preview';
    //        imgElement.style.width = '100px';
    //        imgElement.style.marginRight = '10px';
    //        previewContainer.appendChild(imgElement);
    //      };
    //      reader.readAsDataURL(img);
    //    });
    //  };

    //  previewImages();
  }, [catImgs]);
  useEffect(() => {
    if (editMode && editedCategoryIndex !== null) {
      // Populate image previews with the currently selected category's images.
      const selectedCategory = categories[editedCategoryIndex];
      setCatId(selectedCategory.id_certif);
      console.log(selectedCategory);
      // console.log(selectedCategory.id_certif);

      if (selectedCategory) {
        // Display the small image
        if (selectedCategory.certif_img_sm) {
          setImagePreviewSm(`${API_URL}/uploads/${selectedCategory.certif_img_sm}`);
        } else {
          setImagePreviewSm('');
        }

        // Display the large image
        if (selectedCategory.certif_img_lg) {
          setImagePreviewLg(`${API_URL}/uploads/${selectedCategory.certif_img_lg}`);
        } else {
          setImagePreviewLg('');
        }

        // Display the group of images
        if (selectedCategory.certif_imgs_group) {
          console.log('use2');
          const imgGroup = JSON.parse(selectedCategory.certif_imgs_group);
          setPreviewImages(imgGroup.map((img) => `${API_URL}/uploads/${img.path}`));
        } else {
          setPreviewImages([]);
        }
      }
    }
  }, [editMode, editedCategoryIndex, categories]);

  const removeFile = (index) => {
    console.log('remove');
    console.log(catFiles);
    const updatedCatImgs = [...catImgs];
    updatedCatImgs.splice(index, 1); //array without deleted img
    const updatedCatImgsFiles = [...catFiles];
    //  console.log(updatedCatImgsFiles);

    updatedCatImgsFiles.splice(index, 1); //array without deleted img

    setCatImgs(updatedCatImgs);
    setCatFiles(updatedCatImgsFiles);
  };

  const resetFields = () => {
    setCatName('');
    setImagePreviewSm('');
    setImagePreviewLg('');
    setCatImgSm('');
    setCatImgLg('');

    setCatImgs([]);
    setItemPoints('');
    setCatColor('#9dc6af');
  };
  const addOrUpdateCategory = () => {
    console.log('add or update');
    //  console.log(catImgs);
    const newCategoryItem = {
      catName,
      catImgSm,
      catImgLg,
      catImgs,
      itemPoints,
      catColor,
    };
    //  console.log(newCategoryItem);
    const msgValidation = validateField(newCategoryItem); //check inputs
    if (msgValidation.msgClass === 'error') {
      setMessage(msgValidation);
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } else {
      if (editMode) {
        //   console.log('ssss');
        //   const updatedCategories = [...categories];
        //   updatedCategories[editedCategoryIndex] = newCategoryItem;
        //   setCategories(updatedCategories);
        editCategory(newCategoryItem);
        setEditMode(false);
        setEditedCategoryIndex(null);
      } else {
        //   setCategories((prevCategories) => [...prevCategories, newCategoryItem]);
        // handleSaveData(newCategoryItem);
        createCategory(newCategoryItem);
      }
      resetFields();

      //edit cat

      // setTimeout(() => {
      //   // setMessage('');
      //   navigate('/admin/certifications');
      // }, 2000);
    }
  };

  const putDataToForm = (index) => {
    console.log('put');
    setIsFormVisiable(true);

    //put data to form for update certif
    const selectedCategory = categories[index];
    //  console.log(selectedCategory);
    //  console.log(JSON.parse(selectedCategory.certif_imgs_group));
    setCatName(selectedCategory.certif_name);
    setCatImgSm(selectedCategory.certif_img_sm);
    setCatImgLg(selectedCategory.certif_img_lg);
    setCatImgs(JSON.parse(selectedCategory.certif_imgs_group));
    setItemPoints(selectedCategory.certif_point);
    setCatColor(selectedCategory.certif_bg_color);
    setEditMode(true);
    setEditedCategoryIndex(index);
  };

  const handleFileChange = (e, fieldName) => {
    const files = e.target.files;

    if (fieldName === 'catImgSm') {
      setCatImgSm(files[0]);
      setImagePreviewSm(URL.createObjectURL(files[0]));
    } else if (fieldName === 'catImgLg') {
      setCatImgLg(files[0]);
      setImagePreviewLg(URL.createObjectURL(files[0]));
    } else if (fieldName === 'cardImgs') {
      console.log('handleFileChange');
      console.log('catImgs');
      console.log(catImgs);
      setCatFiles(files);
      // Create an array of plain objects representing the files
      const newImages = [...catImgs];

      for (const file of files) {
        // Generate a unique img_id using uuid
        const img_id = uuidv4();
        newImages.push({
          //  img_id: img_id,
          fieldname: fieldName,
          originalname: file.name,
          encoding: file.encoding,
          mimetype: file.type,
          destination: 'uploads/',
          filename: file.name,
          path: URL.createObjectURL(file),
          size: file.size,
        });
      }
      // console.log(newImages);
      console.log(newImages);
      // Update catImgs with the new array of plain objects
      setCatImgs(newImages);
    }

    // Increment the counter based on the fieldType
    setInputKeys((prevKeys) => ({
      ...prevKeys,
      [fieldName]: prevKeys[fieldName] + 1,
    }));
  };
  const handleDeleteCategory = (index) => {
    if (window.confirm('Are you sure delete this certificate?')) {
      deleteCategory(index);
    }
  };
  const handlePopupOpen = (classId) => {
    setIsFormVisiable(true);
  };
  const handlePopupClose = () => {
    setIsFormVisiable(false);
  };
  const validateField = (categoryItemForSave) => {
    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];

    const msg = {
      msgClass: '',
      text: '',
    };
    const checkFileFormat = (file, fieldName) => {
      if (!file || file === '') {
        msg.msgClass = 'error';
        msg.text = `${fieldName} is required`;
        return false;
      } else if (!allowedFormats.includes(file.type)) {
        msg.msgClass = 'error';
        msg.text = `Incorrect type of ${fieldName} file`;
        return false;
      }
      return true;
    };

    if (categoryItemForSave.catName === '') {
      msg.msgClass = 'error';
      msg.text = "Certificate's name is required";
    } else if (
      typeof categoryItemForSave.catImgSm !== 'string' &&
      !checkFileFormat(categoryItemForSave.catImgSm, 'Certificate Icon')
    ) {
      // Check catImgSm format
    } else if (
      typeof categoryItemForSave.catImgLg !== 'string' &&
      !checkFileFormat(categoryItemForSave.catImgLg, 'Certificate Image')
    ) {
      // Check catImgLg format
    } else if (
      typeof categoryItemForSave.catImgs !== 'string' &&
      (!categoryItemForSave.catImgs || categoryItemForSave.catImgs.length === 0)
    ) {
      msg.msgClass = 'error';
      msg.text = 'Certificate images are required';
    } else {
      console.log('categoryItemForSave');
      console.log(categoryItemForSave);
      if (typeof categoryItemForSave.catImgs !== 'string') {
        // Check allowed file formats for each image in catImgs
        const invalidFormats = categoryItemForSave.catImgs.some(
          (img) => !allowedFormats.includes(img.mimetype),
        );

        if (invalidFormats) {
          msg.msgClass = 'error';
          msg.text = 'Incorrect type of image file in Category Images';
        }
      }
    }
    return msg;
  };
  //   const convertCatImgs = (catImgs) => {
  //     if (Array.isArray(catImgs)) {
  //       // If catImgs is already an array, return a copy of it
  //       return [...catImgs];
  //     } else if (typeof catImgs === 'string') {
  //       // If catImgs is a string, parse it as JSON
  //       try {
  //         return JSON.parse(catImgs);
  //       } catch (error) {
  //         console.error('Error parsing catImgs:', error);
  //         return [];
  //       }
  //     } else {
  //       // If catImgs is neither an array nor a string, return an empty array
  //       return [];
  //     }
  //   };
  //axios for DB
  const createCategory = async (dataToSend) => {
    console.log('data for create');
    //  console.log(dataToSend);
    console.log(catImgs);
    console.log(catFiles);
    console.log(catImgSm);

    const id_user = currentUser.id_user;
    const formData = new FormData();
    formData.append('catName', catName);
    formData.append('itemPoints', itemPoints);
    formData.append('catColor', catColor);
    formData.append('catImgSm', catImgSm);
    formData.append('catImgLg', catImgLg);
    const catFilesArray = Array.from(catFiles);

    catFilesArray.forEach((img, index) => {
      formData.append(`catImgs${index}`, img);
    });
    //  catFiles.forEach((img, index) => {
    //    formData.append(`catImgs${index}`, img);
    //  });
    //  console.log(catFilesArray);
    axios
      .post(`/admin/createcertif`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      })

      .then((res) => {
        fetchData();
        setIsFormVisiable(false);
        const msgText = 'Create the certification successfully!';
        const msg = {
          msgClass: res.status === 200 ? 'success' : 'error',
          text: res.status === 200 ? msgText : 'Error add certification',
        };

        //   setCategories((prevCategories) => [...prevCategories, dataToSend]);
        setMessage(msg);
        // Clear the message after 2 seconds
        setTimeout(() => {
          setMessage('');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error add item', error);
      });
  };
  const editCategory = async (dataToSend) => {
    console.log(catId);
    console.log(dataToSend);
    console.log(dataToSend.catImgs);

    const formData = new FormData();
    //  formData.append('dataToSend', JSON.stringify(dataToSend));
    formData.append('id_certif', catId);
    formData.append('catName', catName);
    formData.append('itemPoints', itemPoints);
    formData.append('catColor', catColor);
    formData.append('catImgSm', catImgSm);
    formData.append('catImgLg', catImgLg);
    formData.append('catImgsString', JSON.stringify(dataToSend.catImgs));
    const catFilesArray = Array.from(catFiles);

    catFilesArray.forEach((img, index) => {
      formData.append(`catImgs${index}`, img);
    });

    // formData.append('selectedFile', selectedData.selectedFile);
    // console.log(formData.get('selectedFile'));
    // console.log(formData);
    axios
      .post(`/admin/editcertif/${catId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      })
      .then((res) => {
        setIsFormVisiable(false);
        const msgText = 'certification updated';
        const msg = {
          msgClass: res.status === 200 ? 'success' : 'error',
          text: res.status === 200 ? msgText : 'Error add certification',
        };

        setMessage(msg);
        // Clear the message after 2 seconds
        setTimeout(() => {
          setMessage('');
        }, 2000);
        fetchData();
      })
      .catch((error) => {
        console.error('Error add item', error);
      });
  };
  const deleteCategory = async (index) => {
    console.log(categories[index].id_certif);
    const categoryId = categories[index].id_certif;
    axios
      .delete(`/admin/deletecertif/${categoryId}`)
      .then((res) => {
        // Update the state after successfully deleting on the server
        const updatedCategories = [...categories];
        updatedCategories.splice(index, 1);
        setCategories(updatedCategories);
        const msgText = 'certification deleted';
        const msg = {
          msgClass: res.status === 200 ? 'success' : 'error',
          text: res.status === 200 ? msgText : 'Error delete certification',
        };
        setMessage(msg);
        // Clear the message after 2 seconds
        setTimeout(() => {
          setMessage('');
        }, 2000);
        fetchData();
      })
      .catch((error) => {
        console.error('Error add item', error);
      });
  };
  //   console.log(catFiles);
  return (
    <div className='certif_admin'>
      <div className='back mt2 btn_main'>
        <button className='d-flex aic g1' onClick={handleEditMode}>
          <BackIcon />
          <span>Go Back</span>
        </button>
      </div>
      <div className='d-flex jce'>
        <button className='plus mb2' onClick={() => handlePopupOpen()}>
          <AddIcon />
          <span className='ml1'>Create certificate</span>
        </button>
      </div>

      {isFormVisiable && (
        <div className='popup_content overlay'>
          <div className='popup popup-big'>
            <div className='msg_block'>
              {message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
            </div>
            <button className='btn__close popup__btn-close' onClick={handlePopupClose}></button>

            <form
              encType='multipart/form-data'
              className='form-big'
              onSubmit={(e) => e.preventDefault()}>
              <div className='mb2'>
                <label htmlFor='catName'>Certificate Name</label>
                <input
                  type='text'
                  id='catName'
                  className='input_white w70'
                  name='catName'
                  onChange={(e) => setCatName(e.target.value)}
                  value={catName}
                  required
                />
              </div>
              <div className='d-flex jcsb mb1'>
                <div className='d-flex'>
                  <div className='d-flex f-column w50 jcc'>
                    <label className='nowrap' htmlFor='catImgSm'>
                      Certificate icon
                    </label>
                    <input
                      type='file'
                      id='catImgSm'
                      name='catImgSm'
                      accept='image/*,.svg'
                      onChange={(e) => handleFileChange(e, 'catImgSm')}
                      key={inputKeys.catImgSm}
                      required
                    />
                  </div>

                  <ImagePreview imageUrl={imagePreviewSm} />
                </div>
                <div className='d-flex'>
                  <div className='d-flex f-column w50 jcc'>
                    <label className='nowrap' htmlFor='catImgLg'>
                      Certificate image
                    </label>
                    <input
                      type='file'
                      id='catImgLg'
                      name='catImgLg'
                      accept='image/*,.svg'
                      onChange={(e) => handleFileChange(e, 'catImgLg')}
                      key={inputKeys.catImgLg}
                      required
                    />
                  </div>
                  <ImagePreview imageUrl={imagePreviewLg} />
                </div>
              </div>

              <div className='items__wrap'>
                <label htmlFor='cardImgs'>Items of certificate</label>
                <input
                  type='file'
                  id='cardImgs'
                  name='cardImgs'
                  accept='image/*'
                  onChange={(e) => handleFileChange(e, 'cardImgs')}
                  multiple
                  key={inputKeys.cardImgs}
                  required
                />

                <div className='items mt1'>
                  {catImgs && Array.isArray(catImgs) && (
                    <div className='d-flex g1 f-wrap'>
                      {catImgs.map((img, index) => (
                        <div key={index} className='image-preview d-flex f-column g1'>
                          {/* <img
                       src={`${API_URL}/${img.path}`}
                      src={`${img.path}`}
                       src={
                         img.path === ''
                           ? URL.createObjectURL(catFiles[index])
                           : `${API_URL}/${img.path}`
                       }
                      alt={`Image ${index + 1}`}
                      style={{ width: '100px', marginRight: '10px' }}
                    /> */}
                          <img
                            key={index}
                            src={
                              img.path.startsWith('blob') ? `${img.path}` : `${API_URL}/${img.path}`
                            }
                            alt={`Image ${index + 1}`}
                            style={{ width: '100px', marginRight: '10px' }}
                          />
                          <button onClick={() => removeFile(index)}>Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className='mt2 mb1'>
                <label htmlFor='itemPoints'>Points of each item from this certificate</label>
                <input
                  type='number'
                  id='itemPoints'
                  name='itemPoints'
                  min='1'
                  onChange={(e) => setItemPoints(e.target.value)}
                  value={itemPoints}
                  required
                />
              </div>
              <div>
                <label htmlFor='catColor'>Certificate background color</label>
                <input
                  type='color'
                  id='catColor'
                  name='catColor'
                  onChange={(e) => setCatColor(e.target.value)}
                  value={catColor}
                  required
                />
              </div>
              <div className='d-flex jcc mt2'>
                <button type='button' className='btn_blue  center' onClick={addOrUpdateCategory}>
                  {editMode ? 'Save' : 'Add new certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div>
          {categories.map((category, index) => (
            <div key={index} className='certif-item t_30'>
              <h3 className=''>Certificate: {category.certif_name}</h3>
              <ul className='mt2'>
                <li className='d-flex g2'>
                  <div className='mt2 w30 b-right'>
                    <div className='d-flex aic g2 mb2'>
                      <span className='w70 nowrap'>Certificate icon:</span>
                      {category.certif_img_sm && (
                        <img
                          src={`${API_URL}/uploads/${category.certif_img_sm}`}
                          alt='certif_icon'
                          className='img-prev'
                        />
                      )}
                    </div>
                    <div className='d-flex aic g2 '>
                      <span className='w70 nowrap'>Certificate image:</span>
                      {category.certif_img_lg && (
                        <img
                          src={`${API_URL}/uploads/${category.certif_img_lg}`}
                          alt='sbj_icon'
                          className='img-prev'
                        />
                      )}
                    </div>
                  </div>
                  <div className='d-flex f-column aic g2 w70'>
                    <span>Items of certificate:</span>
                    {category.certif_imgs_group && (
                      <div className='d-flex f-wrap jcc'>
                        {JSON.parse(category.certif_imgs_group).map((img, index) => (
                          <img
                            key={index}
                            src={`${API_URL}/${img.path}`}
                            alt={`Image ${index + 1}`}
                            className='img-prev'
                            style={{ width: '100px', marginRight: '10px' }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </li>

                <li className='mt1'>Item Points: {category.certif_point}</li>
                <li className='mt1'>
                  Category Color:{' '}
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: category.certif_bg_color,
                      display: 'inline-block',
                      marginRight: '10px',
                    }}></div>
                  {/* {category.certif_bg_color} */}
                </li>
                <li className='d-flex g3 mt5 '>
                  <button
                    className='plus mb2 d-flex aic btn_transp_main hover-scale'
                    onClick={() => putDataToForm(index)}>
                    <EditIcon />
                    <span className='ml1'>Edit Certificate</span>
                  </button>
                  <button
                    className='plus mb2 d-flex aic btn_transp_main hover-scale'
                    onClick={() => handleDeleteCategory(index)}>
                    <DeleteIcon />
                    <span className='ml1'>Delete Certificate</span>
                  </button>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditCertifications;
