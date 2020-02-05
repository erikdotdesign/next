import React from 'react';
import chroma from 'chroma-js';

interface SidebarRightSwatchesProps {
  value: string;
  prop: string;
}

const SidebarRightSwatches = (props: SidebarRightSwatchesProps) => {
  const getColors = () => {
    const values = String(props.value).split(' ');
    const colors: string[] = [];
    values.map((value: string) => {
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
  const getUrl = () => {
    if (props.prop === 'WebkitMaskBoxImage') {
      let nonUrl = ` 100 100 0 0 stretch stretch`;
      return props.value.slice(0, props.value.length - nonUrl.length);
    } else {
      return props.value;
    }
  }
  const colors = getColors();
  return (
    <div className='c-sidebar-right__swatch-group'>
      {
        colors.length > 0
        ? colors.map((color: any, index: number) => (
            <div
              key={index}
              className='c-sidebar-right__swatch'
              style={{backgroundColor: color}} />
          ))
        : null
      }
      {
        String(props.value).startsWith('url')
        ? <div
            className='c-sidebar-right__swatch c-sidebar-right__swatch--image'
            style={{
              background: getUrl(),
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }} />
        : null
      }
    </div>
  );
}

export default SidebarRightSwatches;