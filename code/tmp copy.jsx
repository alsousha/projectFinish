//Manage certifications page by admin
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { API_URL } from '../../constans';

import ImagePreview from './ImagePreview';
import axios from 'axios';

const EditCertifications = () => {
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
  const [itemPoints, setItemPoints] = useState('');
  const [catColor, setCatColor] = useState('#9dc6af');
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
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
    console.log('SSSSSSSSSS');
    console.log(catImgs);
    const previewImages = () => {
      const previewContainer = document.getElementById('preview-container');
      console.log(previewContainer);
      if (!previewContainer) {
        return;
      }

      previewContainer.innerHTML = '';

      catImgs.forEach((img) => {
        console.log(img);
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgElement = document.createElement('img');
          imgElement.src = e.target.result;
          imgElement.alt = 'Preview';
          imgElement.style.width = '100px';
          imgElement.style.marginRight = '10px';
          previewContainer.appendChild(imgElement);
        };
        reader.readAsDataURL(img);
      });
    };

    previewImages();
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
    const updatedCatImgs = [...catImgs];
    updatedCatImgs.splice(index, 1);

    // Update preview images
    const imagesPreview = updatedCatImgs.map((img) => URL.createObjectURL(img));
    setPreviewImages(imagesPreview);
    setCatImgs(updatedCatImgs);
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
    //put data to form for update certif
    const selectedCategory = categories[index];
    //  console.log(selectedCategory);
    setCatName(selectedCategory.certif_name);
    setCatImgSm(selectedCategory.certif_img_sm);
    setCatImgLg(selectedCategory.certif_img_lg);
    setCatImgs(selectedCategory.certif_imgs_group);
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
      // Update catImgs with plain objects
      const newImages =
        typeof catImgs === 'string' ? [...JSON.parse(catImgs), ...files] : [...catImgs, ...files];
      setCatImgs(newImages);

      // Update preview images
      const imagesPreview = newImages.map((img) => URL.createObjectURL(img));
      setPreviewImages(imagesPreview);
    }

    // Increment the counter based on the fieldType
    setInputKeys((prevKeys) => ({
      ...prevKeys,
      [fieldName]: prevKeys[fieldName] + 1,
    }));
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
      if (typeof categoryItemForSave.catImgs !== 'string') {
        // Check allowed file formats for each image in catImgs
        const invalidFormats = categoryItemForSave.catImgs.some(
          (img) => !allowedFormats.includes(img.type),
        );

        if (invalidFormats) {
          msg.msgClass = 'error';
          msg.text = 'Incorrect type of image file in Category Images';
        }
      }
    }
    return msg;
  };
  const convertCatImgs = (catImgs) => {
    if (Array.isArray(catImgs)) {
      // If catImgs is already an array, return a copy of it
      return [...catImgs];
    } else if (typeof catImgs === 'string') {
      // If catImgs is a string, parse it as JSON
      try {
        return JSON.parse(catImgs);
      } catch (error) {
        console.error('Error parsing catImgs:', error);
        return [];
      }
    } else {
      // If catImgs is neither an array nor a string, return an empty array
      return [];
    }
  };
  //axios for DB
  const createCategory = async (dataToSend) => {
    //  console.log(dataToSend);
    const id_user = currentUser.id_user;
    const formData = new FormData();
    formData.append('catName', catName);
    formData.append('itemPoints', itemPoints);
    formData.append('catColor', catColor);
    formData.append('catImgSm', catImgSm);
    formData.append('catImgLg', catImgLg);
    catImgs.forEach((img, index) => {
      formData.append(`catImgs-${index}`, img);
    });
    axios
      .post(`/admin/createcertif`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      })
      .then((res) => {
        fetchData();
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
    //  console.log(catId);
    //  console.log(dataToSend);
    const id_teacher = currentUser.id_user;

    const formData = new FormData();
    formData.append('dataToSend', JSON.stringify(selectedData));
    formData.append('id_articel', id);
    formData.append('selectedFile', selectedData.selectedFile);
    // console.log(formData.get('selectedFile'));
    // console.log(formData);
    axios
      .post(`/admin/editarticle/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      })
      .then((res) => {
        const msgText = 'Article updated';
        const msg = {
          msgClass: res.status === 200 ? 'success' : 'error',
          text: res.status === 200 ? msgText : 'Error add task',
        };
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

  //   console.log(catImgs);
  return (
    <div className='certif_admin'>
      <div className='msg_block'>
        {message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
      </div>
      <form encType='multipart/form-data' onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor='catName'>Certificate Name</label>
          <input
            type='text'
            id='catName'
            name='catName'
            onChange={(e) => setCatName(e.target.value)}
            value={catName}
            required
          />
        </div>
        <div>
          <label htmlFor='catImgSm'>Certificate icon</label>
          <input
            type='file'
            id='catImgSm'
            name='catImgSm'
            accept='image/*,.svg'
            onChange={(e) => handleFileChange(e, 'catImgSm')}
            key={inputKeys.catImgSm}
            required
          />
          <ImagePreview imageUrl={imagePreviewSm} />
        </div>
        <div>
          <label htmlFor='catImgLg'>Certificate image</label>
          <input
            type='file'
            id='catImgLg'
            name='catImgLg'
            accept='image/*,.svg'
            onChange={(e) => handleFileChange(e, 'catImgLg')}
            key={inputKeys.catImgLg}
            required
          />
          <ImagePreview imageUrl={imagePreviewLg} />
        </div>
        <div>
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

          <div>
            {catImgs && (
              <div>
                {(() => {
                  if (typeof catImgs === 'string') {
                    try {
                      const parsedImgs = JSON.parse(catImgs);
                      if (Array.isArray(parsedImgs)) {
                        return parsedImgs.map((img, index) => (
                          <div key={index} className='image-preview'>
                            <img
                              key={index}
                              src={`${API_URL}/${img.path}`}
                              alt={`Image ${index + 1}`}
                              style={{ width: '100px', marginRight: '10px' }}
                            />
                            <button onClick={() => removeFile(index)}>Remove</button>
                          </div>
                        ));
                      } else {
                        console.error('catImgs is not an array:', parsedImgs);
                        return null; // or provide a fallback behavior
                      }
                    } catch (error) {
                      console.error('Error parsing catImgs:', error);
                      return null; // or provide a fallback behavior
                    }
                  } else {
                    return catImgs.map((img, index) => (
                      <div key={index} className='image-preview'>
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Image ${index + 1}`}
                          style={{ width: '100px', marginRight: '10px' }}
                        />
                        <button onClick={() => removeFile(index)}>Remove</button>
                      </div>
                    ));
                  }
                })()}
              </div>
            )}
          </div>
        </div>
        <div>
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
        <button type='button' onClick={addOrUpdateCategory}>
          {editMode ? 'Save' : 'Add New Category'}
        </button>
      </form>

      {categories.length > 0 && (
        <div>
          <h2>Added Categories</h2>
          {categories.map((category, index) => (
            <div key={index}>
              <h3>Certificate {index + 1}</h3>
              <ul>
                <li>Certificate image: {category.certif_name}</li>
                <li>
                  Certificate Images:
                  {category.certif_img_sm && (
                    <img
                      src={`${API_URL}/uploads/${category.certif_img_sm}`}
                      alt='certif_icon'
                      className='certif__icon'
                    />
                  )}
                  {category.certif_img_lg && (
                    <img
                      src={`${API_URL}/uploads/${category.certif_img_lg}`}
                      alt='sbj_icon'
                      className='sbj__icon'
                    />
                  )}
                  {category.certif_imgs_group && (
                    <div>
                      {JSON.parse(category.certif_imgs_group).map((img, index) => (
                        <img
                          key={index}
                          src={`${API_URL}/${img.path}`}
                          alt={`Image ${index + 1}`}
                          style={{ width: '100px', marginRight: '10px' }}
                        />
                      ))}
                    </div>
                  )}
                </li>
                <li>Item Points: {category.certif_point}</li>
                <li>
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
                <li>
                  <button onClick={() => putDataToForm(index)}>Edit Category</button>
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
