import React from 'react';
import SidebarStylesValue from './SidebarStylesValue';
import SidebarStylesProp from './SidebarStylesProp';

import artboardStyles from '../styles/artboardStyles';
import shapeStyles from '../styles/shapeStyles';
import shapePathStyles from '../styles/shapePathStyles';
import imageStyles from '../styles/imageStyles';
import pathStyles from '../styles/pathStyles';
import { textContainerStyles, textStyles } from '../styles/textStyles';

interface SidebarProps {
  selection: any;
  images: any;
  svgs: any;
}

const SidebarStyles = (props: SidebarProps) => {
  const { selection, images, svgs } = props;
  const getLayerStyles = () => {
    switch(selection.type) {
      case 'Shape':
        return {...shapeStyles(selection), ...pathStyles(selection, svgs)};
      case 'ShapePath':
        return {...shapePathStyles(selection, images), ...pathStyles(selection, svgs)};
      case 'Image':
        return imageStyles(selection, images);
      case 'Text':
        return {...textContainerStyles(selection), ...textStyles(selection)};
      case 'Artboard':
        return artboardStyles(selection);
      default:
        return {}
    }
  }
  const selectionStyles: any = getLayerStyles();
  return (
    <div className='c-sidebar__section'>
      <div className='c-sidebar__header'>
        <span>Styles</span>
      </div>
      {
        selection
        ? <div className='c-sidebar-styles'>
            {
              Object.keys(selectionStyles).map((key: any, index: number) => (
                <div className='c-sidebar-styles__style' key={index}>
                  <SidebarStylesProp prop={key} />
                  <SidebarStylesValue value={selectionStyles[key]} />
                </div>
              ))
            }
          </div>
        : <div className='c-sidebar__placeholder'>
            <span>Click layer to see styles</span>
          </div>
      }
    </div>
  )
};

export default SidebarStyles;