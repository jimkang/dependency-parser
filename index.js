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

    sentence.forEach(tagWithSentencePosition);
    sentence.forEach(sortWord);
    // console.log(JSON.stringify(sentence, null, '  '));
    return flipTreeHeadToChild(sentence);

    function sortWord(wordNode, sentenceIndex) {
      // console.log('wordNode', wordNode);
      // wordsEncountered.unshift(wordNode);
      var nextVersionOfHeadless = [];
      for (var i = 0; i < headless.length; ++i) {
        var headlessWordNode = headless[i];
        // if (!wordNode.pos) {
        // }
        if (canDepend(headlessWordNode.pos, wordNode.pos)) {
          headlessWordNode.head = wordNode;
        }
        else {
          nextVersionOfHeadless.push(headlessWordNode);
          break;
        }
      }

      headless = nextVersionOfHeadless;

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
    // console.log('isDependent wordNode', wordNode);
    currentNode = wordNode.head;
    if (currentNode.sentencePos === potentialHead.sentencePos) {
      return true;
    }
  }
  return false;
}

module.exports = DependencyParser;
