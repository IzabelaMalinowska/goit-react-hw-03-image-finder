import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import React from 'react';

const ImageGalleryItem = ({ image, onClick }) => (
  <li
    className={css.ImageGalleryItem}
    id={image.id}
    onClick={() => onClick(image.largeImageURL, image.tags)}
  >
    <img
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
      className={css.ImageGalleryItemImage}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  image: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
};

export default ImageGalleryItem;