import React from 'react';
import HomeCard from '../../Components/Search/HomeCard';

const HomeCardContainer = ({
  home,
  onClickBookmark,
  dateDiff,
  onHoverHome,
}) => {
  return (
    <HomeCard
      home={home}
      onClickBookmark={onClickBookmark}
      dateDiff={dateDiff}
      onHoverHome={onHoverHome}
    />
  );
};

export default HomeCardContainer;
