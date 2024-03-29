import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarPlaceholder from './SidebarPlaceholder';
import SidebarRightStylesValue from './SidebarRightStylesValue';
import SidebarRightStylesProp from './SidebarRightStylesProp';

import groupStyles from '../styles/groupStyles';
import artboardStyles from '../styles/artboardStyles';
import shapeStyles from '../styles/shapeStyles';
import shapePathStyles from '../styles/shapePathStyles';
import imageStyles from '../styles/imageStyles';
import { textContainerStyles, textStyles } from '../styles/textStyles';

interface SidebarRightStylesProps {
  selection: next.AppLayer | null;
  images: next.ImgAsset[];
  svgs: next.SvgAsset[];
}

const SidebarRightStyles = (props: SidebarRightStylesProps) => {
  const { selection, images, svgs } = props;
  const getLayerStyles = () => {
    if (selection) {
      switch(selection.type) {
        case 'Group':
          return groupStyles(selection as next.Group, svgs);
        case 'Shape':
          return shapeStyles(selection as next.Shape, svgs);
        case 'ShapePath':
          return shapePathStyles(selection as next.ShapePath, images);
        case 'Image':
          return imageStyles(selection as next.Image, images);
        case 'Text':
          return {...textContainerStyles(selection as next.Text), ...textStyles(selection as next.Text)};
        case 'Artboard':
          return artboardStyles(selection as next.Artboard);
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
      <SidebarHeader text='Styles' />
      {
        selection
        ? <div className='c-sidebar-right__styles'>
            {
              Object.keys(selectionStyles).map((key: any, index: number) => (
                <div className='c-sidebar-right__style' key={index}>
                  <SidebarRightStylesProp prop={key} />
                  <SidebarRightStylesValue prop={key} value={selectionStyles[key]} />
                </div>
              ))
            }
          </div>
        : <SidebarPlaceholder text='Click layer to see styles' />
      }
    </div>
  )
};

export default SidebarRightStyles;