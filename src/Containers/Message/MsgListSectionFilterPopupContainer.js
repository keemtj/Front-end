import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MsgListSectionFilterPopup from '../../Components/Message/MsgListSectionFilterPopup';
import { fetchInbox, closePopup } from '../../Modules/message';
import qs from 'qs';

const MsgListSectionFilterPopupContainer = ({ popupState, popupRef }) => {
  // ! redux
  const { data } = useSelector(state => state.message.messages);
  const dispatch = useDispatch();

  // ! variable
  const allMsgCount = data && data.all.length;
  const hiddenMsgCount = data && data.hidden.length;
  const unreadMsgCount = data && data.unread.length;

  // ! event
  const onClickAll = () => {
    dispatch(closePopup('filter'));
  };

  const onClickHidden = () => {
    dispatch(closePopup('filter'));
  };

  const onClickUnread = () => {
    dispatch(closePopup('filter'));
  };

  // ! query
  const query = useLocation();
  const { filter } = qs.parse(query.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <MsgListSectionFilterPopup
      popupState={popupState}
      popupRef={popupRef}
      onClickAll={onClickAll}
      onClickHidden={onClickHidden}
      onClickUnread={onClickUnread}
      allMsgCount={allMsgCount}
      hiddenMsgCount={hiddenMsgCount}
      unreadMsgCount={unreadMsgCount}
      // onClickFilterPopup={onClickFilterPopup}
      // id={id}
    />
  );
};

export default MsgListSectionFilterPopupContainer;
