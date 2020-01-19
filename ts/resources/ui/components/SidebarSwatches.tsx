import React from 'react';
import chroma from 'chroma-js';

interface SidebarSwatchesProps {
  value: any;
}

const SidebarSwatches = (props: SidebarSwatchesProps) => {
  const getColors = () => {
    const values = String(props.value).split(' ');
    const colors: any[] = [];
    values.map((value: any) => {
      if (value.endsWith('),')) {
        let string = value.slice(0, value.length - 1);
        if (chroma.valid(string)) {
          colors.push(string)
        }
      } else if (value.endsWith(')')) {
        if (chroma.valid(value)) {
          colors.push(value)
        }
      }
    });
    return colors;
  }
  const colors = getColors();
  return (
    <div className='c-sidebar-styles__swatch-group'>
      {
        colors.length > 0
        ? colors.map((color: any, index: number) => (
            <div
              key={index}
              className='c-sidebar-styles__swatch'
              style={{backgroundColor: color}} />
          ))
        : null
      }
      {
        String(props.value).startsWith('url')
        ? <div
            className='c-sidebar-styles__swatch c-sidebar-styles__swatch--image'
            style={{
              backgroundImage: props.value,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }} />
        : null
      }
    </div>
  );
}

export default SidebarSwatches;