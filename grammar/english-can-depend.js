var contains = require('lodash.contains');
var intersection = require('lodash.intersection');

function partsOfSpeechCanDependOnPartsOfSpeech(posA, posB) {
  var canDepend = contains(posB, 'verb') &&
    intersection(posA, ['noun', 'adverb', 'verb']).length > 0;

  if (!canDepend && contains(posB, 'noun')) {
    canDepend = intersection(posA, ['adjective', 'article', 'noun']).length > 0;
  }

  if (!canDepend && contains(posB, 'conjunction')) {
    canDepend = contains(posA, 'verb');
  }

  return canDepend;
}

module.exports  = partsOfSpeechCanDependOnPartsOfSpeech;
