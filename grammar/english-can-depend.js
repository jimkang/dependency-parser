var contains = require('lodash.contains');
var intersection = require('lodash.intersection');
var without = require('lodash.without');

var verbFam = ['verb', 'verb-transitive', 'verb-intransitive'];
var articleFam = ['definite-article', 'indefinite-article', 'article'];
var nounFam = ['noun', 'pronoun'];

// TODO: POS priority
function partsOfSpeechCanDependOnPartsOfSpeech(a, b) {
  var posA = resolveAmbiguities(a);
  var posB = resolveAmbiguities(b);

  var canDepend = overlaps(posB, verbFam) &&
    overlaps(posA, nounFam.concat(['adverb', 'preposition']));

  if (!canDepend && overlaps(posB, nounFam)) {
    canDepend = overlaps(posA, nounFam.concat(articleFam).concat(['adjective']));
  }

  if (!canDepend && contains(posB, 'adjective')) {
    canDepend = overlaps(posA, ['preposition', 'adverb']);
  }

  if (!canDepend && contains(posB, 'conjunction')) {
    canDepend = overlaps(posA, verbFam.concat(['conjunction']));
  }

  if (!canDepend && contains(posB, 'adverb')) {
    canDepend = contains(posA, 'adverb');
  }

  if (!canDepend && contains(posB, 'preposition')) {
    canDepend = contains(posA, nounFam);
  }

  return canDepend;
}

function overlaps(listA, listB) {
  return intersection(listA, listB).length > 0;
}

function resolveAmbiguities(partsList) {
  if (contains(partsList, 'conjunction')) {
    return ['conjunction'];
  }
  return partsList;
}

module.exports  = partsOfSpeechCanDependOnPartsOfSpeech;
