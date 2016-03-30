var renderGraphPane = require('./render-graph-pane');
var DependencyParser = require('../index');

var graphData = {
  nodes: [
    {
      "label": "node 0",
      "id": "sxIK"
    },
    {
      "label": "node 1",
      "id": "LskP"
    },
    {
      "label": "node 2",
      "id": "cmIt"
    },
    {
      "label": "node 3",
      "id": "fDYm"
    },
    {
      "label": "node 4",
      "id": "cbFO"
    },
    {
      "label": "node 5",
      "id": "QYwt"
    },
    {
      "label": "node 6",
      "id": "LRbt"
    },
    {
      "label": "node 7",
      "id": "boGc"
    },
    {
      "label": "node 8",
      "id": "AiDz"
    },
    {
      "label": "node 9",
      "id": "guOS"
    },
    {
      "label": "node 10",
      "id": "vGGG"
    },
    {
      "label": "node 11",
      "id": "IPIf"
    },
    {
      "label": "node 12",
      "id": "Dsxk"
    },
    {
      "label": "node 13",
      "id": "xVsS"
    },
    {
      "label": "node 14",
      "id": "BvvN"
    },
    {
      "label": "node 15",
      "id": "DmGq"
    },
    {
      "label": "node 16",
      "id": "ivXo"
    },
    {
      "label": "node 17",
      "id": "HCtr"
    },
    {
      "label": "node 18",
      "id": "mRhT"
    },
    {
      "label": "node 19",
      "id": "RGut"
    },
    {
      "label": "node 20",
      "id": "EtcS"
    },
    {
      "label": "node 21",
      "id": "NmRS"
    },
    {
      "label": "node 22",
      "id": "XtIy"
    },
    {
      "label": "node 23",
      "id": "Kbsh"
    },
    {
      "label": "node 24",
      "id": "DvAK"
    },
    {
      "label": "node 25",
      "id": "qKJt"
    },
    {
      "label": "node 26",
      "id": "OUOa"
    },
    {
      "label": "node 27",
      "id": "XjGC"
    },
    {
      "label": "node 28",
      "id": "Suyc"
    },
    {
      "label": "node 29",
      "id": "iztH"
    },
    {
      "label": "node 30",
      "id": "zKTO"
    },
    {
      "label": "node 31",
      "id": "TqbS"
    },
    {
      "label": "node 32",
      "id": "SbVT"
    },
    {
      "label": "node 33",
      "id": "aVhm"
    },
    {
      "label": "node 34",
      "id": "FCNS"
    },
    {
      "label": "node 35",
      "id": "PojY"
    },
    {
      "label": "node 36",
      "id": "WEfU"
    },
    {
      "label": "node 37",
      "id": "gkFB"
    },
    {
      "label": "node 38",
      "id": "QwBD"
    },
    {
      "label": "node 39",
      "id": "ViSI"
    }
  ],

  links: [
    {
      "source": 0,
      "target": 1
    },
    {
      "source": 0,
      "target": 2
    },
    {
      "source": 1,
      "target": 2
    },
    {
      "source": 1,
      "target": 3
    },
    {
      "source": 2,
      "target": 3
    },
    {
      "source": 2,
      "target": 4
    },
    {
      "source": 3,
      "target": 4
    },
    {
      "source": 3,
      "target": 28
    },
    {
      "source": 4,
      "target": 5
    },
    {
      "source": 4,
      "target": 6
    },
    {
      "source": 5,
      "target": 6
    },
    {
      "source": 5,
      "target": 7
    },
    {
      "source": 6,
      "target": 30
    },
    {
      "source": 6,
      "target": 8
    },
    {
      "source": 7,
      "target": 8
    },
    {
      "source": 7,
      "target": 26
    },
    {
      "source": 8,
      "target": 9
    },
    {
      "source": 8,
      "target": 10
    },
    {
      "source": 9,
      "target": 10
    },
    {
      "source": 9,
      "target": 11
    },
    {
      "source": 10,
      "target": 22
    },
    {
      "source": 10,
      "target": 12
    },
    {
      "source": 11,
      "target": 19
    },
    {
      "source": 11,
      "target": 13
    },
    {
      "source": 12,
      "target": 13
    },
    {
      "source": 12,
      "target": 24
    },
    {
      "source": 13,
      "target": 14
    },
    {
      "source": 13,
      "target": 15
    },
    {
      "source": 14,
      "target": 15
    },
    {
      "source": 14,
      "target": 16
    },
    {
      "source": 15,
      "target": 16
    },
    {
      "source": 15,
      "target": 17
    },
    {
      "source": 16,
      "target": 17
    },
    {
      "source": 16,
      "target": 18
    },
    {
      "source": 17,
      "target": 18
    },
    {
      "source": 17,
      "target": 19
    },
    {
      "source": 18,
      "target": 19
    },
    {
      "source": 18,
      "target": 8
    },
    {
      "source": 19,
      "target": 20
    },
    {
      "source": 19,
      "target": 21
    },
    {
      "source": 20,
      "target": 21
    },
    {
      "source": 20,
      "target": 22
    },
    {
      "source": 21,
      "target": 22
    },
    {
      "source": 21,
      "target": 35
    },
    {
      "source": 22,
      "target": 23
    },
    {
      "source": 22,
      "target": 24
    },
    {
      "source": 23,
      "target": 24
    },
    {
      "source": 23,
      "target": 8
    },
    {
      "source": 24,
      "target": 5
    },
    {
      "source": 24,
      "target": 15
    },
    {
      "source": 25,
      "target": 26
    },
    {
      "source": 25,
      "target": 27
    },
    {
      "source": 26,
      "target": 27
    },
    {
      "source": 26,
      "target": 6
    },
    {
      "source": 27,
      "target": 28
    },
    {
      "source": 27,
      "target": 29
    },
    {
      "source": 28,
      "target": 29
    },
    {
      "source": 28,
      "target": 7
    },
    {
      "source": 29,
      "target": 12
    },
    {
      "source": 29,
      "target": 31
    },
    {
      "source": 30,
      "target": 31
    },
    {
      "source": 30,
      "target": 32
    },
    {
      "source": 31,
      "target": 32
    },
    {
      "source": 31,
      "target": 33
    },
    {
      "source": 32,
      "target": 33
    },
    {
      "source": 32,
      "target": 34
    },
    {
      "source": 33,
      "target": 32
    },
    {
      "source": 33,
      "target": 35
    },
    {
      "source": 34,
      "target": 35
    },
    {
      "source": 34,
      "target": 36
    },
    {
      "source": 35,
      "target": 36
    },
    {
      "source": 35,
      "target": 37
    },
    {
      "source": 36,
      "target": 37
    },
    {
      "source": 36,
      "target": 38
    },
    {
      "source": 37,
      "target": 38
    },
    {
      "source": 37,
      "target": 39
    },
    {
      "source": 38,
      "target": 39
    },
    {
      "source": 38,
      "target": 0
    },
    {
      "source": 39,
      "target": 0
    },
    {
      "source": 39,
      "target": 1
    }
  ]
};

// console.log(JSON.stringify(graphData, null, '  '));

var sentence = [
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
];

var parse = DependencyParser();
var parsed = parse(sentence);
console.log(JSON.stringify(parsed, null, '  '));

renderGraphPane({
  // random: random,
  tree: parsed[0]
});
