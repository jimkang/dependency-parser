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
    var childCountsForHeads = {};

    function incrementChildCountForNode(node) {
      var count = childCountsForHeads[node.sentencePos];
      if (count === undefined) {
        count = 0;
      }
      count += 1;
      childCountsForHeads[node.sentencePos] = count;
    }

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
      var precedingNode = getPreviousWordThatIsNotADependent(sentenceIndex, sentence);
      var nextNode;
      if (sentenceIndex < sentence.length - 1) {
        nextNode = sentence[sentenceIndex + 1];
      }

      for (var i = 0; i < headless.length; ++i) {
        var headlessWordNode = headless[i];
        var headlessCanDependOnCurrent = canDepend({
          dependent: headlessWordNode,
          head: wordNode,
          prev: precedingNode,
          next: nextNode
        });

        if (headlessCanDependOnCurrent) {
          if (headlessWordNode.word === 'and') {
            // debugger;
          }

          // Should this be a grammar rule?
          if (headlessWordNode.pos !== wordNode.pos ||
            headlessWordNode.sentencePos > wordNode.sentencePos) {

            // if (childCountsForHeads[wordNode.sentencePos] > 1) {
            //   debugger;
            // }
            headlessWordNode.head = wordNode;
            incrementChildCountForNode(wordNode);

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
            // If precedingNode already has two children, can wordNode replace preceding node?
            if (childCountsForHeads[precedingNode.sentencePos] > 1 &&
              canSwap(precedingNode, wordNode)) {

              wordNode.head = precedingNode.head;
              precedingNode.head = wordNode;
              incrementChildCountForNode(wordNode);
            }
            else {
              wordNode.head = precedingNode;
              incrementChildCountForNode(precedingNode);
            }

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

  // Can inTreeNode's head be potentialReplacementNode's head?
  // And can potentialReplacementNode be inTreeNode's head?
  function canSwap(inTreeNode, potentialReplacementNode) {
    return inTreeNode.head &&
      canDepend({
        dependent: potentialReplacementNode,
        head: inTreeNode.head
      }) &&
      canDepend({
        dependent: inTreeNode,
        head: potentialReplacementNode
      });
  }
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
