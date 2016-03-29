var d3force = require('./lib/d3-force').layout.force;
var d3 = require('d3-selection');
var Crown = require('csscrown');
var accessor = require('accessor');

var crownPlayerNode = Crown({
  crownClass: 'player-graph-node'
});
var getId = accessor();

function Graph(createOpts) {
  var width;
  var height;
  var random;
  var canSelectNodeFromNode;

  if (createOpts) {
    width = createOpts.width;
    height = createOpts.height;
    random = createOpts.random;
    canSelectNodeFromNode = function yes() {
      return true;
    };
  }

  if (!random) {
    random = Math.random;
  }

  var force;
  var svg;
  var linksSel;
  var nodesSel;

  function render() {
    force = d3force(random)
        .size([width, height])
        .charge(-800)
        .linkDistance(40)
        .on("tick", tick);

    svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

    // svg.classed('invisible', true);    
    // setTimeout(revealSVG, 2000);

    linksSel = svg.selectAll(".link");
    nodesSel = svg.selectAll(".node");
  }

  function renderUpdate(nodes, links) {
    force
        .nodes(nodes)
        .links(links)
        .start();

    linksSel = linksSel.data(links)
      .enter().append("line")
        .attr("class", "link");

    nodesSel = nodesSel.data(nodes)
      .enter().append("circle")
        .attr('id', getId)
        .attr("class", "node")
        .attr("r", 12)
        .on("click", click);
  }

  function tick() {
    linksSel.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodesSel.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  function click(d) {
    var selectedNode;
    var selectedNodeSel = d3.select('.player-graph-node');
    if (!selectedNodeSel.empty()) {
      selectedNode = d3.select('.player-graph-node').datum();
    }

    if (canSelectNodeFromNode(d, selectedNode)) {
      crownPlayerNode(this);
      emitSelectEvent(d);
    }
  }

  // TODO: test.
  function emitSelectEvent(selectedNode) {
    var selectEvent = new CustomEvent(
      'node-selected',
      {
        detail: selectedNode
      }
    );
    document.dispatchEvent(selectEvent);
  }

  function revealSVG() {
    svg.classed('invisible', false);
  }

  return {
    render: render,
    renderUpdate: renderUpdate
  };
}

module.exports = Graph;
