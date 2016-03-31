var d3tree = require('./lib/d3-tree').layout.tree;
var d3 = require('d3-selection');
var shape = require('d3-shape');
var Crown = require('csscrown');
var accessor = require('accessor');

var crownPlayerNode = Crown({
  crownClass: 'player-graph-node'
});
var getId = accessor();
var getX = accessor('x');
var getY = accessor('y');

function separation(a, b) {
  return a.depth === b.depth ? 3 : 2;
}

function setYWithDepth(d) {
  d.y = d.depth * 100;
}

function getLinkId(link) {
  return 'link_' + link.source.sentencePos + '_' + link.target.sentencePos;
}

function Graph(createOpts) {
  var width;
  var height;
  var canSelectNodeFromNode;

  if (createOpts) {
    width = createOpts.width;
    height = createOpts.height;
    canSelectNodeFromNode = function yes() {
      return true;
    };
  }

  var tree;
  var svg;
  var shiftedGroup;
  var linkRoot;
  var circleRoot;
  var textRoot;

  var marginX = 50;
  var marginY = 50;

  function render() {
    tree = d3tree()
        .size([width - 2 * marginX, height - 2 * marginY]);

    svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

    shiftedGroup = svg.append('g')
      .attr('id', 'shifted-group')
      .attr('transform', 'translate(' + marginX + ', ' + marginY + ')');

    linkRoot = shiftedGroup.append('g').attr('id', 'link-root');
    circleRoot = shiftedGroup.append('g').attr('id', 'circle-root');
    textRoot = shiftedGroup.append('g').attr('id', 'text-root');
  }

  function renderUpdate(root) {
    tree(root);
    tree.separation(separation);
    // tree.nodeSize([50, 100]);
    var nodes = tree.nodes(root).reverse();
    nodes.forEach(setYWithDepth);
    var links = tree.links(nodes);
    var line = shape.line();
    line.curve(shape.curveStep);

    var linksSel = linkRoot.selectAll(".link").data(links, getLinkId);

    linksSel.exit().remove();

    var enteredLinks = linksSel.enter().append('path')
      .attr("class", "link");

    var linksToUpdate = enteredLinks.merge(linksSel);
    linksToUpdate.attr('d', getSpline);

    var nodesSel = circleRoot.selectAll(".node").data(nodes, accessor('sentencePos'));
    nodesSel.exit().remove();

    var enteredNodes = nodesSel.enter()
      .append("circle")
        .attr('id', getId)
        .attr("class", "node")
        .attr("r", 30)        
        .on("click", click);

    var nodesToUpdate = enteredNodes.merge(nodesSel);

    nodesToUpdate
      .attr('cx', getX)
      .attr('cy', getY);

    var textSel = textRoot.selectAll('text').data(nodes, accessor('sentencePos'));
    textSel.exit().remove();

    var enteredText = textSel.enter().append('text')
      .attr('dy', '0.3em')
      .attr('text-anchor', 'middle');

    enteredText.merge(textSel)
      .attr('x', function(d) { 
        return d.children || d._children ? '0.3em' : '-0.3em'; 
      })
      .attr('x', getX)
      .attr('y', getY)
      .text(accessor('word'));

    function getSpline(d) {
      var averageY = (d.source.y + d.target.y)/2;
      var averageX = (d.source.x + d.target.x)/2;

      return line([
        [d.source.x, d.source.y],

        // Insert a couple of middle points for extra bezier action.
        // [averageX, d.source.y],
        // [averageX, d.target.y],
        [d.source.x, averageY],
        [d.target.x, averageY],

        [d.target.x, d.target.y]
      ]);
    }      
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


  return {
    render: render,
    renderUpdate: renderUpdate
  };
}

module.exports = Graph;
