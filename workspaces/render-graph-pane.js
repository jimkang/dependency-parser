var Graph = require('./graph');
// var GetNeighbors = require('./get-neighbors');
// var findWhere = require('lodash.findwhere');

function renderGraphPane(opts) {
  var tree;

  if (opts) {
    tree = opts.tree;
  }

  var graph = Graph({
    width: 750,
    height: 750
  });

  graph.render();
  graph.renderUpdate(tree);
}

module.exports = renderGraphPane;
