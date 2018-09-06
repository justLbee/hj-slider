const prop = ( data, name ) => data.map( item => item[ name ] ),
  summ = data => data.reduce(( total, value ) => total + value, 0 );

class SpriteGenerator {
  constructor( container ) {
    this.uploadButton = container.querySelector( '.sprite-generator__upload' );

    this.submitButton = container.querySelector( '.sprite-generator__generate' );
    this.imagesCountContainer = container.querySelector( '.images__added-count-value' );
    this.codeContainer = container.querySelector( '.sprite-generator__code' );
    this.imageElement = container.querySelector( '.sprite-generator__result-image' );
    this.images = [];

    this.imagesCount = 0;

    this.registerEvents();
  }
  registerEvents() {
  }
}

new SpriteGenerator( document.getElementById( 'generator' ));

const spriteGen = new SpriteGenerator(document.getElementById( 'generator' ));
spriteGen.registerEvents = function() {
  this.uploadButton.addEventListener('change', this.uploadFiles);
  this.submitButton.addEventListener('click', this.generateSprite);
};

spriteGen.uploadFiles = function (event) {
	console.log(this);

	const files = Array.from(event.currentTarget.files);

	spriteGen.updateFilesInfo(files);
};

spriteGen.updateFilesInfo = function (files) {
	// console.log(files);
	files.forEach(file => {
		const img = document.createElement('img');

		img.width = 50;
		img.height = 50;
		img.src = URL.createObjectURL(file);
		img.name = file.name;

		this.images.push(img);
		// console.log(this.imageElement);
	});
};

spriteGen.generateSprite = function (event) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	spriteGen.images.forEach(image => {
		const pattern = ctx.createPattern(image, 'repeat');
		ctx.beginPath();

		ctx.fillStyle = pattern;
		ctx.fillRect(0, 0, 50, 50);
	});

	spriteGen.imageElement.src = canvas.toDataURL();
	// console.log(canvas.toDataURL());
};

spriteGen.registerEvents();
