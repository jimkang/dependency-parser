// var test = require('tap').test;
var test = require('tape');
var DependencyParser = require('../index');
var flipTreeHeadToChild = require('../flip-tree-head-to-child');
var runIteratorUntilDone = require('./fixtures/run-until-done');
var disambiguatePOS = require('../disambiguate-pos');

var testCases = [
  {
    name: 'I am a great dog.',
    createOpts: {
    },
    sentence: [
      {
        "word": "i",
        "pos": [
          "noun"
        ]
      },
      {
        "word": "am",
        "pos": [
          "verb"
        ]
      },
      {
        "word": "a",
        "pos": [
          "indefinite-article"
        ]
      },
      {
        "word": "great",
        "pos": [
          "adjective",
          "noun",
          "adverb"
        ]
      },
      {
        "word": "dog",
        "pos": [
          "noun",
          "adverb",
          "verb-transitive",
          "idiom"
        ]
      }
    ],
    expected: [
      {
        "word": "am",
        "pos": [
          "verb"
        ],
        "sentencePos": 1,
        "children": [
          {
            "word": "i",
            "pos": [
              "noun"
            ],
            "sentencePos": 0,
            "directionFromHead": -1
          },
          {
            "word": "dog",
            "pos": [
              "noun"
            ],
            "sentencePos": 4,
            "children": [
              {
                "word": "a",
                "pos": [
                  "indefinite-article"
                ],
                "sentencePos": 2,
                "directionFromHead": -1
              },
              {
                "word": "great",
                "pos": [
                  "adjective",
                  "adverb"
                ],
                "sentencePos": 3,
                "directionFromHead": -1
              }
            ],
            "directionFromHead": 1
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
        "word": "do",
        "pos": [
          "verb-transitive",
          "verb-intransitive",
          "auxiliary-verb",
          "noun",
          "phrasal-verb",
          "idiom"
        ]
      },
      {
        "word": "as",
        "pos": [
          "adverb",
          "conjunction",
          "pronoun",
          "preposition",
          "idiom",
          "noun"
        ]
      },
      {
        "word": "the",
        "pos": [
          "definite-article",
          "adverb"
        ]
      },
      {
        "word": "boffin",
        "pos": [
          "noun"
        ]
      },
      {
        "word": "of",
        "pos": [
          "preposition"
        ]
      },
      {
        "word": "the",
        "pos": [
          "definite-article",
          "adverb"
        ]
      },
      {
        "word": "necromancers",
        "pos": [
          "noun"
        ]
      },
      {
        "word": "commands",
        "pos": [
          "verb",
          "noun"
        ]
      },
      {
        "word": "and",
        "pos": [
          "conjunction",
          "idiom"
        ]
      },
      {
        "word": "switch",
        "pos": [
          "noun",
          "verb-transitive",
          "verb-intransitive",
          "phrasal-verb"
        ]
      },
      {
        "word": "allegiances",
        "pos": [
          "noun"
        ]
      },
      {
        "word": "as",
        "pos": [
          "adverb",
          "conjunction",
          "pronoun",
          "preposition",
          "idiom",
          "noun"
        ]
      },
      {
        "word": "though",
        "pos": [
          "conjunction",
          "adverb"
        ]
      },
      {
        "word": "you",
        "pos": [
          "pronoun"
        ]
      },
      {
        "word": "were",
        "pos": [
          "verb"
        ]
      },
      {
        "word": "a",
        "pos": [
          "indefinite-article"
        ]
      },
      {
        "word": "popinjay",
        "pos": [
          "noun"
        ]
      },
      {
        "word": "in",
        "pos": [
          "preposition",
          "adverb",
          "adjective",
          "noun",
          "idiom",
          "abbreviation"
        ]
      },
      {
        "word": "a",
        "pos": [
          "indefinite-article"
        ]
      },
      {
        "word": "chiffon",
        "pos": [
          "noun",
          "adjective"
        ]
      },
      {
        "word": "chemise",
        "pos": [
          "noun"
        ]
      }
    ],
    expected: [
      {
        "word": "though",
        "pos": [
          "conjunction"
        ],
        "sentencePos": 12,
        "children": [
          {
            "word": "as",
            "pos": [
              "conjunction"
            ],
            "sentencePos": 11,
            "children": [
              {
                "word": "and",
                "pos": [
                  "conjunction"
                ],
                "sentencePos": 8,
                "children": [
                  {
                    "word": "as",
                    "pos": [
                      "conjunction"
                    ],
                    "sentencePos": 1,
                    "children": [
                      {
                        "word": "do",
                        "pos": [
                          "verb-transitive",
                          "verb-intransitive",
                          "auxiliary-verb",
                          "phrasal-verb",
                          "idiom"
                        ],
                        "sentencePos": 0,
                        "directionFromHead": -1
                      },
                      {
                        "word": "commands",
                        "pos": [
                          "verb",
                          "noun"
                        ],
                        "sentencePos": 7,
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
                                      "definite-article",
                                      "adverb"
                                    ],
                                    "sentencePos": 2,
                                    "directionFromHead": -1
                                  }
                                ],
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
                                    "word": "the",
                                    "pos": [
                                      "definite-article",
                                      "adverb"
                                    ],
                                    "sentencePos": 5,
                                    "directionFromHead": -1
                                  }
                                ],
                                "directionFromHead": 1
                              }
                            ],
                            "directionFromHead": -1
                          }
                        ],
                        "directionFromHead": 1
                      }
                    ],
                    "directionFromHead": -1
                  },
                  {
                    "word": "switch",
                    "pos": [
                      "verb-transitive",
                      "verb-intransitive",
                      "phrasal-verb"
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
                      }
                    ]
                  }
                ],
                "directionFromHead": -1
              }
            ],
            "directionFromHead": -1
          },
          {
            "word": "in",
            "pos": [
              "preposition"
            ],
            "sentencePos": 17,
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
                      "pronoun"
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
                          "indefinite-article"
                        ],
                        "sentencePos": 15,
                        "directionFromHead": -1
                      }
                    ],
                    "directionFromHead": 1
                  }
                ],
                "directionFromHead": -1
              },
              {
                "word": "chemise",
                "pos": [
                  "noun"
                ],
                "sentencePos": 20,
                "children": [
                  {
                    "word": "a",
                    "pos": [
                      "indefinite-article"
                    ],
                    "sentencePos": 18,
                    "directionFromHead": -1
                  },
                  {
                    "word": "chiffon",
                    "pos": [
                      "adjective"
                    ],
                    "sentencePos": 19,
                    "directionFromHead": -1
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

testCases.forEach(runTest);

function runTest(testCase) {
  test('Test: ' + testCase.name, function basicTest(t) {
    var parseGenerator = DependencyParser(testCase.createOpts);
    var disambiguatedSentence = disambiguatePOS(testCase.sentence, 'pos');
    var parseIterator = parseGenerator(disambiguatedSentence);
    var parsed = runIteratorUntilDone(parseIterator);
    debugger;
    var childBasedTree = flipTreeHeadToChild(parsed.sentence);
    // console.log(JSON.stringify(childBasedTree, null, '  '));
    t.deepEqual(childBasedTree, testCase.expected, 'Parse tree is correct.');
    t.end();
  });
}
