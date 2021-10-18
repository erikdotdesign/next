declare namespace next {
  ////////////////////////////////////////////////////////
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Sketch Models
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  ////////////////////////////////////////////////////////

  type Sketch = any;
  type Buffer = any;

  // Models / Document

  interface Document {
    id: string;
    pages: Page[];
    selectedPage: Page;
    selectedLayers: Selection;
    path: string;
    sharedLayerStyles: SharedStyle[];
    sharedTextStyles: SharedStyle[];
    colors: ColorAsset[];
    gradients: GradientAsset[];
    colorSpace: ColorSpace;
  }

  // Models / Document / ColorSpace

  type ColorSpace = 'Unmanaged' | 'sRGB' | 'P3';

  // Models / Library

  interface Library {
    readonly id: string;
    readonly name: string;
    readonly valid: boolean;
    enabled: boolean;
    readonly libraryType: LibraryType;
    readonly lastModifiedAt: Date;
  }

  // Models / Library / LibraryType

  type LibraryType = 'Internal' | 'User' | 'Remote';

  // Models / ImportableObject

  interface ImportableObject {
    id: string;
    name: string;
    objectType: ImportableObjectType;
    library: Library;
  }

  // Models / ImportableObject / ImportableObjectType

  type ImportableObjectType = 'Symbol' | 'LayerStyle' | 'TextStyle';

  // Models / Style

  interface Style {
    opacity: number;
    blendingMode: BlendingMode;
    blur: Blur;
    fills: Fill[];
    borders: Border[];
    borderOptions: BorderOptions;
    shadows: Shadow[];
    innerShadows: Shadow[];
    alignment: Alignment;
    verticalAlignment: VerticalAlignment;
    kerning: number | null;
    lineHeight: number | null;
    paragraphSpacing: number;
    textColor: string;
    fontSize: number;
    textTransform: TextTransform;
    fontFamily: string;
    fontWeight: FontWeight;
    fontStyle: FontStyle;
    fontVariant: FontVariant;
    fontStretch: FontStretch;
    textUnderline: TextUnderline;
    textStrikethrough: TextStrikethrough;
    fontAxes: FontAxes[];
  }

  // Models / Style / BlendingMode

  type BlendingMode = 'Normal' | 'Darken' | 'Multiply' | 'ColorBurn' | 'Lighten' | 'Screen' | 'ColorDodge' | 'Overlay' | 'SoftLight' | 'HardLight' | 'Difference' | 'Exclusion' | 'Hue' | 'Saturation' | 'Color' | 'Luminosity';

  // Models / Style / Blur

  interface Blur {
    blurType: BlurType;
    radius: number;
    motionAngle: number;
    center: BlurCenter;
    enabled: boolean;
  }

  // Models / Style / Blur / BlurType

  type BlurType = 'Gaussian' | 'Motion' | 'Zoom' | 'Background';

  // Models / Style / Blur / BlurCenter

  interface BlurCenter {
    x: number;
    y: number;
  }

  // Models / Style / Border

  interface Border {
    fillType: FillType;
    color: string;
    gradient: Gradient;
    enabled: boolean;
    position: BorderPosition;
    thickness: number;
  }

  // Models / Style / Border / BorderPosition

  type BorderPosition = 'Center' | 'Inside' | 'Outside';

  // Models / Style / BorderOptions

  interface BorderOptions {
    startArrowhead: ArrowHead;
    endArrowhead: ArrowHead;
    dashPattern: number[];
    lineEnd: LineEnd;
    lineJoin: LineJoin;
  }

  // Models / Style / BorderOptions / ArrowHead

  type ArrowHead = 'None' | 'OpenArrow' | 'FilledArrow' | 'Line' | 'OpenCircle' | 'FilledCircle' | 'OpenSquare' | 'FilledSquare';

  // Models / Style / BorderOptions / LineEnd

  type LineEnd = 'Butt' | 'Round' | 'Projecting';

  // Models / Style / BorderOptions / LineJoin

  type LineJoin = 'Miter' | 'Round' | 'Bevel';

  // Models / Style / Fill

  interface Fill {
    fillType: FillType;
    color: string;
    gradient: Gradient;
    pattern: Pattern;
    enabled: boolean;
  }

  // Models / Style / Fill / FillType

  type FillType = 'Color' | 'Gradient' | 'Pattern';

  // Models / Style / Fill / Gradient

  interface Gradient {
    gradientType: GradientType;
    from: Point;
    to: Point;
    aspectRatio: number;
    stops: GradientStop[];
  }

  // Models / Style / Fill / Gradient / GradientType

  type GradientType = 'Linear' | 'Radial' | 'Angular';

  // Models / Style / Fill / Gradient / GradientStop

  interface GradientStop {
    position: number;
    color: string;
  }

  // Models / Style / Fill / Pattern

  interface Pattern {
    patternType: PatternFillType;
    image: ImageData | null;
    tileScale: number;
  }

  // Models / Style / Fill / Pattern / PatternFillType

  type PatternFillType = 'Tile' | 'Fill' | 'Stretch' | 'Fit';

  // Models / Style / Shadow

  interface Shadow {
    color: string;
    blur: number;
    x: number;
    y: number;
    spread: number;
    enabled: boolean;
  }

  // Models / Style / Alignment

  type Alignment = 'left' | 'right' | 'center' | 'justified';

  // Models / Style / VerticalAlignment

  type VerticalAlignment = 'top' | 'center' | 'bottom';

  // Models / Style / TextTransform

  type TextTransform = 'none' | 'uppercase' | 'lowercase';

  // Models / Style / FontWeight

  type FontWeight = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  // Models / Style / FontStyle

  type FontStyle = 'italic' | undefined;

  // Models / Style / FontVariant

  type FontVariant = 'small-caps' | undefined;

  // Models / Style / FontStretch

  type FontStretch = 'compressed' | 'condensed' | 'narrow' | 'expanded' | 'poster' | undefined;

  // Models / Style / TextUnderline

  type TextUnderline = 'single' | 'thick' | 'double' | 'dot' | 'dash' | 'dash-dot' | 'dash-dot-dot';

  // Models / Style / TextStrikethrough

  type TextStrikethrough = 'single' | 'thick' | 'double' | 'dot' | 'dash' | 'dash-dot' | 'dash-dot-dot';

  // Models / Style / FontAxes

  interface FontAxes {
    id: string;
    min: number;
    max: number;
    value: number;
  }

  // Models / SharedStyle

  interface SharedStyle {
    id: string;
    styleType: StyleType;
    name: string;
    style: Style;
  }

  // Models / SharedStyle / StyleType

  type StyleType = 'Text' | 'Layer' | 'Unknown';

  // Models / Override

  interface Override {
    path: string;
    property: string;
    id: string;
    symbolOverride: boolean;
    value: string | ImageData;
    isDefault: boolean;
    affectedLayer: Text | Image | SymbolInstance;
    editable: boolean;
    selected: boolean | undefined;
  }

  // Models / Flow

  interface Flow {
    target: Artboard | BackTarget;
    targetId: string | BackTarget;
    animationType: AnimationType;
  }

  // Models / Flow / BackTarget

  type BackTarget = any;

  // Models / Flow / AnimationType

  type AnimationType = 'none' | 'slideFromLeft' | 'slideFromRight' | 'slideFromBottom' | 'slideFromTop';

  // Models / ExportFormat

  interface ExportFormat {
    fileFormat: FileFormat;
    prefix: string | undefined;
    suffix: string | undefined;
    size: string;
  }

  // Models / ExportFormat / FileFormat

  type FileFormat = 'jpg' | 'png' | 'tiff' | 'eps' | 'pdf' | 'webp' | 'svg';

  // Models / Selection

  interface Selection {
    layers: Layer[];
    readonly length: number;
    readonly isEmpty: boolean;
  }

  // Models / Point

  interface Point {
    x: number | Point;
    y: number;
  }

  // Models / CurvePoint

  interface CurvePoint {
    point: Point;
    curveFrom: Point;
    curveTo: Point;
    cornerRadius: number;
    pointType: PointType;
  }

  // Models / CurvePoint / PointType

  type PointType = 'Undefined' | 'Straight' | 'Mirrored' | 'Asymmetric' | 'Disconnected';

  // Models / Rectangle

  interface Rectangle {
    x: number;
    y: number;
    height: number;
    width: number;
    changeBasis(basis: any): any;
  }

  // Models / ColorAsset

  interface ColorAsset {
    name: string;
    color: string;
  }

  // Models / GradientAsset

  interface GradientAsset {
    name: string;
    gradient: Gradient;
  }

  // Models / SmartLayout

  type SmartLayout = 'LeftToRight' | 'HorizontallyCenter' | 'RightToLeft' | 'TopToBottom' | 'VerticallyCenter' | 'BottomToTop';

  ////////////////////////////////////////////////////////
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Sketch Layers
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  ////////////////////////////////////////////////////////

  type SketchLayer = Layer | Group | Page | Artboard | Shape | Image | ShapePath | Text | SymbolInstance | HotSpot | Slice;

  // Layers / Layer

  interface Layer {
    id: string;
    name: string;
    parent: Group;
    locked: boolean;
    hidden: boolean;
    frame: Rectangle;
    selected: boolean;
    flow: Flow;
    exportFormats: ExportFormat[];
    transform: Transform;
    index: number;
    type: string;
    sketchObject: any;
    duplicate(): any;
    remove(): any;
  }

  // Layers / Layer / Transform

  interface Transform {
    rotation: number;
    flippedHorizontally: boolean;
    flippedVertically: boolean;
  }

  // Layers / Group

  interface Group extends Layer {
    style: Style;
    sharedStyle: SharedStyle;
    sharedStyleId: string | null;
    layers: Layer[];
    smartLayout: SmartLayout;
  }

  // Layers / Page

  type Page = Omit<Group, 'flow' | 'locked' | 'hidden' | 'exportFormats' | 'transform' | 'style' | 'sharedStyle' | 'sharedStyleId' | 'smartLayout'>;

  // Layers / Artboard

  interface Artboard extends Omit<Group, 'flow' | 'locked' | 'hidden' | 'transform' | 'style' | 'sharedStyle' | 'sharedStyleId' | 'smartLayout' | 'parent'> {
    parent: Page;
    flowStartPoint: boolean;
    background: Background;
  }

  // Layers / Artboard / Background

  interface Background {
    enabled: boolean;
    includedInExport: boolean;
    color: string;
  }

  // Layers / Shape

  interface Shape extends Layer {
    style: Style;
    sharedStyle: SharedStyle;
    sharedStyleId: string | null;
    layers: ShapePath[];
  }

  // Layers / Image

  interface Image extends Layer {
    style: Style;
    sharedStyle: SharedStyle;
    sharedStyleId: string | null;
    image: ImageData;
  }

  // Layers / Image / ImageData

  interface ImageData {
    id: string;
    nsimage: NSImage;
    nsdata: NSData;
  }

  // Layers / Image / ImageData / NSImage

  type NSImage = any;

  // Layers / Image / ImageData / NSData

  type NSData = any;

  // Layers / ShapePath

  interface ShapePath extends Layer {
    style: Style;
    sharedStyle: SharedStyle;
    sharedStyleId: string | null;
    shapeType: ShapeType;
    points: CurvePoint[];
    closed: boolean;
    getSVGPath(): string;
  }

  // Layers / ShapePath / ShapeType

  type ShapeType = 'Rectangle' | 'Oval' | 'Triangle' | 'Polygon' | 'Star' | 'Custom';

  // Layers / Text

  interface Text extends Layer {
    style: Style;
    sharedStyle: SharedStyle;
    sharedStyleId: string | null;
    text: string;
    lineSpacing: LineSpacing;
    fixedWidth: boolean;
  }

  // Layers / Text / LineSpacing

  type LineSpacing = 'constantBaseline' | 'variable';

  // Layers / SymbolMaster

  interface SymbolMaster extends Layer {
    layers: Layer[];
    symbolId: string;
    overrides: Override[];
  }

  // Layers / SymbolMaster / Background

  interface SymbolMasterBackground extends Background {
    includedInInstance: boolean;
  }

  // Layers / SymbolInstance

  interface SymbolInstance extends Layer {
    style: Style;
    sharedStyle: SharedStyle;
    sharedStyleId: string | null;
    master: SymbolMaster;
    overrides: Override[];
    detach(options?: {recursively: boolean}): Group;
  }

  // Layers / HotSpot

  type HotSpot = Omit<Layer, 'exportFormats' | 'transform'>;

  // Layers / Slice

  type Slice = Omit<Layer, 'transform'>;

  ////////////////////////////////////////////////////////
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // App
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  ////////////////////////////////////////////////////////

  type AppLayer = Artboard | Image | Shape | ShapePath | Text | Group;
  type AppArtboardLayer = Image | Shape | ShapePath | Text | Group;

  interface Origin {
    top: number;
    right: number;
    bottom: number;
    left: number;
    yCenter: number;
    xCenter: number;
  }

  interface FontDir {
    location: string;
    contents: string[];
  }

  interface SvgAsset {
    id: string;
    src: string;
  }

  interface ImgAsset {
    id: string;
    src: {
      [`1x`]: string;
      [`2x`]: string;
    };
  }

  interface ArtboardPreProcessedAssets {
    images: ImgAsset[];
    svgs: SvgAsset[];
    fonts: PreProcessedFonts;
  }

  interface ArtboardAssets {
    images: ImgAsset[];
    svgs: SvgAsset[];
    fonts: {
      [id: string]: ProcessedFont[];
    };
  }

  interface Note {
    id: string;
    notes: string[];
  }

  type Theme = 'light' | 'dark';

  interface Store {
    artboard: next.Artboard;
    images: next.ImgAsset[];
    svgs: next.SvgAsset[];
    notes: Note[];
    fonts: {
      [id: string]: ProcessedFont[];
    };
    artboardImage: string;
  }

  interface PreProcessedFontVariant {
    weight: any;
    style: any;
    stretch: any;
  }

  interface PreProcessedFonts {
    allFontFamilies: string[];
    byFamily: {
      [id: string]: PreProcessedFontVariant[];
    }
  }

  interface Font {
    family: string;
    weight: next.FontWeight;
    style: next.FontStyle;
    stretch: next.FontStretch;
  }

  interface ProcessedFont {
    font: Font;
    fileLocation: string;
    fileName: string;
    path: string;
  }

  namespace css {
    namespace value {
      type Top = string;
      type Right = string;
      type Left = string;
      type Bottom = string;
      type Width = string;
      type Height = string;
      type Opacity = number;
      type BorderRadius = string;
      type BoxShadow = string;
      type Filter = string;
      type Background = string;
      type BackgroundImage = string;
      type BackgroundSize = string;
      type BackgroundRepeat = string;
      type BackgroundPosition = string;
      type Fill = string;
      type StrokeWidth = number | string;
      type Stroke = string
      type StrokeLineJoin = string;
      type StrokeDashArray = string;
      type StrokeLineCap = string;
      type D = string;
      type Transform = string;
      type TextTransform = 'uppercase' | 'lowercase';
      type WebkitTextStrokeColor = string;
      type MozTextStrokeColor = string;
      type WebkitTextStrokeWidth = string;
      type MozTextStrokeWidth = string;
      type TextShadow = string;
      type TextDecoration = 'line-through' | 'underline';
      type LetterSpacing = string;
      type FontFamily = string;
      type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
      type FontWeightName = 'thin' | 'hairline' | 'extra light' | 'ultra light' | 'light' | 'normal' | 'medium' | 'semi bold' | 'demi bold' | 'bold' | 'extra bold' | 'ultra bold' | 'black' | 'heavy';
      type FontSize = string;
      type FontStretch = 'extra-condensed' | 'condensed' | 'semi-condensed' | 'expanded' | 'extra-expanded';
      type Color = string;
      type LineHeight = string;
      type PaddingBottom = string;
      type TextAlign = 'left' | 'right' | 'center' | 'justify';
      type FontStyle = 'italic';
      type JustifyContent = 'flex-start' | 'center' | 'flex-end';
      type Overflow = 'visible' | 'hidden';
      type Mask = string;
      type WebkitMaskBoxImage = string;
    }

    interface Left {
      left: next.css.value.Left
    }

    interface Top {
      top: next.css.value.Top
    }

    interface Width {
      width: next.css.value.Width;
    }

    interface Height {
      height: next.css.value.Height;
    }

    interface Opacity {
      opacity: next.css.value.Opacity;
    }

    interface BorderRadius {
      borderRadius: next.css.value.BorderRadius;
    }

    interface BoxShadow {
      boxShadow: next.css.value.BoxShadow;
    }

    interface Background {
      background: next.css.value.Background;
    }

    interface BackgroundImage {
      backgroundImage: next.css.value.BackgroundImage;
      backgroundSize: next.css.value.BackgroundSize;
      backgroundRepeat: next.css.value.BackgroundRepeat;
      backgroundPosition: next.css.value.BackgroundPosition;
    }

    interface GaussianBlur {
      filter: next.css.value.Filter;
    }

    interface Fill {
      fill: next.css.value.Fill;
    }

    interface StrokeWidth {
      strokeWidth: next.css.value.StrokeWidth;
    }

    interface Stroke {
      stroke: next.css.value.Stroke;
    }

    interface StrokeLineJoin {
      strokeLinejoin: next.css.value.StrokeLineJoin;
    }

    interface StrokeDashArray {
      strokeDasharray: next.css.value.StrokeDashArray;
    }

    interface StrokeLineCap {
      strokeLinecap: next.css.value.StrokeLineCap;
    }

    interface D {
      d: next.css.value.D;
    }

    interface Transform {
      transform: next.css.value.Transform;
    }

    interface TextTransform {
      textTransform: next.css.value.TextTransform;
    }

    interface TextStrokeColor {
      WebkitTextStrokeColor: next.css.value.WebkitTextStrokeColor;
      MozTextStrokeColor: next.css.value.MozTextStrokeColor;
    }

    interface TextStrokeWidth {
      WebkitTextStrokeWidth: next.css.value.WebkitTextStrokeWidth;
      MozTextStrokeWidth: next.css.value.MozTextStrokeWidth;
    }

    interface TextStrokeWidth {
      WebkitTextStrokeWidth: next.css.value.WebkitTextStrokeWidth;
      MozTextStrokeWidth: next.css.value.MozTextStrokeWidth;
    }

    interface TextShadow {
      textShadow: next.css.value.TextShadow;
    }

    interface TextDecoration {
      textDecoration: next.css.value.TextDecoration;
    }

    interface LetterSpacing {
      letterSpacing: next.css.value.LetterSpacing;
    }

    interface FontFamily {
      fontFamily: next.css.value.FontFamily;
    }

    interface FontWeight {
      fontWeight: next.css.value.FontWeight;
    }

    interface FontSize {
      fontSize: next.css.value.FontSize;
    }

    interface FontStretch {
      fontStretch: next.css.value.FontStretch;
    }

    interface Color {
      color: next.css.value.Color;
    }

    interface LineHeight {
      lineHeight: next.css.value.LineHeight;
    }

    interface PaddingBottom {
      paddingBottom: next.css.value.PaddingBottom;
    }

    interface TextAlign {
      textAlign: next.css.value.TextAlign;
    }

    interface FontStyle {
      fontStyle: next.css.value.FontStyle;
    }

    interface JustifyContent {
      justifyContent: next.css.value.JustifyContent;
    }

    interface JustifyContent {
      justifyContent: next.css.value.JustifyContent;
    }

    interface Overflow {
      overflow: next.css.value.Overflow;
    }

    interface Mask {
      mask: next.css.value.Mask;
      WebkitMaskBoxImage: next.css.value.WebkitMaskBoxImage;
    }
  }
}