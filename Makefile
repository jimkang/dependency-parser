test:
	node tests/basictests.js
	node tests/english-dependence-tests.js
	node tests/flip-tests.js

pushall:
	git push origin master && npm publish

D3SRC = node_modules/d3/src

D3_FORCE_FILES = \
	$(D3SRC)/start.js \
	$(D3SRC)/layout/force.js \
	$(D3SRC)/end.js

# Careful! If you rebuild this, you have to edit d3.force to take a random function after
# it is built.
d3-force: $(D3_FORCE_FILES)
	node_modules/.bin/smash $(D3_FORCE_FILES) > lib/d3-force.js

graph-workspace:
	wzrd workspaces/parse-workspace.js:index.js -- -d
