import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (value, e) => {
    e.preventDefault();
    setRating(value);
  };

  return (
    <div>
     
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            id='star'
            key={index}
            onClick={(e) => handleClick(starValue, e)}
            color={starValue <= rating ? '#235997' : 'gray'}
            size={22}
            style={{ cursor: 'pointer' }}
          />
        );
      })}
      <p>Você selecionou {rating} estrela(s) como avaliação.</p>
    </div>
  );
};

export default RatingStars;