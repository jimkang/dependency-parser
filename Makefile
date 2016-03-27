test:
	node tests/basictests.js
	node tests/english-dependence-tests.js
	node tests/flip-tests.js

pushall:
	git push origin master && npm publish
