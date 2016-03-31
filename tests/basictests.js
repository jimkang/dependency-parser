// var test = require('tap').test;
var test = require('tape');
var DependencyParser = require('../index');
var flipTreeHeadToChild = require('../flip-tree-head-to-child');
var runIteratorUntilDone = require('./fixtures/run-until-done');

var testCases = [
  {
    name: 'I am a great dog.',
    createOpts: {
    },
    sentence: [
      {
        "word": "I",
        "pos": ["noun"]
      },
      {
        "word": "am",
        "pos": ["verb"]
      },
      {
        "word": "a",
        "pos": ["article"]
      },
      {
        "word": "great",
        "pos": ["adjective"]
      },
      {
        "word": "dog",
        "pos": ["noun"]
      }
    ],
    expected: [
      {
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
                "sentencePos": 2
              },
              {
                "word": "great",
                "pos": ["adjective"],
                "directionFromHead": -1,
                "sentencePos": 3
              }
            ]
          }
        ]
      }
    ]
  },

  {
    name: 'Do as the boffin of the necromancers commands and switch allegiances as though you were a popinjay in a chiffon chemise.',
    createOpts: {
    },
    sentence: [
      {
        "word": "Do",
        "pos": ["verb"]
      },
      {
        "word": "as",
        "pos": ["conjunction"]
      },
      {
        "word": "the",
        "pos": ["article"]
      },
      {
        "word": "boffin",
        "pos": ["noun"]
      },
      {
        "word": "of",
        "pos": ["preposition"]
      },
      {
        "word": "the",
        "pos": ["article"]
      },
      {
        "word": "necromancers",
        "pos": ["noun"]
      },
      {
        "word": "commands",
        "pos": ["verb"]
      },
      {
        "word": "and",
        "pos": ["conjunction"]
      },
      {
        "word": "switch",
        "pos": ["verb"]
      },
      {
        "word": "allegiances",
        "pos": ["noun"]
      },
      {
        "word": "as",
        "pos": ["conjunction"]
      },
      {
        "word": "though",
        "pos": ["adverb"]
      },
      {
        "word": "you",
        "pos": ["noun"]
      },
      {
        "word": "were",
        "pos": ["verb"]
      },
      {
        "word": "a",
        "pos": ["article"]
      },
      {
        "word": "popinjay",
        "pos": ["noun"]
      },
      {
        "word": "in",
        "pos": ["preposition"]
      },
      {
        "word": "a",
        "pos": ["article"]
      },
      {
        "word": "chiffon",
        "pos": ["adjective"]
      },
      {
        "word": "chemise",
        "pos": ["noun"]
      }
    ],
    expected: [
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Test: ' + testCase.name, function basicTest(t) {
    var parseGenerator = DependencyParser(testCase.createOpts);
    var parseIterator = parseGenerator(testCase.sentence);
    debugger;
    var parsed = runIteratorUntilDone(parseIterator);
    var childBasedTree = flipTreeHeadToChild(parsed);
    debugger;
    console.log(JSON.stringify(childBasedTree, null, '  '));
    t.deepEqual(childBasedTree, testCase.expected, 'Parse tree is correct.');
    t.end();
  });
}
