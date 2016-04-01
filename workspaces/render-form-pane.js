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
  }

  var pane = d3.select('body').append('div').classed('form-pane', true);

  var sentenceTextField = pane.append('input')
    .classed('sentence-text', true)
    .attr('value', sentenceText);

  var textToJSONButton = pane.append('button')
    .text('Sentence to JSON!')
    .classed('sentence-to-json', true)
    .on('click', onConvertSentenceToJSON);
    
  var sentenceJSONField = pane.append('textarea')
    .classed('sentence-json', true)
    .text(sentenceJSONText);

  var parseButton = pane.append('button').classed('parse-button', true).text('Parse!');
  parseButton.on('click', sendSentenceJSON);

  var stepButton = pane.append('button').classed('step-button', true).text('Step!');
  stepButton.on('click', sendSentenceJSONToStep);

  function sendSentenceJSON() {
    onParse(sentenceJSONField.node().value);
  }

  function sendSentenceJSONToStep() {
    onStepParse(sentenceJSONField.node().value);
  }
}

module.exports = renderFormPane;
