var Graph = require('./graph');
// var GetNeighbors = require('./get-neighbors');
// var findWhere = require('lodash.findwhere');

function renderGraphPane(opts) {
  var tree;

  if (opts) {
    tree = opts.tree;
  }

  var graph = Graph({
    width: 960,
    height: 960
  });

  graph.render();
  graph.renderUpdate(tree);
}

module.exports = renderGraphPane;
