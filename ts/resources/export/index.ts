export const getSystemFontsLocation = (): string | null => {
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

export const getUserFontsLocation = (): string | null => {
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

export const getSupplementalFontsLocation = (): string | null => {
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

export const getUserFonts = (): string[] | null => {
  const userFontsLoc = getUserFontsLocation();
  if (userFontsLoc) {
    //@ts-ignore
    const userFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(userFontsLoc, nil);
    return Array.from(userFonts, (item) => { return String(item) });
  } else {
    return null;
  }
}

export const getSystemFonts = (): string[] | null => {
  const systemFontsLoc = getSystemFontsLocation();
  if (systemFontsLoc) {
    //@ts-ignore
    const systemFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(systemFontsLoc, nil);
    return Array.from(systemFonts, (item) => { return String(item) });
  } else {
    return null;
  }
}

export const getSupplimentalFonts = (): string[] | null => {
  const supplementalFontsLoc = getSupplementalFontsLocation();
  if (supplementalFontsLoc) {
    //@ts-ignore
    const supplementalFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(supplementalFontsLoc, nil);
    return Array.from(supplementalFonts, (item) => { return String(item) });
  } else {
    return null;
  }
}

export const getAllFonts = (): next.FontDir[] | null => {
  const userFontsLoc = getUserFontsLocation();
  const systemFontsLoc = getSystemFontsLocation();
  const supplementalFontsLoc = getSupplementalFontsLocation();
  const userFonts = getUserFonts();
  const systemFonts = getSystemFonts();
  const supplementalFonts = getSupplimentalFonts();
  const fontLocations = [userFontsLoc, systemFontsLoc, supplementalFontsLoc];
  const fontLocationContents = [userFonts, systemFonts, supplementalFonts];
  const availableFontLocations = fontLocations.filter((fontDir: string | null) => fontDir !== null);
  if (availableFontLocations.length > 0) {
    const allFonts = (availableFontLocations as string[]).map((fontLocation: string, index: number) => {
      return {
        location: fontLocation,
        contents: fontLocationContents[index]
      }
    });
    return allFonts as next.FontDir[];
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
export const moveImages = (images: next.ImgAsset[], savePath: string) => {
  const imagesPath: string = `${savePath}/images`;
  //@ts-ignore
  NSFileManager.defaultManager().createDirectoryAtPath_attributes(imagesPath, nil);
  images.forEach((image: next.ImgAsset) => {
    //@ts-ignore
    NSFileManager.defaultManager().moveItemAtPath_toPath_error(image.src[`1x`], `${imagesPath}/${image.id}.png`, nil);
    //@ts-ignore
    NSFileManager.defaultManager().moveItemAtPath_toPath_error(image.src[`2x`], `${imagesPath}/${image.id}@2x.png`, nil);
  });
};

//@ts-ignore
export const moveFonts = (fonts: { [id: string]: next.FontWithPath[] }, savePath: string) => {
  const fontsPath: string = `${savePath}/fonts`;
  //@ts-ignore
  NSFileManager.defaultManager().createDirectoryAtPath_attributes(fontsPath, nil);
  Object.keys(fonts).forEach((fontFamily) => {
    const fontFiles = fonts[`${fontFamily}`];
    const fontFamilyDir = `${fontsPath}/${fontFamily}`;
    //@ts-ignore
    NSFileManager.defaultManager().createDirectoryAtPath_attributes(fontFamilyDir, nil);
    fontFiles.forEach((fwp) => {
      //@ts-ignore
      NSFileManager.defaultManager().moveItemAtPath_toPath_error(fwp.path, `${fontFamilyDir}/${fwp.fileName}`, nil);
    });
  });
};

//@ts-ignore
export const moveSVGs = (svgs: next.SvgAsset[], savePath: string) => {
  const svgsPath: string = `${savePath}/svgs`;
  //@ts-ignore
  NSFileManager.defaultManager().createDirectoryAtPath_attributes(svgsPath, nil);
  svgs.forEach((svg: next.SvgAsset) => {
    //@ts-ignore
    NSFileManager.defaultManager().moveItemAtPath_toPath_error(svg.src, `${svgsPath}/${svg.id}.svg`, nil);
  });
};

export const embedFont = (fontFamily: string, fontFiles: next.ProcessedFont[]): string => {
  return fontFiles.reduce((result, current) => {
    // const processedFile = processFontFile(current);
    // create variant fontFace string for css embed
    const fontFace = `
      @font-face {
        font-family: '${fontFamily}';
        font-weight: ${current.font.weight};
        font-stretch: ${current.font.stretch};
        font-style: ${current.font.style};
        src: url("./fonts/${fontFamily}/${current.fileName}");
      }
    `;
    // append variant fontFace string to result
    result = `${result} ${fontFace}`;
    // result result
    return result;
  }, '');
};

export const embedFonts = (fonts: { [id: string]: next.ProcessedFont[] }, styleContent: any): string => {
  return Object.keys(fonts).reduce((result: any, current) => {
    const fontFiles = fonts[`${current}`];
    const fontFamilyEmbedString = embedFont(current, fontFiles);
    result = `${result} ${fontFamilyEmbedString}`;
    return result;
  }, styleContent);
};

export const embedTempFont = (fontFamily: string, fontFiles: next.ProcessedFont[]): string => {
  return fontFiles.reduce((result, current) => {
    // const processedFile = processFontFile(current);
    // create variant fontFace string for css embed
    const fontFace = `
      @font-face {
        font-family: '${fontFamily}';
        font-weight: ${current.font.weight};
        font-stretch: ${current.font.stretch};
        font-style: ${current.font.style};
        src: url("file:/${current.path}");
      }
    `;
    // append variant fontFace string to result
    result = `${result} ${fontFace}`;
    // result result
    return result;
  }, '');
};

export const embedTempFonts = (fonts: { [id: string]: next.ProcessedFont[] }, styleContent: any): void => {
  return Object.keys(fonts).reduce((result, current) => {
    const fontFiles = fonts[`${current}`];
    const fontFamilyEmbedString = embedTempFont(current, fontFiles);
    result = `${result} ${fontFamilyEmbedString}`;
    return result;
  }, styleContent);
};

export const getFinalStore = (store: next.Store) => {
  // copy store, and set final store
  let finalStore: next.Store = {...store};
  // update final store image paths
  finalStore.images = store.images.map((image) => {
    return {
      id: image.id,
      src: {
        [`1x`]: `images/${image.id}.png`,
        [`2x`]: `images/${image.id}@2x.png`
      }
    }
  });
  // update final store svg paths
  finalStore.svgs = store.svgs.map((svg: any) => {
    return {
      id: svg.id,
      src: `svgs/${svg.id}.svg`
    }
  });
  // return strigified final store
  return JSON.stringify(finalStore);
};