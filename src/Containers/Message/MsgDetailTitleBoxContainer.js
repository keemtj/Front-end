import React from 'react';
import { useSelector } from 'react-redux';
import MsgDetailTitleBox from '../../Components/Message/MsgDetailTitleBox';

const MsgDetailTitleBoxContainer = () => {
  // // ! redux
  // const { activeIndex, filteredMsgs } = useSelector(state => state.message);
  // const reservations = useSelector(state => state.trips.reservations);

  // // ! variable
  // const activeMsg = filteredMsgs.find(
  //   (_, index) => filteredMsgs[index] === filteredMsgs[activeIndex],
  // );

  // const reservation = reservations.find(
  //   reservation =>
  //     reservation.reservationId === (activeMsg && activeMsg.reservationId),
  // );

  return (
    <MsgDetailTitleBox
    // hostname={reservation && reservation.hostname}
    // address={reservation && reservation.address}
    />
  );
};

export default MsgDetailTitleBoxContainer;
