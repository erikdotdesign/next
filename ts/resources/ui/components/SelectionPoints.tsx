import React from 'react';

interface SelectionPointsProps {
  zoom: number;
}

const SelectionPoints = (props: SelectionPointsProps) => {
  const scale = 1 / props.zoom;
  const origin = 50 * props.zoom;
  const translateN = (100 - origin) * -1;
  const translateP = translateN * -1 ;
  return (
    <div className='c-selection__points'>
      <div
        className='c-selection__point c-selection__point--tl'
        style={{
          transform: `scale(${scale}) translate(${translateN}%, ${translateN}%)`,
          transformOrigin: `right bottom`
        }} />
      <div
        className='c-selection__point c-selection__point--tc'
        style={{
          transform: `scale(${scale}) translate(${translateN}%, ${translateN}%)`,
          transformOrigin: `${origin}% bottom`
        }} />
      <div
        className='c-selection__point c-selection__point--tr'
        style={{
          transform: `scale(${scale}) translate(${translateP}%, ${translateN}%)`,
          transformOrigin: `left bottom`
        }} />
      <div
        className='c-selection__point c-selection__point--lc'
        style={{
          transform: `scale(${scale}) translate(${translateN}%, ${translateN}%)`,
          transformOrigin: `right ${origin}%`
        }} />
      <div
        className='c-selection__point c-selection__point--rc'
        style={{
          transform: `scale(${scale}) translate(${translateP}%, ${translateN}%)`,
          transformOrigin: `left ${origin}%`
        }} />
      <div
        className='c-selection__point c-selection__point--bl'
        style={{
          transform: `scale(${scale}) translate(${translateN}%, ${translateP}%)`,
          transformOrigin: `right top`
        }} />
      <div
        className='c-selection__point c-selection__point--bc'
        style={{
          transform: `scale(${scale}) translate(${translateN}%, ${translateP}%)`,
          transformOrigin: `${origin}% top`
        }} />
      <div
        className='c-selection__point c-selection__point--br'
        style={{
          transform: `scale(${scale}) translate(${translateP}%, ${translateP}%)`,
          transformOrigin: `left top`
        }} />
    </div>
  )
};

export default SelectionPoints;
