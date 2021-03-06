var Graph = require('./graph');
var renderFormPane = require('./render-form-pane');
var DependencyParser = require('../index');
var flipTreeHeadToChild = require('../flip-tree-head-to-child');
var cloneDeep = require('lodash.clonedeep');
var createWordnok = require('wordnok').createWordnok;
var config = require('./config');
var sb = require('standard-bail')({
  log: console.log
});
var disambiguatePOS = require('../disambiguate-pos');

var wordnok = createWordnok({
  apiKey: config.wordnikAPIKey
});

var defaultSentence = [
];

var defaultSentenceText = JSON.stringify(defaultSentence, null, '  ');
var parseGenerator = DependencyParser();
var parseIterator;

var renderedForm = renderFormPane({
  sentenceText: 'Do as the boffin of the necromancers commands and switch allegiances as though you were a popinjay in a chiffon chemise.',
  sentenceJSONText: defaultSentenceText,
  onParse: updateGraph,
  onStepParse: stepForward,
  onConvertSentenceToJSON: runConversionToJSON,
  onDisambiguate: updateWithDisambiguation
});

var graph = Graph({
  width: 750,
  height: 1000
});

graph.render();
updateGraph(updateWithDisambiguation(defaultSentenceText));

function updateGraph(sentenceJSONText) {
  var result;
  do {
    result = stepParsingForward(sentenceJSONText);
  }
  while (!result.done);
console.log(JSON.stringify(result.tree, null, '  '));
  graph.renderUpdate(result.tree);
}

function stepForward(sentenceJSONText) {
  var stepResult = stepParsingForward(sentenceJSONText);
  graph.renderUpdate(stepResult.tree);
  renderedForm.setHeadlessField(JSON.stringify(stepResult.headlessList, null, '  '));
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
  var roots = flipTreeHeadToChild(cloneDeep(result.value.sentence));
  console.log(result.value.headless);

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
    tree: renderRoot,
    headlessList: result.value.headless
  };
}

function runConversionToJSON(text) {
  var words = splitToWords(text);
  wordnok.getPartsOfSpeechForMultipleWords(
    words, sb(setJsonFieldWithPartsOfSpeech)
  );

  function setJsonFieldWithPartsOfSpeech(parts) {
    var sentenceArray = parts.map(combinePOSAndWord);
    renderedForm.setSentenceJsonField(JSON.stringify(sentenceArray, null, '  '));
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

function updateWithDisambiguation(text) {
  var wordNodes = JSON.parse(text);
  disambiguatePOS(wordNodes, 'pos');
  var disambiguated = JSON.stringify(wordNodes, null, '  ');
  renderedForm.setSentenceJsonField(disambiguated);
  return disambiguated;
}

function splitToWords(sentenceText) {
  var cleanedText = sentenceText.replace(/https*:\/\/.*\b/g, '');
  return cleanedText.toLowerCase().split(/[ ":.,;!?#]/).filter((s) => s.length > 0);
}
