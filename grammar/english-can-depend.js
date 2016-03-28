var contains = require('lodash.contains');
var intersection = require('lodash.intersection');

function partsOfSpeechCanDependOnPartsOfSpeech(posA, posB) {
  var canDepend = contains(posB, 'verb') &&
    intersection(posA, ['noun', 'adverb', 'verb', 'preposition']).length > 0;

  if (!canDepend && contains(posB, 'noun')) {
    canDepend = intersection(posA, ['adjective', 'article', 'noun', 'preposition']).length > 0;
  }

  if (!canDepend && contains(posB, 'adjective')) {
    canDepend = intersection(posA, ['preposition', 'adverb']).length > 0;
  }

  if (!canDepend && contains(posB, 'conjunction')) {
    canDepend = contains(posA, 'verb');
  }

  if (!canDepend && contains(posB, 'preposition')) {
    canDepend = contains(posA, 'noun');
  }

  return canDepend;
}

module.exports  = partsOfSpeechCanDependOnPartsOfSpeech;
