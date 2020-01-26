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
  //@ts-ignore
  NSFileManager.defaultManager().createDirectoryAtPath_attributes(`${savePath}/images`, nil);
  images.forEach((image: any) => {
    //@ts-ignore
    NSFileManager.defaultManager().moveItemAtPath_toPath_error(image.src, `${savePath}/images/${image.id}.png`, nil);
  });
};