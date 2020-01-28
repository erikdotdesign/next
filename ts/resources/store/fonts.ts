const getFonts = (layers: srm.SketchLayer[], fonts: any[] = []) => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        getFonts((<srm.Group>layer).layers, fonts);
      } else if (layer.type === 'Text') {
        const fontFamily = (<srm.Text>layer).style.fontFamily;
        if (fonts && !fonts.includes(fontFamily)) {
          fonts.push(fontFamily);
        }
      }
    });
  }
  return fonts;
};

export default getFonts;