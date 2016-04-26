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

    function decrementChildCountForNode(node) {
      var count = childCountsForHeads[node.sentencePos];
      if (!isNaN(count)) {
        count -= 1;
        childCountsForHeads[node.sentencePos] = count;
      }
    }

    function setHeadDependentPair(headNode, dependentNode, grammarFinding) {
      if (dependentNode.head) {
        decrementChildCountForNode(dependentNode.head);
      }
      dependentNode.head = headNode;
      dependentNode.defactoPOS = grammarFinding.roles.dependent;
      headNode.defactoPOS = grammarFinding.roles.head;

      incrementChildCountForNode(headNode);
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

        if (headlessCanDependOnCurrent.canDepend) {
          // Should this be a grammar rule?
          if (headlessWordNode.pos !== wordNode.pos ||
            headlessWordNode.sentencePos > wordNode.sentencePos) {

            setHeadDependentPair(wordNode, headlessWordNode, headlessCanDependOnCurrent);

            headlessIndexesToDelete.push(i);
          }
        }
        else {
          break;
        }
      }

      headlessIndexesToDelete.reverse().forEach(deleteFromHeadless);

      // Re-establish the preceding node after possible changes to the tree above.
      precedingNode = getPreviousWordThatIsNotADependent(sentenceIndex, sentence);

      if (precedingNode) {
        do {
          var currentCanDependOnPreceding = canDepend({
            dependent: wordNode,
            head: precedingNode
          });

          if (currentCanDependOnPreceding.canDepend) {
            var didSwap = false;
            // If precedingNode already has two children, can wordNode replace preceding node?
            if (childCountsForHeads[precedingNode.sentencePos] > 1) {
              if (precedingNode.head) {
                var currentCanDependOnPrecedingHead = canDepend({
                  dependent: wordNode,
                  head: precedingNode.head
                });
                if (currentCanDependOnPrecedingHead.canDepend) {
                  var precedingCanDependOnCurrent = canDepend({
                    dependent: precedingNode,
                    head: wordNode
                  });
                  if (precedingCanDependOnCurrent.canDepend) {
                    setHeadDependentPair(
                      precedingNode.head, wordNode, currentCanDependOnPrecedingHead
                    );
                    setHeadDependentPair(
                      wordNode, precedingNode, precedingCanDependOnCurrent
                    );
                    didSwap = true;
                  }
                }
              }
            }

            if (!didSwap) {
              setHeadDependentPair(precedingNode, wordNode, currentCanDependOnPreceding);
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
