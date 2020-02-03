const getFonts = (layers: srm.SketchLayer[], fonts: any[] = []) => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        getFonts((<srm.Group>layer).layers, fonts);
      } else if (layer.type === 'Text') {
        const fontFamily = (<srm.Text>layer).style.fontFamily;
        const font = (<srm.Text>layer).sketchObject.fontPostscriptName();
        //@ts-ignore
        const availableFamilies: string[] = Array.from(NSFontManager.sharedFontManager().availableFontFamilies());
        const fontAvailable = availableFamilies.filter((family: string) => {
          return String(family) === String(fontFamily);
        });
        if (fonts && fontAvailable && !fonts.includes(font)) {
          let pastWeight = false;
          let family = [];
          let i = 0;
          const postScriptArray = font.split('').reverse();
          while(i < postScriptArray.length) {
            if (pastWeight) {
              family.push(postScriptArray[i]);
            }
            if (postScriptArray[i] === '-' && !pastWeight) {
              pastWeight = true;
            }
            i++
          }
          fonts.push({
            family: family.reverse().join(''),
            postScript: font
          });
        }
      }
    });
  }
  return fonts;
};

export default getFonts;