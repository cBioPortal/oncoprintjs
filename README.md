# OncoprintJS
This is the library that generates the Oncoprint visualization in cBioPortal. Essentially, it populates a canvas of a grid of `m` tracks of `n` types, where each element can either be a discrete value represented by a colored glyph on a grey background or a continuous value within a color range. Oncoprint can have many conceivable uses, but in cBioPortal, it is primarily used to visualize tracks of `m` genes and `n` patient samples, where the colored glyphs represent genomic alterations. It is also used to display a heatmap of gene and/or protein expression values for those `m` genes and `n` patient samples.

## Getting Started
First, clone the repo:

	git clone https://github.com/cBioPortal/oncoprintjs.git

Install the necessary NPM packages defined in `package.json`, create the output folder, `gulp` the files, and put images where they can be found by the server:

	cd oncoprintjs
	npm install
	mkdir -p dist
	mkdir -p dist/img
	gulp
	cp dist/*.svg dist/img

You should now have a folder `dist/` with the oncoprint files in it, including `oncoprint-bundle.js`. This is the original library file.

## Changes to Oncoprint
If you make changes to the Oncoprint code base and want to load it into the examples, do not modify `oncoprint-bundle.js`, since all of your code will get overwritten when gulped. Instead, modify the files in `src/` and then re-run `gulp`.

## Minimum Working Example
The `test/` folder contains `index.html`, which holds the code that runs the examples. 






