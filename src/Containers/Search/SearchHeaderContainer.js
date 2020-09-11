import React, { useEffect, useState, useCallback } from 'react';
import { throttle } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchHeader from '../../Components/Search/SearchHeader';
import { closeHeader, openHeader } from '../../Modules/search';
import { reset } from '../../Modules/searchForm';

const SearchHeaderContainer = () => {
  const { headerState } = useSelector(state => state.search);
  const searchForm = useSelector(state => state.searchForm);
  const history = useHistory();

  const [initAnimation, setInitAnimation] = useState(false);
  const dispatch = useDispatch();
  const onScroll = () => dispatch(closeHeader());
  const handleSearchBtnClick = () => dispatch(openHeader());

  const handleLogoClick = e => {
    e.preventDefault();
    history.push('/');
    window.scrollTo({ top: 0 });
    dispatch(reset());
  };

  console.log(
    'stop rendering!!!!!!!!!!!!!',
    '\n headerState',
    headerState,
    '\n initAnimation',
    initAnimation,
  );

  // 이게 어제 무한 렌더링 고쳤던 부분 ㅠㅠ
  // useEffect(() => {
  //   if (!initAnimation && headerState) {
  //     setInitAnimation(true);
  //   } else if (headerState) {
  //     window.addEventListener('scroll', throttle(onScroll, 150));
  //   }
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, [onScroll, initAnimation]);

  useEffect(() => {
    if (!initAnimation && headerState) {
      setInitAnimation(true);
    } else if (headerState) {
      window.addEventListener('scroll', throttle(onScroll, 150));
    } else if (!headerState) {
      setInitAnimation(false);
      window.removeEventListener('scroll', onScroll);
      // return;
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <SearchHeader
      searchForm={searchForm}
      initAnimation={initAnimation}
      isSearchBtnClicked={headerState}
      handleLogoClick={handleLogoClick}
      handleSearchBtnClick={handleSearchBtnClick}
    ></SearchHeader>
  );
};

export default React.memo(SearchHeaderContainer);
