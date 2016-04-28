var contains = require('lodash.contains');
var intersection = require('lodash.intersection');
var posFam = require('../pos-families');

var profiles = [
  {
    headPOS: posFam.verb,
    dependentPOS: posFam.noun.concat(['adverb', 'preposition', 'adjective'])
  },
  {
    headPOS: posFam.noun,
    dependentPOS: posFam.article.concat(['adjective'])
  },
  {
    headPOS: ['adjective'],
    dependentPOS: ['adverb']
  },
  {
    headPOS: ['conjunction'],
    dependentPOS: posFam.verb.concat(['conjunction', 'preposition'])
  },
  {
    headPOS: ['adverb'],
    dependentPOS: ['adverb']
  },
  {
    headPOS: ['preposition'],
    dependentPOS: posFam.noun.concat(posFam.verb)
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
  if (dependent.defactoPOS) {
    posDependent = [dependent.defactoPOS];
  }
  var posHead = head.pos;
  if (head.defactoPOS) {
    posHead = [head.defactoPOS];
  }
  var finding = {};  

  profiles.some(checkAgainstProfile);

  function checkAgainstProfile(profile) {
    finding = checkProfile(posHead, posDependent, profile);
    return finding.canDepend;
  }

  return finding;
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
