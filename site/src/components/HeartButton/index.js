import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './index.css';
const HeartButton = ({ companyId }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const clickStatus = localStorage.getItem(`@clicked-${companyId}`);
    const likesCount = localStorage.getItem(`@likes-${companyId}`);
    setIsClicked(clickStatus === 'true');
    setLikes(parseInt(likesCount) || 0);
  }, [companyId]);

  const handleClick = () => {
    setIsClicked(!isClicked);

    if (!isClicked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  };
  const removeCompanyFromLocalStorage = () => {
    const storedCompanies = JSON.parse(localStorage.getItem('@empresaFav'));
    const updatedCompanies = storedCompanies.filter(company => company.id !== companyId);
    localStorage.setItem('@empresaFav', JSON.stringify(updatedCompanies));
  };
  
  useEffect(() => {
    localStorage.setItem(`@clicked-${companyId}`, isClicked);
    localStorage.setItem(`@likes-${companyId}`, likes);

    if (likes === 0) {
      removeCompanyFromLocalStorage();
    }
  }, [companyId, isClicked, likes]);

  const heartColor = isClicked ? 'purple' : 'black';
  
  return (
      <div className='companyListInfoBtn'>
          <div id='likes' className='aval'>
              <a onClick={handleClick}>
                  <FontAwesomeIcon icon={faHeart} color={heartColor} />
              </a>
              <p>{likes}</p>
          </div>
      </div>

  );
};

export default HeartButton;