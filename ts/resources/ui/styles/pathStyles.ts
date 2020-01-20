import * as styles from './layerStyles';
import { styleReducer } from '../utils';

export const pathStyles = (layer: srm.Shape | srm.ShapePath, svgs: srm.SvgPath[]) => {
  const svg = styles.createSVG(layer.id, svgs);

  const combined = [
    svg
  ];

  return styleReducer(combined);
};

export default pathStyles;