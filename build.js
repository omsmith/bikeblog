var Metalsmith = require('metalsmith'),
	collections = require('metalsmith-collections'),
	markdown = require('metalsmith-markdown'),
	paginate = require('metalsmith-paginate'),
	permalinks = require('metalsmith-permalinks'),
	templates = require('metalsmith-templates'),
	assets = require('metalsmith-assets');

var copyContent = function (files, metalsmith, done) {
	Object
		.keys(files)
		.forEach(function (file) {
			file = files[file];
			file.origContents = file.contents;
		});

	done();
};

Metalsmith(__dirname)
	.clean(false)
	.source('src')
	.destination('dist')
	.use(collections({
		posts: {
			pattern: 'posts/*.md',
			sortBy: 'date',
			reverse: true
		}
	}))
	.use(markdown())
	.use(copyContent)
	.use(permalinks({
		pattern: ':collection/:title'
	}))
	.use(templates('handlebars'))
	.use(assets({
		source: './src/images',
		destination: './images'
	}))
	.build();
