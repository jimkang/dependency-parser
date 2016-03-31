var d3 = require('d3-selection');

function renderFormPane(opts) {
  var sentenceJSONText;
  var onParse;
  var onStepParse;

  if (opts) {
    sentenceJSONText = opts.sentenceJSONText;
    onParse = opts.onParse;
    onStepParse = opts.onStepParse;
  }

  var pane = d3.select('body').append('div').classed('form-pane', true);
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
