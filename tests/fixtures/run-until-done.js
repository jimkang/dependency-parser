function runIteratorUntilDone(iterator) {
  var result;
  do {
    result = iterator.next();
  }
  while (!result.done);

  return result.value;
}

module.exports = runIteratorUntilDone;
