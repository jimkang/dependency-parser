var contains = require('lodash.contains');
var intersection = require('lodash.intersection');

var verbFam = ['verb', 'verb-transitive', 'verb-intransitive'];
var articleFam = ['definite-article', 'indefinite-article', 'article'];
var nounFam = ['noun', 'pronoun'];

var profiles = [
  {
    headPOS: verbFam,
    dependentPOS: nounFam.concat(['adverb', 'preposition'])
  },
  {
    headPOS: nounFam,
    dependentPOS: articleFam.concat(['adjective'])
  },
  {
    headPOS: ['adjective'],
    dependentPOS: ['adverb']
  },
  {
    headPOS: ['conjunction'],
    dependentPOS: verbFam.concat(['conjunction', 'preposition'])
  },
  {
    headPOS: ['adverb'],
    dependentPOS: ['adverb']
  },
  {
    headPOS: ['preposition'],
    dependentPOS: nounFam.concat(verbFam)
  }
];

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
  var finding = {};  

  profiles.some(checkAgainstProfile);

  function checkAgainstProfile(profile) {
    finding = checkProfile(head.pos, dependent.pos, profile);
    return finding.canDepend;
  }

  return finding;
}

function overlaps(listA, listB) {
  return intersection(listA, listB).length > 0;
}

function checkProfile(posHead, posDependent, profile) {
  var finding = {
    canDepend: false
  };

  var headOverlap = intersection(posHead, profile.headPOS);
  if (headOverlap.length > 0) {
    var dependentOverlap = intersection(posDependent, profile.dependentPOS);

    if (dependentOverlap.length > 0) {
      finding.canDepend = true;
      finding.roles = {
        dependent: dependentOverlap[0],
        head: headOverlap[0]
      };
    }
  }

  return finding;
}

module.exports  = canDepend;
