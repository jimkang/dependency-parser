dependency-parser
============

Parses sentences (in the form of an array of objects representing words) into dependency trees.

A [dependency tree](https://en.wikipedia.org/wiki/Parse_tree#Dependency-based_parse_trees) maps a sentence to a tree in which each word is a node. Every node is either dependent on another node or the *head* of another node or both. For example, in the sentence "I guess this is life now.":

- The noun "I" is a dependent of the verb "guess".
- The verb "is" is a dependent of the verb "guess".
- The noun "this" is a dependent of the verb "is".
- The noun "life" is a dependent of the verb "is".
- The adverb "now" is a dependent of the verb "is".

Elements in an array passed to the parser should look like this:

    {
      "word": "guess",
      "pos": [
        "verb"
      ]
    }

Where "pos" is the parts of speech. See node-pos or Wordnik about getting parts of speech for words. Any extra elements in the objects will be preserved in the output, so you can throw in metadata if you feel like it.

Uses generators. *Requires Node 4+ or ES6 in the browser.*

Installation
------------

    npm install dependency-parser

Usage
-----

    var DependencyParser = require('dependency-parser');
    var parse = DependencyParser();

    var firstSentenceSubtree = nlcstTree.children[0].children[0];
    var sentence = [
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
    ];
    console.log(parse(sentence));

Output:

    [
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
            "sentencePos": 4
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

The parse function returns an array of trees. If the sentence is well-formed, it should contain a single tree, but otherwise, there may be multiple trees.

Algorithm
----------

The parsing algorithm is derived from [A Fundamental Algorithm for Dependency Parsing (PDF)](http://web.stanford.edu/~mjkay/covington.pdf) with a modification for not checking anything that is already a dependency of the word node being evaluated when looking for heads.

Tests
-----

Run tests with `make test`.

TODO
----

- Consider adding dependents to other dependents.
- If there is already a child with the same directionFromHead, try swapping places with that child, ignoring its de facto POS.
- Consider quitting when you are about to add a third dependent to a head. At that point, it may be clear that you may never really understand the sentence.

Next test cases:

- No one wants it but the orphans who aged out of the system.
- My water heater broke and flooded my basement!
- Obvious exits are NORTH, SOUTH and DENNIS.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
