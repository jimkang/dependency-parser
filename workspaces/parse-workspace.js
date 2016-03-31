var Graph = require('./graph');
var renderFormPane = require('./render-form-pane');
var DependencyParser = require('../index');

var defaultSentence = [
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

var defaultSentenceText = JSON.stringify(defaultSentence, null, '  ');
var parse = DependencyParser();

renderFormPane({
  sentenceJSONText: defaultSentenceText,
  onParse: updateGraph
});

var graph = Graph({
  width: 750,
  height: 750
});

graph.render();
updateGraph(defaultSentenceText);

function updateGraph(sentenceJSONText) {
  var sentenceArray = JSON.parse(sentenceJSONText);
  var parsed = parse(sentenceArray);
  graph.renderUpdate(parsed[0]);
}
