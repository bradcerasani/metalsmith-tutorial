var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var Handlebars = require('handlebars');
var fs = require('fs');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');

var header = "/templates/partials/header.handlebars";
var footer = "/templates/partials/footer.handlebars";

Handlebars.registerPartial('header', fs.readFileSync(__dirname + header).toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + footer).toString());

var findTemplate = function(config) {
  var pattern = new RegExp(config.pattern);

  return function(files, metalsmith, done) {
    for (var file in files) {
      if (pattern.test(file)) {
        var _f = files[file];
        if (!_f.template) {
          _f.template = config.templateName;
        }
      }
    }
    done();
  };
};

Metalsmith(__dirname)
  .use(collections({
    pages: {
      pattern: 'content/pages/*.markdown'
    },
    posts: {
      pattern: 'content/posts/*.markdown',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(findTemplate({
    pattern: 'posts',
    templateName: 'post.handlebars'
  }))
  .use(markdown())
  .use(permalinks({
    pattern:':collection/:title'
  }))
  .use(templates('handlebars'))
  .destination('./build')
  .build()
