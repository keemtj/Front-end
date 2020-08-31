import React, { useEffect, useRef, useState } from 'react';
import {
  RefundPopup,
  RoomTypePopup,
  PricePopup,
  SetDatePopup,
} from '../../Components/Search/FilterPopup';
import { useSelector, useDispatch } from 'react-redux';
import { saveFilter, setFilter, resetFilter } from '../../Modules/search';

let prevFilter = {};

const PricePopupContainer = ({ popupState, onClose }) => {
  const { min, max } = useSelector(state => state.search.filterApplied.price);
  const { priceArray, averagePrice } = useSelector(state => state.search);
  const [range, setRange] = useState({ value: [min, max] });
  const dispatch = useDispatch();

  const onHandler = e => {
    setRange({ value: e });
    dispatch(setFilter('price', { min: e[0], max: e[1] }));
  };
  const onSetRange = () => setRange({ value: [min, max] });
  const onChangeMinPrice = ({ target }) =>
    dispatch(setFilter('price', { min: +target.value, max }));
  const onChangeMaxPrice = ({ target }) =>
    dispatch(setFilter('price', { min, max: +target.value }));
  const onReset = () => {
    setRange({ value: [12000, 1000000] });
    dispatch(resetFilter('price'));
  };
  const onSave = () => dispatch(saveFilter('price', { min, max }));

  const track = document.querySelector('.rc-slider-track');
  const rangeBar = document.querySelector('.rc-slider');
  const trackPos = track && track.getBoundingClientRect();
  const rangePos = rangeBar && rangeBar.getBoundingClientRect();
  const isDisabled = min === 12000 && max === 1000000;

  const popup = useRef();
  const closePopup = ({ target }) => {
    if (!popupState || popup.current.contains(target)) return;
    // dispatch(saveFilter('price'), prevFilter);
    onClose('price');
  };

  useEffect(() => {
    prevFilter = { min, max };
    document.addEventListener('click', closePopup);
    return () => {
      document.removeEventListener('click', closePopup);
    };
  }, [closePopup]);

  return (
    <div ref={popup}>
      <PricePopup
        popupState={popupState}
        isDisabled={isDisabled}
        priceArray={priceArray}
        averagePrice={averagePrice}
        min={min}
        max={max}
        left={trackPos && trackPos.left}
        right={trackPos && trackPos.right}
        start={rangePos && rangePos.left}
        end={rangePos && rangePos.right}
        range={range}
        onHandler={onHandler}
        onSetRange={onSetRange}
        onChangeMinPrice={onChangeMinPrice}
        onChangeMaxPrice={onChangeMaxPrice}
        onSave={onSave}
        onReset={onReset}
      />
    </div>
  );
};

const SetDatePopupContainer = ({ popupState, onClose }) => {
  const popup = useRef();
  const closePopup = ({ target }) => {
    if (!popupState || popup.current.contains(target)) return;
    onClose('setDate');
  };

  useEffect(() => {
    document.addEventListener('click', closePopup);
    return () => {
      document.removeEventListener('click', closePopup);
    };
  }, [closePopup]);

  return (
    <div ref={popup}>
      <SetDatePopup popupState={popupState} />
    </div>
  );
};

export { PricePopupContainer, SetDatePopupContainer };
