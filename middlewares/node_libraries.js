const express = require('express');
const path = require('path');
module.exports = (app) => {
  app.use('/dist/axios', express.static(path.join(__dirname, '../node_modules/axios/dist')));
  app.use('/dist/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
  app.use('/dist/medium-editor', express.static(path.join(__dirname, '..//node_modules/medium-editor/dist')));
  app.use('/dist/handlebars', express.static(path.join(__dirname, '../node_modules/handlebars/dist')));
  app.use('/dist/blueimp-file-upload', express.static(path.join(__dirname, '../node_modules/blueimp-file-upload/js')));
  app.use('/dist/medium-editor-insert-plugin', express.static(path.join(__dirname, '../node_modules/medium-editor-insert-plugin')));
  app.use('/dist/medium-editor', express.static(path.join(__dirname, '../node_modules/medium-editor/dist')));
  app.use('/dist/jquery-sortable', express.static(path.join(__dirname, '../node_modules/jquery-sortable/source/js')));
  app.use('/dist/materialize', express.static(path.join(__dirname, '../node_modules/materialize-css/dist')));
};
