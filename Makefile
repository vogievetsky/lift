# See the README for installation instructions.

NODE_PATH ?= ./node_modules
JS_COMPILER = $(NODE_PATH)/uglify-js/bin/uglifyjs
JS_TESTER = $(NODE_PATH)/nodeunit/bin/nodeunit

JS_FILES = \
	lift.js

all: \
	$(JS_FILES) \
	$(JS_FILES:.js=.min.js)

test: all
	@$(JS_TESTER) test

%.min.js: %.js Makefile
	@rm -f $@
	$(JS_COMPILER) < $< > $@