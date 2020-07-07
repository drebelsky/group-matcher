.PHONY: default

default:
	rm docs/index.css docs/index.js
	cp index.css index.js -t docs
	rm docs/index.html
	sed 's/development\.js/production.min.js/' index.html > docs/index.html
