import React from 'react';

const ImagePreview = ({ imageUrl }) => {
  return (
    <div className="image-preview">
      {imageUrl && <img src={imageUrl} alt="Preview" />}
    </div>
  );
};

export default ImagePreview;
