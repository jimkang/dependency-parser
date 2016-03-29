var Graph = require('./graph');
// var GetNeighbors = require('./get-neighbors');
// var findWhere = require('lodash.findwhere');

function renderGraphPane(opts) {
  var random;
  var nodes;
  var links;

  if (opts) {
    random = opts.random;
    nodes = opts.nodes;
    links = opts.links;    
  }

  var graph = Graph({
    width: 960,
    height: 550,
    random: random
  });

  graph.render();
  graph.renderUpdate(nodes, links);
}

module.exports = renderGraphPane;
