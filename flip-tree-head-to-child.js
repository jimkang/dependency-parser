function flipTreeHeadToChild(headBasedArray) {
  headBasedArray.forEach(convertNode);
  var roots = headBasedArray.reduce(addRoot, []);
  headBasedArray.forEach(chopHead);
  // console.log(JSON.stringify(roots, null, '  '));

  return roots;

  function convertNode(node) {
    if (node.head) {
      addToChildren(node.head, node);
      node.directionFromHead = node.sentencePos < node.head.sentencePos ? -1 : 1;
    }
  }
}

function addToChildren(node, child) {
  if (!('children' in node)) {
    node.children = [];
  }
  node.children.push(child);
}

function chopHead(node) {
  delete node.head;
}

function addRoot(roots, node) {
  if (!node.head) {
    roots.push(node);
  }
  return roots;
}

module.exports = flipTreeHeadToChild;
