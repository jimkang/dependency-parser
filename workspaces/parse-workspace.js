var Graph = require('./graph');
var renderFormPane = require('./render-form-pane');
var DependencyParser = require('../index');
var flipTreeHeadToChild = require('../flip-tree-head-to-child');
var runIteratorUntilDone = require('../tests/fixtures/run-until-done');
var cloneDeep = require('lodash.clonedeep');
var createWordnok = require('wordnok').createWordnok;
var config = require('./config');
var sb = require('standard-bail')({
  log: console.log
});

var wordnok = createWordnok({
  apiKey: config.wordnikAPIKey
});

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
    "pos": ["conjunction"]
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

var renderedForm = renderFormPane({
  sentenceText: 'Do as the boffin of the necromancers commands and switch allegiances as though you were a popinjay in a chiffon chemise.',
  sentenceJSONText: defaultSentenceText,
  onParse: updateGraph,
  onStepParse: stepForward,
  onConvertSentenceToJSON: runConversionToJSON
});

var graph = Graph({
  width: 750,
  height: 1000
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
    var sentenceArray = JSON.parse(sentenceJSONText);
    parseIterator = parseGenerator(sentenceArray);
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

function runConversionToJSON(text) {
  var words = splitToWords(text);
  wordnok.getPartsOfSpeechForMultipleWords(
    words, sb(setJsonFieldWithPartsOfSpeech)
  );

  function setJsonFieldWithPartsOfSpeech(parts) {
    var sentenceArray = parts.map(combinePOSAndWord);
    renderedForm.setJsonField(JSON.stringify(sentenceArray, null, '  '));
  }

  function combinePOSAndWord(pos, i) {
    var unit = {
      word: words[i],
      pos: pos
    };

    if (unit.word === 'a') {
      unit.pos = ['indefinite-article'];
    }
    return unit;
  }
}

function splitToWords(sentenceText) {
  return sentenceText.toLowerCase().split(/[ ":.,;!?#]/).filter((s) => s.length > 0);
}
