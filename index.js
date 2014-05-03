var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var Handlebars = require('handlebars');
var fs = require('fs');

var header = "/templates/partials/header.handlebars";
var footer = "/templates/partials/footer.handlebars";

Handlebars.registerPartial('header', fs.readFileSync(__dirname + header).toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + footer).toString());

Metalsmith(__dirname)
  .use(markdown())
  .use(templates('handlebars'))
  .destination('./build')
  .build()
