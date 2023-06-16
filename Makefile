install: install-deps
	npx simple-git-hooks

run:
	bin/gendiff.js

install-deps:
	npm ci

test:
	npm test --test-reporter=spec

test-coverage:
	# TODO: set global flag --experimental-test-coverage
	npx jest --coverage

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test