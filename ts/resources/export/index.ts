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

export const getSupplementalFontsLocation = () => {
  //@ts-ignore
  const systemLibrary = NSFileManager.defaultManager().URLsForDirectory_inDomains(NSLibraryDirectory, 8)[0];
  const systemLibraryPath = systemLibrary ? systemLibrary.absoluteString().replace('file://', '') : null;
  //@ts-ignore
  const systemFonts = systemLibraryPath ? NSFileManager.defaultManager().fileExistsAtPath(`${systemLibraryPath}Fonts/Supplemental`) : null;
  if (systemFonts) {
    return `${systemLibraryPath}Fonts/Supplemental/`;
  } else {
    return null;
  }
}

export const getUserFonts = () => {
  const userFontsLoc = getUserFontsLocation();
  if (userFontsLoc) {
    //@ts-ignore
    const userFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(userFontsLoc, nil);
    return Array.from(userFonts, (item) => { return String(item) });
  } else {
    return null;
  }
}

export const getSystemFonts = () => {
  const systemFontsLoc = getSystemFontsLocation();
  if (systemFontsLoc) {
    //@ts-ignore
    const systemFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(systemFontsLoc, nil);
    return Array.from(systemFonts, (item) => { return String(item) });
  } else {
    return null;
  }
}

export const getSupplimentalFonts = () => {
  const supplementalFontsLoc = getSupplementalFontsLocation();
  if (supplementalFontsLoc) {
    //@ts-ignore
    const supplementalFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(supplementalFontsLoc, nil);
    return Array.from(supplementalFonts, (item) => { return String(item) });
  } else {
    return null;
  }
}

export const getAllFonts = () => {
  const userFontsLoc = getUserFontsLocation();
  const systemFontsLoc = getSystemFontsLocation();
  const supplementalFontsLoc = getSupplementalFontsLocation();
  const userFonts = getUserFonts();
  const systemFonts = getSystemFonts();
  const supplementalFonts = getSupplimentalFonts();
  const fontLocations = [userFontsLoc, systemFontsLoc, supplementalFontsLoc];
  const fontLocationContents = [userFonts, systemFonts, supplementalFonts];
  return fontLocations.map((fontLocation: string | null, index: number) => {
    return {
      location: fontLocation,
      contents: fontLocationContents[index]
    }
  });
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

const getFontNameVariations = (font: string) => {
  const noSpace = font.replace(/\s/g, '');
  const hyphenCase = font.replace(/\s/g, '-');
  return [
    font,
    noSpace,
    hyphenCase
  ];
}

const containsFontVariation = (string: string, variations: string[]) => {
  let contains = false;
  const normalizedString = string.toUpperCase();
  variations.forEach((variation: string) => {
    const normalizedVariant = variation.toUpperCase();
    if (normalizedString.indexOf(normalizedVariant) !== -1) {
      contains = true;
    }
  });
  return contains;
}

export const copyFonts = (fonts: string[], savePath: string) => {
  const allFonts = getAllFonts();
  const fontsSavePath = `${savePath}/fonts`;
  //@ts-ignore
  NSFileManager.defaultManager().createDirectoryAtPath_attributes(fontsSavePath, nil);
  fonts.forEach((font: string) => {
    allFonts.forEach((fontDir: any) => {
      if (fontDir.location) {
        const fontNameVariations = getFontNameVariations(font);
        const fontFiles = fontDir.contents.filter((fontFile: string) => {
          return containsFontVariation(fontFile, fontNameVariations);
        });
        if (fontFiles) {
          //@ts-ignore
          NSFileManager.defaultManager().createDirectoryAtPath_attributes(`${fontsSavePath}/${font}`, nil);
          fontFiles.forEach((fontFile: string) => {
            //@ts-ignore
            NSFileManager.defaultManager().copyItemAtPath_toPath_error(`${fontDir.location}/${fontFile}`, `${fontsSavePath}/${font}/${fontFile}`, nil);
          });
        }
      }
    });
  });
};