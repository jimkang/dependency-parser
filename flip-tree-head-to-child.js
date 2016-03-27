function flipTreeHeadToChild(headBasedArray) {
  var root;

  headBasedArray.forEach(convertNode);
  headBasedArray.forEach(chopHead);
  // console.log(JSON.stringify(root, null, '  '));
  return root;

  function convertNode(node) {
    if (node.head) {
      addToChildren(node.head, node);
      node.directionFromHead = node.sentencePos < node.head.sentencePos ? -1 : 1;
    }
    else {
      root = node;
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

module.exports = flipTreeHeadToChild;
