import React from 'react';

interface SelectionPointsProps {
  zoom: number;
}

const SelectionPoints = (props: SelectionPointsProps) => {
  const scale = props.zoom < 1 ? 1 / props.zoom : 1;
  const origin = props.zoom < 1 ? 50 * props.zoom : 50;
  return (
    <div className='c-selection__points'>
      <div
        className='c-selection__point c-selection__point--tl'
        style={{
          transform: `scale(${scale}) translate(-${origin}%, -${origin}%)`
        }} />
      <div
        className='c-selection__point c-selection__point--tc'
        style={{
          transform: `scale(${scale}) translate(-${origin}%, -${origin}%)`
        }} />
      <div
        className='c-selection__point c-selection__point--tr'
        style={{
          transform: `scale(${scale}) translate(${origin}%, -${origin}%)`
        }} />
      <div
        className='c-selection__point c-selection__point--lc'
        style={{
          transform: `scale(${scale}) translate(-${origin}%, -${origin}%)`
        }} />
      <div
        className='c-selection__point c-selection__point--rc'
        style={{
          transform: `scale(${scale}) translate(${origin}%, -${origin}%)`
        }} />
      <div
        className='c-selection__point c-selection__point--bl'
        style={{
          transform: `scale(${scale}) translate(-${origin}%, ${origin}%)`
        }} />
      <div
        className='c-selection__point c-selection__point--bc'
        style={{
          transform: `scale(${scale}) translate(-${origin}%, ${origin}%)`
        }} />
      <div
        className='c-selection__point c-selection__point--br'
        style={{
          transform: `scale(${scale}) translate(${origin}%, ${origin}%)`
        }} />
    </div>
  )
};

export default SelectionPoints;
