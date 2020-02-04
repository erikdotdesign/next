const getFonts = (layers: srm.SketchLayer[], fonts: any[] = []) => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        getFonts((<srm.Group>layer).layers, fonts);
      } else if (layer.type === 'Text') {
        const fontFamily = (<srm.Text>layer).style.fontFamily;
        //@ts-ignore
        const availableFamilies = NSFontManager.sharedFontManager().availableFontFamilies();
        const availableFamiliesArray: string[] = Array.from(availableFamilies, (item) => {
          return String(item);
        });
        const fontAvailable = availableFamiliesArray.includes(fontFamily);
        if (fonts && fontAvailable && !fonts.includes(fontFamily)) {
          fonts.push(fontFamily);
        }
      }
    });
  }
  return fonts;
};

export default getFonts;