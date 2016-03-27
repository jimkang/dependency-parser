var test = require('tap').test;
// var test = require('tape');
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
