var d3 = require('d3-selection');

function renderFormPane(opts) {
  var sentenceJSONText;
  var sentenceText;
  var onParse;
  var onStepParse;
  var onConvertSentenceToJSON;

  if (opts) {
    sentenceJSONText = opts.sentenceJSONText;
    sentenceText = opts.sentenceText;
    onParse = opts.onParse;
    onStepParse = opts.onStepParse;
    onConvertSentenceToJSON = opts.onConvertSentenceToJSON;
    onDisambiguate = opts.onDisambiguate;
  }

  var pane = d3.select('body').append('div').classed('form-pane', true);

  var sentenceTextField = pane.append('input')
    .classed('sentence-text', true)
    .attr('value', sentenceText);

  var textToJSONButton = pane.append('button')
    .text('Sentence to JSON! (Step 1)')
    .classed('sentence-to-json', true)
    .on('click', sendSentenceToConvert);

  var disambiguateButton = pane.append('button')
    .text('Disambiguate parts of speech! (Step 2)')
    .classed('disambiguate-button', true)
    .on('click', sendSentenceToBeDisambiguated);

  var parseButton = pane.append('button').classed('parse-button', true).text('Parse! (Step 3)');
  parseButton.on('click', sendSentenceJSON);

  var stepButton = pane.append('button').classed('step-button', true).text('Do a single parse step!');
  stepButton.on('click', sendSentenceJSONToStep);

  var sentenceJSONField = pane.append('textarea')
    .classed('sentence-json', true)
    .text(sentenceJSONText);

  var headlessSection = pane.append('section')
    .classed('headless-section', true);

  var headlessLabel = headlessSection.append('span')
    .classed('headless-label', true)
    .text('Currently headless nodes');

  var headlessField = headlessSection.append('textarea')
    .classed('current-headless-json', true)
    // .text(sentenceJSONText);

  function sendSentenceJSON() {
    onParse(sentenceJSONField.node().value);
  }

  function sendSentenceJSONToStep() {
    onStepParse(sentenceJSONField.node().value);
  }

  function sendSentenceToConvert() {
    onConvertSentenceToJSON(sentenceTextField.node().value);
  }

  function sendSentenceToBeDisambiguated() {
    onDisambiguate(sentenceJSONField.text());
  }

  function setSentenceJsonField(text) {
    sentenceJSONField.text(text);
  }

  function setHeadlessField(text) {
    headlessField.text(text);
  }

  return {
    setSentenceJsonField: setSentenceJsonField,
    setHeadlessField: setHeadlessField
  };
}

module.exports = renderFormPane;
