var test = require('tap').test;
var canDepend = require('../grammar/english-can-depend');

var testCases = [
  {
    name: 'Verb can depend on verb',
    posA: ['verb'],
    posB: ['verb'],
    expected: true
  },
  {
    name: 'Noun can depend on verb',
    posA: ['noun'],
    posB: ['verb'],
    expected: true
  },
  {
    name: 'Adverb can depend on verb',
    posA: ['adverb'],
    posB: ['verb'],
    expected: true
  },
  {
    name: 'Adjective cannot depend on verb',
    posA: ['adjective'],
    posB: ['verb'],
    expected: false
  },
  {
    name: 'Article cannot depend on verb',
    posA: ['article'],
    posB: ['verb'],
    expected: false
  },
  {
    name: 'Verb cannot depend on noun',
    posA: ['verb'],
    posB: ['noun'],
    expected: false
  },
  {
    name: 'Adjective can depend on noun',
    posA: ['adjective'],
    posB: ['noun'],
    expected: true
  },
  {
    name: 'Article can depend on noun',
    posA: ['article'],
    posB: ['noun'],
    expected: true
  },
  {
    name: 'Adverb cannot depend on noun',
    posA: ['adverb'],
    posB: ['noun'],
    expected: false
  },
  {
    name: 'Noun can depend on noun',
    posA: ['noun'],
    posB: ['noun'],
    expected: true
  },
  {
    name: 'Article cannot depend on adjective',
    posA: ['article'],
    posB: ['adjective'],
    expected: false
  },
  {
    name: 'Adverb cannot depend on adjective',
    posA: ['adverb'],
    posB: ['adjective'],
    expected: false
  },
  {
    name: 'Article cannot depend on adverb',
    posA: ['article'],
    posB: ['adverb'],
    expected: false
  },
  {
    name: 'Adjective cannot depend on adverb',
    posA: ['adjective'],
    posB: ['adverb'],
    expected: false
  },
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Test: ' + testCase.name, basicTest);

  function basicTest(t) {
    t.equal(
      canDepend(testCase.posA, testCase.posB),
      testCase.expected,
      'Finding is correct.'
    );
    t.end();
  }
}
