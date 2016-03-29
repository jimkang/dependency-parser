var englishCanDepend = require('./grammar/english-can-depend');
var flipTreeHeadToChild = require('./flip-tree-head-to-child');

function DependencyParser(createOpts) {
  var canDepend;

  if (createOpts) {
    canDepend = createOpts.canDepend;
  }

  if (!canDepend) {
    canDepend = englishCanDepend;
  }

  function parse(sentence) {
    var headless = [];
debugger;
    sentence.forEach(tagWithSentencePosition);
    sentence.forEach(sortWord);
    // console.log(JSON.stringify(sentence, null, '  '));
    debugger;
    return flipTreeHeadToChild(sentence);

    function sortWord(wordNode, sentenceIndex) {
      // console.log('wordNode', wordNode);
      // wordsEncountered.unshift(wordNode);
      if (wordNode.word === 'and') {
        debugger;
      }
// TODO: When pos is the same, use sentencePos to determine who's dependent on whom.
      var headlessIndexesToDelete = [];

      for (var i = 0; i < headless.length; ++i) {
        var headlessWordNode = headless[i];
        if (canDepend(headlessWordNode.pos, wordNode.pos)) {
          if (headlessWordNode.word === 'and') {
            debugger;
          }
          headlessWordNode.head = wordNode;
          headlessIndexesToDelete.push(i);
        }
        else {
          break;
        }
      }

      headlessIndexesToDelete.reverse().forEach(deleteFromHeadless);
      // console.log('headless', headless);

      var precedingNode = getPreviousWordThatIsNotADependent(sentenceIndex, sentence);
      if (precedingNode) {
        do {
          if (canDepend(wordNode.pos, precedingNode.pos)) {
            wordNode.head = precedingNode;
            break;
          }
        }
        while ((precedingNode = precedingNode.head));
      }

      if (!wordNode.head) {
        headless.unshift(wordNode);
      }
    }

    function deleteFromHeadless(i) {
      headless.splice(i, 1);
    }
  }
  
  return parse;
}

function getPreviousWordThatIsNotADependent(index, sentence) {
  var wordNode = sentence[index];
  for (var previousIndex = index - 1; previousIndex > 0; previousIndex -= 1) {
    if (!isDependent(sentence[previousIndex], wordNode)) {
      return sentence[previousIndex];
    }
  }
}

function addEmptyDependents(wordNode) {
  wordNode.dependents = [];
}

function tagWithSentencePosition(wordNode, i) {
  wordNode.sentencePos = i;
}

function isDependent(wordNode, potentialHead) {
  var currentNode = wordNode;
  while ('head' in currentNode) {
    // console.log('isDependent currentNode', currentNode);
    currentNode = currentNode.head;
    if (currentNode.sentencePos === potentialHead.sentencePos) {
      return true;
    }
  }
  return false;
}

module.exports = DependencyParser;
