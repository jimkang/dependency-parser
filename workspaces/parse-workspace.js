var Graph = require('./graph');
var renderFormPane = require('./render-form-pane');
var DependencyParser = require('../index');
var flipTreeHeadToChild = require('../flip-tree-head-to-child');
var runIteratorUntilDone = require('../tests/fixtures/run-until-done');
var cloneDeep = require('lodash.clonedeep');

var defaultSentence = [
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
var parseGenerator = DependencyParser();
var parseIterator;

renderFormPane({
  sentenceJSONText: defaultSentenceText,
  onParse: updateGraph,
  onStepParse: stepForward
});

var graph = Graph({
  width: 750,
  height: 750
});

graph.render();
updateGraph(defaultSentenceText);

function updateGraph(sentenceJSONText) {
  // var sentenceArray = JSON.parse(sentenceJSONText);
  // var parsed = parse(sentenceArray);
  // graph.renderUpdate(parsed[0]);
  var result;
  do {
    result = stepParsingForward(sentenceJSONText);
  }
  while (!result.done);

  graph.renderUpdate(result.tree);
}

function stepForward(sentenceJSONText) {
  graph.renderUpdate(stepParsingForward(sentenceJSONText).tree);
}

function stepParsingForward(sentenceJSONText) {
  if (!parseIterator) {
    parseIterator = parseGenerator(JSON.parse(sentenceJSONText));
    console.log('Starting new sentence parsing iterator.');
  }

  var result = parseIterator.next();
  var renderRoot;

  // Be careful to not mess with the existing result.value, since work needs
  // to be done on it in future iterations.
  var roots = flipTreeHeadToChild(cloneDeep(result.value));

  if (roots.length < 1) {
    console.log('No roots parsed!');
  }
  else if (roots.length === 1) {
    renderRoot = roots[0];
  }
  else {
    renderRoot = {
      word: 'No single root!',
      children: roots
    };
  }

  if (result.done) {
    parseIterator = undefined;
  }

  return {
    done: result.done,
    tree: renderRoot
  };
}
