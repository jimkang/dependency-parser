var test = require('tap').test;
// var test = require('tape');
var canDepend = require('../grammar/english-can-depend');

var testCases = [
  {
    name: 'Verb cannot depend on verb',
    posA: ['verb'],
    posB: ['verb'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Noun can depend on verb',
    posA: ['noun'],
    posB: ['verb'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'noun',
        head: 'verb'
      }
    }
  },
  {
    name: 'Adverb can depend on verb',
    posA: ['adverb'],
    posB: ['verb'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'adverb',
        head: 'verb'
      }
    }
  },
  {
    name: 'Adjective can depend on verb',
    posA: ['adjective'],
    posB: ['verb'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'adjective',
        head: 'verb'
      }
    }
  },
  {
    name: 'Adverb can depend on adverb',
    posA: ['adverb'],
    posB: ['adverb'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'adverb',
        head: 'adverb'
      }
    }
  },  
  {
    name: 'Article cannot depend on verb',
    posA: ['article'],
    posB: ['verb'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Verb cannot depend on noun',
    posA: ['verb'],
    posB: ['noun'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Adjective can depend on noun',
    posA: ['adjective'],
    posB: ['noun'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'adjective',
        head: 'noun'
      }
    }
  },
  {
    name: 'Article can depend on noun',
    posA: ['article'],
    posB: ['noun'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'article',
        head: 'noun'
      }
    }
  },
  {
    name: 'Adverb cannot depend on noun',
    posA: ['adverb'],
    posB: ['noun'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Noun cannot depend on noun',
    posA: ['noun'],
    posB: ['noun'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Article cannot depend on adjective',
    posA: ['article'],
    posB: ['adjective'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Adverb cannot depend on adjective',
    posA: ['adverb'],
    posB: ['adjective'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'adverb',
        head: 'adjective'
      }
    }
  },
  {
    name: 'Article cannot depend on adverb',
    posA: ['article'],
    posB: ['adverb'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Adjective cannot depend on adverb',
    posA: ['adjective'],
    posB: ['adverb'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Verb can depend on conjunction',
    posA: ['verb'],
    posB: ['conjunction'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'verb',
        head: 'conjunction'
      }
    }
  },
  {
    name: 'Conjunction cannot depend on verb',
    posA: ['conjunction'],
    posB: ['verb'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Conjunction can depend on conjunction',
    posA: ['conjunction'],
    posB: ['conjunction'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'conjunction',
        head: 'conjunction'
      }
    }
  },
  {
    name: 'Preposition can depend on verb',
    posA: ['preposition'],
    posB: ['verb'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'preposition',
        head: 'verb'
      }
    }
  },
  {
    name: 'Preposition cannot depend on noun',
    posA: ['preposition'],
    posB: ['noun'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Preposition cannot depend on adjective',
    posA: ['preposition'],
    posB: ['adjective'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'Noun can depend on preposition',
    posA: ['noun'],
    posB: ['preposition'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'noun',
        head: 'preposition'
      }
    }
  },

  {
    name: 'Verb/noun can depend on conjunction',
    posA: ['verb', 'noun'],
    posB: ['conjunction'],
    expected: {
      canDepend: true,
      roles: {
        dependent: 'verb',
        head: 'conjunction'
      }
    }
  },

  {
    name: 'DefactoPOS is favored when checking if conjunction/adverb can depend on verb',
    posA: ['adverb', 'conjunction'],
    defactoPosA: 'conjunction',
    posB: ['verb'],
    expected: {
      canDepend: false
    }
  },
  {
    name: 'DefactoPOS is favored when checking if adverb can depend on verb',
    posA: ['adverb', 'conjunction'],
    posB: [
      'noun',
      'verb-transitive',
      'verb-intransitive',
      'phrasal-verb'
    ],
    defactoPosB: 'verb-transitive',
    expected: {
      canDepend: true,
      roles: {
        dependent: 'adverb',
        head: 'verb-transitive'
      }
    }
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Test: ' + testCase.name, basicTest);

  function basicTest(t) {
    t.deepEqual(
      canDepend({
        dependent: {
          pos: testCase.posA,
          defactoPOS: testCase.defactoPosA
        },
        head: {
          pos: testCase.posB,
          defactoPOS: testCase.defactoPosB
        }
      }),
      testCase.expected,
      'Finding is correct.'
    );
    t.end();
  }
}
