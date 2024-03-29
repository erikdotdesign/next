import * as styles from './layerStyles';
import { getImage, getScaledImage, styleReducer } from '../utils';

const getImageBackground = (imageId: string, images: next.ImgAsset[]): next.css.BackgroundImage | null => {
  const image = getImage(images, imageId);
  const scaledImage = image ? getScaledImage(image) : null;
  if (image) {
    return {
      backgroundImage: `url(${scaledImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center center'
    }
  } else {
    return null;
  }
};

const imageStyles = (layer: next.Image, images: next.ImgAsset[]) => {
  const { style } = layer;
  const imageBackground = getImageBackground(layer.image.id, images);
  const baseStyles = styles.createBaseLayerStyles(layer);
  const background = styles.createBackground(layer, images);
  const borders = styles.createBorders(style.borders);
  const shadows = styles.createShadows(style.shadows);
  const innerShadows = styles.createInnerShadows(style.innerShadows);
  const bordersAndShadows = styles.combineBordersAndShadows([borders, shadows, innerShadows]);

  const combined = [
    baseStyles,
    imageBackground,
    background,
    bordersAndShadows,
  ];

  return styleReducer(combined);
};

export default imageStyles;