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
  selection: srm.Artboard | srm.Image | srm.Shape | srm.ShapePath | srm.Text | null;
  images: srm.Base64Image[];
  svgs: srm.SvgPath[];
}

const SidebarStyles = (props: SidebarProps) => {
  const { selection, images, svgs } = props;
  const getLayerStyles = () => {
    if (selection) {
      switch(selection.type) {
        case 'Shape':
          return {...shapeStyles(selection as srm.Shape), ...pathStyles(selection as srm.Shape, svgs)};
        case 'ShapePath':
          return {...shapePathStyles(selection as srm.ShapePath, images), ...pathStyles(selection as srm.ShapePath, svgs)};
        case 'Image':
          return imageStyles(selection as srm.Image, images);
        case 'Text':
          return {...textContainerStyles(selection as srm.Text), ...textStyles(selection as srm.Text)};
        case 'Artboard':
          return artboardStyles(selection as srm.Artboard);
        default:
          return {}
      }
    } else {
      return null;
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