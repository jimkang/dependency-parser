var test = require('tap').test;
// var test = require('tape');
var flipTreeHeadToChild = require('../flip-tree-head-to-child');

 var nodes = [
  {
    "word": "I",
    "pos": [
      "noun"
    ],
    "sentencePos": 0,
    "head": 1
  },
  {
    "word": "am",
    "pos": [
      "verb"
    ],
    "sentencePos": 1
  },
  {
    "word": "a",
    "pos": [
      "article"
    ],
    "sentencePos": 2,
    "head": 4    
  },
  {
    "word": "great",
    "pos": [
      "adjective"
    ],
    "sentencePos": 3,
    "head": 4
  },
  {
    "word": "dog",
    "pos": [
      "noun"
    ],
    "sentencePos": 4,
    "head": 1
  }
];

var expectedTree = {
  "word": "am",
  "pos": ["verb"],
  "sentencePos": 1,
  "children": [
    {
      "word": "I",
      "pos": ["noun"],
      "directionFromHead": -1,
      "sentencePos": 0
    },
    {
      "word": "dog",
      "pos": ["noun"],
      "directionFromHead": 1,
      "sentencePos": 4,
      "children": [
        {
          "word": "a",
          "pos": ["article"],
          "directionFromHead": -1,
          "sentencePos": 2,
        },
        {
          "word": "great",
          "pos": ["adjective"],
          "directionFromHead": -1,
          "sentencePos": 3,
        }
      ]
    }
  ]
};


function hydrateHeadRef(node) {
  if (typeof node.head === 'number') {
    node.head = nodes[node.head];
  }
}

nodes.forEach(hydrateHeadRef);
// console.log('Expected');
// console.log(JSON.stringify(expectedTree,  null, '  '));

test('Flip head-based tree to child-based tree', flipTest);

function flipTest(t) {
  t.deepEqual(flipTreeHeadToChild(nodes), expectedTree, 'Flipped tree is correct.');
  t.end();
}
