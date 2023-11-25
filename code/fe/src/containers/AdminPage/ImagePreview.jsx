import React from 'react';

const ImagePreview = ({ imageUrl }) => {
  return (
    <div className='image-preview'>
      {imageUrl && (
        <img src={imageUrl} alt='Preview' style={{ width: '100px', marginRight: '10px' }} />
      )}
    </div>
  );
};

export default ImagePreview;
