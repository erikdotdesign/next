import chroma from 'chroma-js';

export const getNestedPosition = (layers: srm.AppArtboardLayer, id: string)  => {

};

export const getImage = (images: srm.Base64Image[], id: string): srm.Base64Image | undefined  => {
  return images.find((image: srm.Base64Image) => image.id === id);
};

export const getSVG = (svgs: srm.SvgPath[], id: string): srm.SvgPath | undefined  => {
  return svgs.find((svg: srm.SvgPath) => svg.id === id);
};

export const cssColor = (color: string): string => {
  return chroma(color).css();
};

export const styleReducer = (combinedStyles: any[]) => {
  // removed null styles
  const filtered = combinedStyles.filter((style: any) => style !== null);
  // return final style object
  return filtered.reduce((styles: any, style: any) => {
    return {...styles, ...style};
  }, {});
};

export const getOrigin = (frame: srm.Rectangle): srm.Origin => {
  const { x, y, width, height } = frame;
  return {
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    yCenter: y + height / 2,
    xCenter: x + width / 2
  }
};

export const placeLeft = (selectionOriginLeft: number, artboardWidth: number): boolean => {
  if (selectionOriginLeft > artboardWidth / 2) {
    return true;
  } else {
    return false;
  }
};

export const placeTop = (selectionOriginTop: number, artboardHeight: number): boolean => {
  if (selectionOriginTop > artboardHeight / 2) {
    return true;
  } else {
    return false;
  }
};