var contains = require('lodash.contains');
var intersection = require('lodash.intersection');
var applyPOSDependenceRule = require('./english-apply-pos-dependence-rule');
var rules = require('./english-pos-dependence-rules');

var verbFam = ['verb', 'verb-transitive', 'verb-intransitive'];
var articleFam = ['definite-article', 'indefinite-article', 'article'];
var nounFam = ['noun', 'pronoun'];

// TODO: POS priority
function canDepend(opts) {
  var dependent;
  var head;
  var next;
  var prev;

  if (opts) {
    dependent = opts.dependent;
    head = opts.head;
    next = opts.next;
    prev = opts.prev;
  }

  var posDependent = dependent.pos;
  var posHead = head.pos;

  var canDepend = overlaps(posHead, verbFam) &&
    overlaps(posDependent, nounFam.concat(['adverb', 'preposition']));

  if (!canDepend && overlaps(posHead, nounFam)) {
    canDepend = overlaps(posDependent, nounFam.concat(articleFam).concat(['adjective']));
  }

  if (!canDepend && contains(posHead, 'adjective')) {
    canDepend = overlaps(posDependent, ['adverb']);
  }

  if (!canDepend && contains(posHead, 'conjunction')) {
    canDepend = overlaps(posDependent, verbFam.concat(['conjunction']));
  }

  if (!canDepend && contains(posHead, 'adverb')) {
    canDepend = contains(posDependent, 'adverb');
  }

  if (!canDepend && contains(posHead, 'preposition')) {
    canDepend = overlaps(posDependent, nounFam);
  }

  return canDepend;
}

function overlaps(listA, listB) {
  return intersection(listA, listB).length > 0;
}

// function resolveAmbiguities(partsList) {
//   if (contains(partsList, 'conjunction')) {
//     return ['conjunction'];
//   }
//   else {
//     return partsList.slice(0, 1)
//   }
// }

module.exports  = canDepend;
