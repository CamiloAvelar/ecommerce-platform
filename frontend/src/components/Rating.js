import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color, cursor, onClick }) => {
  const handleRating = (num) => {
    onClick(num);
  };

  return (
    <div className='rating'>
      <span>
        <i
          style={{ color, cursor }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
          onClick={() => handleRating(1)}
        ></i>
      </span>
      <span>
        <i
          style={{ color, cursor }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
          onClick={() => handleRating(2)}
        ></i>
      </span>
      <span>
        <i
          style={{ color, cursor }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
          onClick={() => handleRating(3)}
        ></i>
      </span>
      <span>
        <i
          style={{ color, cursor }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
          onClick={() => handleRating(4)}
        ></i>
      </span>
      <span>
        <i
          style={{ color, cursor }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
          onClick={() => handleRating(5)}
        ></i>
      </span>
      <span className='text'>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
  value: 0,
  cursor: 'default',
  text: '',
  onClick: () => {},
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  cursor: PropTypes.string,
};

export default Rating;
