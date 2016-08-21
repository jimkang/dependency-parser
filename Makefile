test:
	node tests/basictests.js
	node tests/english-dependence-tests.js
	node tests/flip-tests.js

pushall:
	git push origin master && npm publish

D3SRC = node_modules/d3/src

D3_TREE_FILES = \
	$(D3SRC)/start.js \
	$(D3SRC)/layout/tree.js \
	$(D3SRC)/end.js

d3-tree: $(D3_TREE_FILES)
	node_modules/.bin/smash $(D3_TREE_FILES) > lib/d3-tree.js

graph-workspace:
	wzrd workspaces/parse-workspace.js:workspace-index.js -- -d -t [babelify ---presets [es2015]]

build-workspace:
	browserify workspaces/parse-workspace.js -d -t [babelify ---presets [es2015]] > workspace-index.js
