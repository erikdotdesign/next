import chroma from 'chroma-js';

export const getLayerNotes = (layerId: string, notes: next.Note[]) => {
  return notes.find((layerNote: next.Note) => {
    return layerNote.id === layerId;
  });
};

export const getNestedNoteCount = (groupLayer: next.AppLayer, notes: next.Note[])  => {
  let groups: any[] = [groupLayer];
  let count = 0;
  let i = 0;
  while (i < groups.length) {
    groups[i].layers.forEach((layer: next.SketchLayer) => {
      const layerNotes = notes.find((layerNote: next.Note) => {
        return layerNote.id === layer.id;
      });
      count = count + (layerNotes ? layerNotes.notes.length : 0);
      if (layer.type === 'Group') {
        groups.push(layer);
      }
    });
    i++;
  }
  return count;
};

export const getCSSUrl = (prop: string, value: string) => {
  if (prop === 'WebkitMaskBoxImage') {
    let nonUrl = ` 100 100 0 0 stretch stretch`;
    return value.slice(0, value.length - nonUrl.length);
  } else {
    return value;
  }
}

export const getScaledImage = (image: next.ImgAsset): string  => {
  const dpr = window.devicePixelRatio;
  return dpr > 1 ? image.src[`2x`] : image.src[`1x`];
};

export const getImage = (images: next.ImgAsset[], id: string): next.ImgAsset | undefined  => {
  return images.find((image: next.ImgAsset) => image.id === id);
};

export const getSVG = (svgs: next.SvgAsset[], id: string): next.SvgAsset | undefined  => {
  return svgs.find((svg: next.SvgAsset) => svg.id === id);
};

export const getAbsolutePosition = (artboardId: string, layerId: string) => {
  const layerEl = document.getElementById(layerId);
  var x = 0;
  var y = 0;
  var layer = layerEl;
  while (layer && layer.id !== artboardId) {
    x = x + layer?.offsetLeft;
    y = y + layer?.offsetTop;
    // @ts-ignore
    layer = layer.offsetParent;
  }
  return {x, y}
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

export const getOrigin = (layer: next.AppLayer, artboard: next.Artboard): next.Origin => {
  const absolutePosition = getAbsolutePosition(artboard.id, layer.id);
  const layerFrame = {...layer.frame, ...absolutePosition};
  const { x, y, width, height } = layerFrame;
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