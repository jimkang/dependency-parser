// var test = require('tap').test;
var test = require('tape');
var DependencyParser = require('../index');

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
    expected: {
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
        "pos": ["adverb"]
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
        "pos": ["adverb"]
      },
      {
        "word": "though",
        "pos": ["conjunction"]
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
    expected: {}
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Test: ' + testCase.name, function basicTest(t) {
    var parse = DependencyParser(testCase.createOpts);
    t.deepEqual(parse(testCase.sentence), testCase.expected, 'Parse tree is correct.');
    t.end();
  });
}
