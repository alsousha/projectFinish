import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import 'react-dropzone-uploader/dist/styles.css'; // Import the styles
import Dropzone from 'react-dropzone-uploader';
import ImagePreview from './ImagePreview';
import { API_URL } from '../../constans';
function EditCertifications() {
	
	const [catName, setCatName] = useState('');
	const [catImgSm, setCatImgSm] = useState(null);
	const [catImgLg, setCatImgLg] = useState(null);
	const [cardImgs, setCardImgs] = useState([]); // Array to store card images
	const [itemPoints, setItemPoints] = useState('');
	const [catColor, setCatColor] = useState('#9dc6af');
 
	const [categories, setCategories] = useState([]);
	const [imagePreviewSm, setImagePreviewSm] = useState('');
	const [imagePreviewLg, setImagePreviewLg] = useState('');
	const [prevCardImgs, setPrevCardImgs] = useState([]); // Array to store previous card images
  	const [newCardImgs, setNewCardImgs] = useState([]); // Array to store new card images

	const [newCategory, setNewCategory] = useState({
	  catName: '',
	  catImgSm: null,
	  catImgLg: null,
	  cardImgs: [],
	  itemPoints: '',
	  catColor: '#000000',
	});

  const [editMode, setEditMode] = useState(false);
  const [editedCategoryIndex, setEditedCategoryIndex] = useState(null);

useEffect(() => {
	// Simulate loading previous card images (replace this with your actual data retrieval)
	const fetchPreviousCardImages = async () => {
	  // Example: Fetch previous card images from an API
	  const response = await fetch('your-api-endpoint-for-previous-card-images');
	  if (response.ok) {
		 const data = await response.json();
		 setPrevCardImgs(data); // Set the previous card images in state
	  } else {
		 // Handle error
	  }
	};

	fetchPreviousCardImages();
 }, []); // Run this effect only once when the component mounts


useEffect(() => {
    if (editMode && editedCategoryIndex !== null) {
      // Populate image previews with the currently selected category's images.
      const selectedCategory = categories[editedCategoryIndex];
      if (selectedCategory) {
        if (selectedCategory.catImgSm) {
          setImagePreviewSm(URL.createObjectURL(selectedCategory.catImgSm));
        } else {
          setImagePreviewSm('');
        }
        if (selectedCategory.catImgLg) {
          setImagePreviewLg(URL.createObjectURL(selectedCategory.catImgLg));
        } else {
          setImagePreviewLg('');
        }
      }
    }
  }, [editMode, editedCategoryIndex, categories]);

  const handleFileChange = (e, fieldName) => {
	const file = e.target.files[0];
	if (file) {
	  // Determine which image state variable to update based on fieldName
	  if (fieldName === 'catImgSm') {
		 setCatImgSm(file);
	  } else if (fieldName === 'catImgLg') {
		 setCatImgLg(file);
	  } else if (fieldName === 'cardImgs') {
		 setCardImgs([...cardImgs, file]); // Add the new image to the array
	  }
 
	  // Also update the image previews if needed
	  const reader = new FileReader();
	  reader.onload = () => {
		 if (fieldName === 'catImgSm') {
			setImagePreviewSm(reader.result);
		 } else if (fieldName === 'catImgLg') {
			setImagePreviewLg(reader.result);
		 }
	  };
	  reader.readAsDataURL(file);
	} else {
	  // Clear the image state variable and the image preview
	  if (fieldName === 'catImgSm') {
		 setCatImgSm(null);
		 setImagePreviewSm('');
	  } else if (fieldName === 'catImgLg') {
		 setCatImgLg(null);
		 setImagePreviewLg('');
	  }
	}
 };
 

  const addOrUpdateCategory = () => {

	const newCategoryItem = {
	  catName,
	  catImgSm,
	  catImgLg,
	  cardImgs, 
	  itemPoints,
	  catColor,
	};
 
	if (editMode) {
	  // If in edit mode, update the edited category.
	  const updatedCategories = [...categories];
	  updatedCategories[editedCategoryIndex] = newCategoryItem;
	  setCategories(updatedCategories);
	  setEditMode(false);
	  setEditedCategoryIndex(null);
	} else {
	  // If not in edit mode and the name is not empty, add a new category.
	  setCategories((prevCategories) => [...prevCategories, newCategoryItem]);
	}
 
	// Reset form fields and previews
	setCatName('');
	setCatImgSm(null);
	setCatImgLg(null);
	setCardImgs([]); // Reset the array of card images
	setItemPoints('');
	setCatColor('#9dc6af');
	setImagePreviewSm('');
	setImagePreviewLg('');
 };
 

  // Function to edit a category
  const editCategory = (index) => {
	// Set the form fields to the values of the selected category.
	const selectedCategory = categories[index];
	setCatName(selectedCategory.catName);
	setCatImgSm(selectedCategory.catImgSm);
	setCatImgLg(selectedCategory.catImgLg);
	setItemPoints(selectedCategory.itemPoints);
	setCatColor(selectedCategory.catColor);
 
	setEditMode(true);
	setEditedCategoryIndex(index);
 };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateCategory();
  };

