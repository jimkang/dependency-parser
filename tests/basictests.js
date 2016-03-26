var test = require('tap').test;
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
        "pos": ["adjective", "noun"]
      },
      {
        "word": "dog",
        "pos": ["noun"]
      }
    ],
    expected: {
      "word": "am",
      "pos": ["verb"],
      "dependents": [
        {
          "word": "I",
          "pos": ["noun"],
          "directionFromHead": -1,
          "dependents": []
        },
        {
          "word": "dog",
          "pos": ["noun"],
          "directionFromHead": 1,
          dependents: [
            {
              "word": "a",
              "pos": ["article"],
              "directionFromHead": -1,
              "dependents": []
            },
            {
              "word": "great",
              "pos": ["adjective", "noun"],
              "directionFromHead": -1,
              "dependents": []
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
