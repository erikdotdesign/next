import * as styles from './layerStyles';
import { styleReducer } from '../utils';

export const pathStyles = (layer: srm.ShapePath, svgs: srm.SvgPath[]) => {
  const svg = styles.createSVG(layer.id, svgs);

  const combined = [
    svg
  ];

  return styleReducer(combined);
};

export default pathStyles;