// Function to handle changes in the card images input
  const handleCardImgsChange = (e) => {
    const files = e.target.files;
    // Convert the FileList object to an array
    const cardImages = Array.from(files);
    setCardImgs(cardImages);

    // Optionally, you can display a preview of the selected card images
    const cardImagePreviews = cardImages.map((image) => URL.createObjectURL(image));
    // Use cardImagePreviews to display image previews for new card images
    setNewCardImgs(cardImagePreviews); // Store new card image previews
  };


  return (
    <div className='certif_admin'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="catName">Category Name</label>
          <input
            type="text"
            id="catName"
            name="catName"
            onChange={(e) => setCatName(e.target.value)}
            value={catName}
            required
          />
          {/* You can add validation error message here */}
        </div>
        <div>
			<label htmlFor="catImgSm">Small Image</label>
			<input
				type="file"
				id="catImgSm"
				name="catImgSm"
				accept="image/*,.svg"
				onChange={(e) => handleFileChange(e, 'catImgSm')}
				required
			/>
			<ImagePreview imageUrl={imagePreviewSm} />
			</div>
			<div>
			<label htmlFor="catImgLg">Large Image</label>
			<input
				type="file"
				id="catImgLg"
				name="catImgLg"
				accept="image/*,.svg"
				onChange={(e) => handleFileChange(e, 'catImgLg')}
				required
			/>
			<ImagePreview imageUrl={imagePreviewLg} />
			</div>
			<div>
          {/* Display previous card images */}
          {prevCardImgs.length > 0 && (
            <div>
              <h3>Previous Card Images</h3>
              <ul>
                {prevCardImgs.map((prevCardImg, index) => (
                  <li key={index}>
                    <ImagePreview imageUrl={prevCardImg} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="cardImgs">Card Images</label>
          <input
            type="file"
            id="cardImgs"
            name="cardImgs"
            accept="image/*,.svg"
            multiple
            onChange={handleCardImgsChange}
            required
          />
          {/* Display card image previews for new card images */}
          {newCardImgs.length > 0 && (
            <div>
              <h3>New Card Images</h3>
              <ul>
                {newCardImgs.map((newCardImg, index) => (
                  <li key={index}>
                    <ImagePreview imageUrl={newCardImg} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        

        <div>
          <label htmlFor="itemPoints">Item Points</label>
          <input
            type="number"
            id="itemPoints"
            name="itemPoints"
				min="1"
            onChange={(e) => setItemPoints(e.target.value)}
            value={itemPoints}
				required
          />
        </div>
        <div>
          <label htmlFor="catColor">Category Color</label>
          <input
            type="color"
            id="catColor"
            name="catColor"
            onChange={(e) => setCatColor(e.target.value)}
            value={catColor}
				required
          />
        </div>
        <button type="submit">{editMode ? 'Save' : 'Add New Category'}</button>
      </form>
      {categories.length > 0 && (
        <div>
          <h2>Added Categories</h2>
          {categories.map((category, index) => (
            <div key={index}>
              <h3>Category {index + 1}</h3>
              <ul>
                <li>Category Name: {category.catName}</li>
                <li>Small Image: {category.catImgSm ? category.catImgSm.name : 'N/A'}</li>
                <li>Large Image: {category.catImgLg ? category.catImgLg.name : 'N/A'}</li>
                {/* Use ImagePreview component here for added categories */}
                <li>
                  <ImagePreview imageUrl={category.catImgSm ? URL.createObjectURL(category.catImgSm) : null} />
                </li>
                <li>
                  <ImagePreview imageUrl={category.catImgLg ? URL.createObjectURL(category.catImgLg) : null} />
                </li>
                <li>Item Points: {category.itemPoints}</li>
                <li>
                  Category Color: <div style={{ width: '20px', height: '20px', backgroundColor: category.catColor }}></div>
                </li>
                <li>
                  <button onClick={() => editCategory(index)}>Edit Category</button>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EditCertifications;
