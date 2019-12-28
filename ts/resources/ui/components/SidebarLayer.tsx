import React from 'react';
// @ts-ignore
import hyphenate from 'hyphenate-style-name';
import {
  createShapePathStyles,
  createArtboardStyles,
  createImageStyles
} from '../../utils/layerStyles';
import {
  textContainerStyles,
  textStyles
} from '../../utils/textStyles';

interface SidebarProps {
  layer: any;
  images: any;
}

class SidebarLayer extends React.Component<SidebarProps, {}> {
  getLayerStyles = (layer: any) => {
    switch(layer.type) {
      case 'ShapePath':
        return createShapePathStyles(layer, this.props.images);
      case 'Image':
        return createImageStyles(layer, this.props.images);
      case 'Text':
        return {...textContainerStyles(layer), ...textStyles(layer)};
      case 'Artboard':
        return createArtboardStyles(layer);
    }
  }
  render() {
    const { layer } = this.props;
    const layerStyles = this.getLayerStyles(layer);
    return (
      <div className='c-sidebar__layer'>
        <h2 className='c-sidebar-layer__name'>{layer.name}</h2>
        <div className='c-sidebar-layer__styles'>
          {
            layerStyles
            ? Object.keys(layerStyles).map((key: any, index: number) => (
                <div className='c-sidebar-layer__css' key={index}>
                  <div className='c-sidebar-layer__prop'>{hyphenate(key)}</div>
                  <div className='c-sidebar-layer__value'>
                    <input type='text' readOnly value={layerStyles[key]} />
                  </div>
                </div>
              ))
            : null
          }
        </div>
      </div>
    );
  }
}

export default SidebarLayer;