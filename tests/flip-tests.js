var test = require('tap').test;
// var test = require('tape');
var flipTreeHeadToChild = require('../flip-tree-head-to-child');

var testCases = [
  {
    nodes: [
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
    ],
    expectedTrees: [
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
      }
    ],

    // Orphaned nodes test case.
    nodes: [
      {
        "word": "Do",
        "pos": [
          "verb"
        ],
        "sentencePos": 0,
        "head": 7,
      },
      {
        "word": "as",
        "pos": [
          "adverb"
        ],
        "sentencePos": 1,
        "head": 7
      },
      {
        "word": "the",
        "pos": [
          "article"
        ],
        "sentencePos": 2,
        "head":  3          
      },
      {
        "word": "boffin",
        "pos": [
          "noun"
        ],
        "sentencePos": 3,
        "head":  4
      },
      {
        "word": "of",
        "pos": [
          "preposition"
        ],
        "sentencePos": 4,
        "head": 6
      },
      {
        "word": "the",
        "pos": [
          "article"
        ],
        "sentencePos": 5,
        "head": 6
      },
      {
        "word": "necromancers",
        "pos": [
          "noun"
        ],
        "sentencePos": 6,
        "head": 7
      },
      {
        "word": "commands",
        "pos": [
          "verb"
        ],
        "sentencePos": 7,
        "head": 8
      },
      {
        "word": "and",
        "pos": [
          "conjunction"
        ],
        "sentencePos": 8
      },
      {
        "word": "switch",
        "pos": [
          "verb"
        ],
        "sentencePos": 9,
        "head": 8
      },
      {
        "word": "allegiances",
        "pos": [
          "noun"
        ],
        "sentencePos": 10,
        "head": 9
      },
      {
        "word": "as",
        "pos": [
          "adverb"
        ],
        "sentencePos": 11,
        "head": 9,
      },
      {
        "word": "though",
        "pos": [
          "conjunction"
        ],
        "sentencePos": 12
      },
      {
        "word": "you",
        "pos": [
          "noun"
        ],
        "sentencePos": 13,
        "head": 14
      },
      {
        "word": "were",
        "pos": [
          "verb"
        ],
        "sentencePos": 14,
        "head": 12
      },
      {
        "word": "a",
        "pos": [
          "article"
        ],
        "sentencePos": 15,
        "head": 16
      },
      {
        "word": "popinjay",
        "pos": [
          "noun"
        ],
        "sentencePos": 16,
        "head": 14,
      },
      {
        "word": "in",
        "pos": [
          "preposition"
        ],
        "sentencePos": 17,
        "head": 16
      },
      {
        "word": "a",
        "pos": [
          "article"
        ],
        "sentencePos": 18,
        "head": 16
      },
      {
        "word": "chiffon",
        "pos": [
          "adjective"
        ],
        "sentencePos": 19,
        "head": 16
      },
      {
        "word": "chemise",
        "pos": [
          "noun"
        ],
        "sentencePos": 20,
        "head": 16
      }
    ],

    // Trees are not correct in terms of parsing, but they are what you should get from
    // the given nodes.
    expectedTrees: [
      {
        "word": "and",
        "pos": [
          "conjunction"
        ],
        "sentencePos": 8,
        "children": [
          {
            "word": "commands",
            "pos": [
              "verb"
            ],
            "sentencePos": 7,
            "children": [
              {
                "word": "Do",
                "pos": [
                  "verb"
                ],
                "sentencePos": 0,
                "directionFromHead": -1
              },
              {
                "word": "as",
                "pos": [
                  "adverb"
                ],
                "sentencePos": 1,
                "directionFromHead": -1
              },
              {
                "word": "necromancers",
                "pos": [
                  "noun"
                ],
                "sentencePos": 6,
                "children": [
                  {
                    "word": "of",
                    "pos": [
                      "preposition"
                    ],
                    "sentencePos": 4,
                    "children": [
                      {
                        "word": "boffin",
                        "pos": [
                          "noun"
                        ],
                        "sentencePos": 3,
                        "children": [
                          {
                            "word": "the",
                            "pos": [
                              "article"
                            ],
                            "sentencePos": 2,
                            "directionFromHead": -1
                          }
                        ],
                        "directionFromHead": -1
                      }
                    ],
                    "directionFromHead": -1
                  },
                  {
                    "word": "the",
                    "pos": [
                      "article"
                    ],
                    "sentencePos": 5,
                    "directionFromHead": -1
                  }
                ],
                "directionFromHead": -1
              }
            ],
            "directionFromHead": -1
          },
          {
            "word": "switch",
            "pos": [
              "verb"
            ],
            "sentencePos": 9,
            "directionFromHead": 1,
            "children": [
              {
                "word": "allegiances",
                "pos": [
                  "noun"
                ],
                "sentencePos": 10,
                "directionFromHead": 1
              },
              {
                "word": "as",
                "pos": [
                  "adverb"
                ],
                "sentencePos": 11,
                "directionFromHead": 1
              }
            ]
          }
        ]
      },
      {
        "word": "though",
        "pos": [
          "conjunction"
        ],
        "sentencePos": 12,
        "children": [
          {
            "word": "were",
            "pos": [
              "verb"
            ],
            "sentencePos": 14,
            "children": [
              {
                "word": "you",
                "pos": [
                  "noun"
                ],
                "sentencePos": 13,
                "directionFromHead": -1
              },
              {
                "word": "popinjay",
                "pos": [
                  "noun"
                ],
                "sentencePos": 16,
                "children": [
                  {
                    "word": "a",
                    "pos": [
                      "article"
                    ],
                    "sentencePos": 15,
                    "directionFromHead": -1
                  },
                  {
                    "word": "in",
                    "pos": [
                      "preposition"
                    ],
                    "sentencePos": 17,
                    "directionFromHead": 1
                  },
                  {
                    "word": "a",
                    "pos": [
                      "article"
                    ],
                    "sentencePos": 18,
                    "directionFromHead": 1
                  },
                  {
                    "word": "chiffon",
                    "pos": [
                      "adjective"
                    ],
                    "sentencePos": 19,
                    "directionFromHead": 1
                  },
                  {
                    "word": "chemise",
                    "pos": [
                      "noun"
                    ],
                    "sentencePos": 20,
                    "directionFromHead": 1
                  }
                ],
                "directionFromHead": 1
              }
            ],
            "directionFromHead": 1
          }
        ]
      }
    ]
  }
];


function hydrateHeadRefInCase(testCase) {
  testCase.nodes.forEach(hydrateHeadRef);

  function hydrateHeadRef(node) {
    if (typeof node.head === 'number') {
      node.head = testCase.nodes[node.head];
    }
  }
}

testCases.forEach(runTest);

function runTest(testCase) {
  hydrateHeadRefInCase(testCase);
  test('Flip head-based tree to child-based tree', flipTest);

  function flipTest(t) {
    t.deepEqual(
      flipTreeHeadToChild(testCase.nodes),
      testCase.expectedTrees,
      'Flipped tree is correct.'
    );
    t.end();
  }
}
