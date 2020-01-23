![icon](images/icon.png)

# Sketch Measure React

A sketch plugin to export your designs as react applications. Quickly share design specs, css, and assets.

## Getting Started

Select an artboard in your sketch file.

![Select an artboard](images/screen-1.png)

Run plugin to compose export.

![Run plugin to compose export](images/screen-2.png)

Hover over layers to see dimensions.

![Hover over layers to see dimensions](images/screen-3.png)

Select layers to see styles and assets. While selected, you can hover over other layers to see relative spacing.

![Select layers to see styles and assets](images/screen-4.png)

Images are base64 strings.

![Images are base64 strings](images/screen-5.png)

Add layer notes.

![Add layer notes 1](images/screen-6.png)

![Add layer notes 2](images/screen-7.png)

Shapes and ShapePaths that aren't ovals or rectangles are converted to svgs.

![Shapes converted to svgs](images/screen-8.png)

Quickly copy styles, images, and svgs to clipboard.

![Quickly copy styles, images, and svgs to clipboard 1](images/screen-9.png)

![Quickly copy styles, images, and svgs to clipboard 2](images/screen-10.png)

Export spec

![Export spec 1](images/screen-11.png)

![Export spec 2](images/screen-12.png)

Export folder structure. Open spec.html in your preferred browser to view spec.

![Export folder structure](images/screen-13.png)

![Export example](images/screen-14.png)

Toggle note indicators with show/hide notes.

![hide notes](images/screen-15.png)

![show notes](images/screen-16.png)

### Spec Export Details

- Max canvas size: `20,000px` by `20,000px`
- All symbols are detached. (does not affect original symbols)
- All layers are ungrouped. (does not affect original artboard)
- Hidden or transparent layers are not included in spec.
- Gradients are converted to images.
- Any group containing a mask will be converted to an image.
- Shapes and ShapePaths that aren't ovals or rectangles are converted to svgs.
- Layer `Borders`, `Shadows`, and `Inner-Shadows` are combined and converted to a single css `box-shadow`.
- Spec is not responsive.

### Key Bindings

- Zoom in: `control` `option` `command` `+`
- Zoom out: `control` `option` `command` `-`
- Re-center canvas: `control` `option` `command` `enter`
- Supports trackpad pinch zoom and mouse wheel zoom (Semi-broken on chrome. Disable native chrome pinch zoom for best results).

### Prerequisites

- Sketch: v.61.2
- Browser: Safari, Firefox, or Chrome.

### Installing

1. Download or clone repo
2. Open `sr-measure.sketchplugin`