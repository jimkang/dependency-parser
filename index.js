var englishCanDepend = require('./grammar/english-can-depend');

function DependencyParser(createOpts) {
  var canDepend;

  if (createOpts) {
    canDepend = createOpts.canDepend;
  }

  if (!canDepend) {
    canDepend = englishCanDepend;
  }

  function* parse(sentence) {
    var headless = [];
// debugger;
    sentence.forEach(tagWithSentencePosition);

    for (var i = 0; i < sentence.length; ++i) {
      sortWord(sentence[i], i);
      if (i < sentence.length - 1) {
        yield {
          sentence: sentence,
          headless: headless
        };
      }
    }
    // console.log(JSON.stringify(sentence, null, '  '));
    // debugger;
    // return flipTreeHeadToChild(sentence);
    return {
      sentence: sentence,
      headless: headless
    };

    function sortWord(wordNode, sentenceIndex) {
      // console.log('wordNode', wordNode);
      // wordsEncountered.unshift(wordNode);
      if (wordNode.word === 'and') {
        // debugger;
      }
// TODO: When pos is the same, use sentencePos to determine who's dependent on whom.
      var headlessIndexesToDelete = [];

      for (var i = 0; i < headless.length; ++i) {
        var headlessWordNode = headless[i];
        var headlessCanDependOnCurrent = canDepend({
          dependent: headlessWordNode,
          head: wordNode
        });

        if (headlessCanDependOnCurrent) {
          if (headlessWordNode.word === 'and') {
            // debugger;
          }

          // Should this be a grammar rule?
          if (headlessWordNode.pos !== wordNode.pos ||
            headlessWordNode.sentencePos > wordNode.sentencePos) {

            headlessWordNode.head = wordNode;
            headlessIndexesToDelete.push(i);
          }
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
          var currentCanDependOnPreceding = canDepend({
            dependent: wordNode,
            head: precedingNode
          });

          if (currentCanDependOnPreceding) {
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

function nodeHasLessThanTwoChildren(node) {
  return !node.children || node.children.length < 2;
}

module.exports = DependencyParser;
