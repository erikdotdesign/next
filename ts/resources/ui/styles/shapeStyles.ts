import * as styles from './layerStyles';
import { styleReducer, getSVG } from '../utils';

const getSvgBackground = (id: string, frame: srm.Rectangle, svgs: srm.SvgAsset[]): srm.css.BackgroundImage | null => {
  const svg = getSVG(svgs, id);
  if (svg) {
    return {
      backgroundImage: `url(${svg ? svg.src : null})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${frame.width} ${frame.height}`,
      backgroundPosition: 'center center'
    }
  } else {
    return null;
  }
};

const shapeStyles = (layer: srm.Shape, svgs: any[]) => {
  // generate styles
  const baseStyles = styles.createBaseLayerStyles(layer);
  const background = getSvgBackground(layer.id, layer.frame, svgs);
  // combine styles
  const combined = [
    baseStyles,
    background
  ];
  // return final style object
  return styleReducer(combined);
};

export default shapeStyles;