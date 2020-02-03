export const getSystemFontsLocation = () => {
  //@ts-ignore
  const systemLibrary = NSFileManager.defaultManager().URLsForDirectory_inDomains(NSLibraryDirectory, 8)[0];
  const systemLibraryPath = systemLibrary ? systemLibrary.absoluteString().replace('file://', '') : null;
  //@ts-ignore
  const systemFonts = systemLibraryPath ? NSFileManager.defaultManager().fileExistsAtPath(`${systemLibraryPath}Fonts`) : null;
  if (systemFonts) {
    return `${systemLibraryPath}Fonts/`;
  } else {
    return null;
  }
}

export const getUserFontsLocation = () => {
  //@ts-ignore
  const userLibrary = NSFileManager.defaultManager().URLsForDirectory_inDomains(NSLibraryDirectory, 1)[0];
  const userLibraryPath = userLibrary ? userLibrary.absoluteString().replace('file://', '') : null;
  //@ts-ignore
  const userFonts = userLibraryPath ? NSFileManager.defaultManager().fileExistsAtPath(`${userLibraryPath}Fonts`) : null;
  if (userFonts) {
    return `${userLibraryPath}Fonts/`;
  } else {
    return null;
  }
}

export const getRoot = (context: any) => {
  return context.scriptPath.stringByDeletingLastPathComponent().stringByDeletingLastPathComponent().stringByDeletingLastPathComponent();
};

export const getFileContent = (filePath: string) => {
  //@ts-ignore
  return NSString.stringWithContentsOfFile_encoding_error(filePath, 4, nil);
}

export const getSavePath = (context: any) => {
  let filePath = context.document.fileURL()? context.document.fileURL().path().stringByDeletingLastPathComponent(): "~";
  let fileName = context.document.displayName().stringByDeletingPathExtension();
  //@ts-ignore
  let savePanel = NSSavePanel.savePanel();

  savePanel.setTitle("Export spec");
  savePanel.setNameFieldLabel("Export to:");
  savePanel.setPrompt("Export");
  savePanel.setCanCreateDirectories(true);
  savePanel.setNameFieldStringValue(fileName);
  //@ts-ignore
  if (savePanel.runModal() != NSOKButton) {
    return false;
  }

  return savePanel.URL().path();
};

//@ts-ignore
export const writeFile = (options) => {
  //@ts-ignore
  let content: any = NSString.stringWithString(options.content);
  let savePathName: any = [];
  //@ts-ignore
  NSFileManager.defaultManager().createDirectoryAtPath_withIntermediateDirectories_attributes_error(options.path, true, nil, nil);

  savePathName.push(options.path, "/", options.fileName);
  savePathName = savePathName.join("");

  content.writeToFile_atomically_encoding_error(savePathName, false, 4, null);
};

//@ts-ignore
export const moveImages = (images: any[], savePath: string) => {
  const imagesPath = `${savePath}/images`;
  //@ts-ignore
  NSFileManager.defaultManager().createDirectoryAtPath_attributes(imagesPath, nil);
  images.forEach((image: any) => {
    //@ts-ignore
    NSFileManager.defaultManager().moveItemAtPath_toPath_error(image.src[`1x`], `${imagesPath}/${image.id}.png`, nil);
    //@ts-ignore
    NSFileManager.defaultManager().moveItemAtPath_toPath_error(image.src[`2x`], `${imagesPath}/${image.id}@2x.png`, nil);
  });
};

//@ts-ignore
export const moveSVGs = (svgs: any[], savePath: string) => {
  const svgsPath = `${savePath}/svgs`;
  //@ts-ignore
  NSFileManager.defaultManager().createDirectoryAtPath_attributes(svgsPath, nil);
  svgs.forEach((svg: any) => {
    //@ts-ignore
    NSFileManager.defaultManager().moveItemAtPath_toPath_error(svg.src, `${svgsPath}/${svg.id}.svg`, nil);
  });
};

//@ts-ignore
// export const copyFonts = (fonts: string[], savePath: string) => {
//   const extensions = ['ttf', 'otf', 'ttc'];
//   const fontsPath = `${savePath}/fonts`;
//   //@ts-ignore
//   NSFileManager.defaultManager().createDirectoryAtPath_attributes(fontsPath, nil);
//   fonts.forEach((font: any) => {
//     extensions.forEach((extension: string) => {
//       //@ts-ignore
//       const fontPath = `${NSHomeDirectory()}/Library/Fonts/${font}.`;
//       if (NSFileManager.defaultManager().) {

//       }
//     });
//     //@ts-ignore
//     NSFileManager.defaultManager().copyItemAtPath_toPath_error(`${NSHomeDirectory()}/Library/Fonts/${font}.ttf`, `${fontsPath}/${font}.ttf`, nil);
//     //const FontBook = NSFontManager.sharedFontManager().availableFonts();
//   });
// };

const getFontPostScriptFamily = (font: string) => {
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
  return family.reverse().join('');
}

const getSpaceCase = (str: string) => {
  return str.replace(/([A-Z][a-z])/g, (g) => ` ${g}`);
};

const getHyphenCase = (str: string) => {
  return str.replace(/([A-Z][a-z])/g, (g) => `-${g[0].toLowerCase()}${g.substring(1)}`).toLowerCase();
};

const getHyphenCaseAlt = (str: string) => {
  return str.replace(/([A-Z][a-z])/g, (g) => `-${g}`);
}

const getFontNameVariations = (font: string) => {
  const postScript = font;
  const family = getFontPostScriptFamily(font);
  const familySpaceCase = getSpaceCase(family);
  const familyHyphenCase = getHyphenCaseAlt(family);
  const weight = font.substr(family.length + 1, family.length);
  // const weightSpaceCase = getSpaceCase(weight);
  // const weightHyphenCase = getHyphenCaseAlt(weight);
  const spaceCase = `${familySpaceCase} ${weight}`;
  const hyphenCase = `${familyHyphenCase}-${weight}`;
  return [
    postScript,
    family,
    spaceCase,
    hyphenCase
  ];
}

export const copyFonts = (fonts: string[], savePath: string) => {
  const userFontsLoc = getUserFontsLocation();
  const systemFontsLoc = getSystemFontsLocation();
  const suplimentalFontsLoc = `${systemFontsLoc}Supplemental/`
  const fontExtensions = ['ttf', 'otf', 'ttc'];
  const fontLocations = [userFontsLoc, systemFontsLoc, suplimentalFontsLoc];
  const fontsSavePath = `${savePath}/fonts`;
  //@ts-ignore
  NSFileManager.defaultManager().createDirectoryAtPath_attributes(fontsSavePath, nil);
  fonts.forEach((font: any) => {
    const nameVariants = getFontNameVariations(font);
    fontLocations.forEach((location: string | null) => {
      if (location) {
        fontExtensions.forEach((extension: string) => {
          nameVariants.forEach((nameVariant: string) => {
            const fontVariantPath = `${location}${nameVariant}.${extension}`;
            //@ts-ignore
            if (NSFileManager.defaultManager().fileExistsAtPath(fontVariantPath)) {
              //@ts-ignore
              NSFileManager.defaultManager().copyItemAtPath_toPath_error(fontVariantPath, `${fontsSavePath}/${nameVariant}.${extension}`, nil);
            }
          });
        });
      }
    });
  });
};