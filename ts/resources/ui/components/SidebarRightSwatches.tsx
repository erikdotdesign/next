import React from 'react';
import chroma from 'chroma-js';
import SidebarRightSwatch from './SidebarRightSwatch';
import { getCSSUrl } from '../utils';

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
  const colors = getColors();
  return (
    <div className='c-sidebar-right__swatch-group'>
      {
        colors.length > 0
        ? colors.map((color: any, index: number) => (
            <SidebarRightSwatch
              key={index}
              value={color} />
          ))
        : null
      }
      {
        String(props.value).startsWith('url')
        ? <SidebarRightSwatch
            value={getCSSUrl(props.prop, props.value)}
            image />
        : null
      }
    </div>
  );
}

export default SidebarRightSwatches;