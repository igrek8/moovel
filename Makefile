.DEFAULT_GOAL: build

pwd=$(shell pwd)

build:
	docker build --rm --pull -t github-search-engine:latest .

start:
	docker-compose up -d --build

stop:
	docker-compose down

test:
	docker-compose run \
		-e CI=true \
		-e NODE_ENV=test \
		-e PATH=$$PATH:/usr/src/node_modules/.bin \
		-v $(pwd)/tests:/usr/src/app/tests \
		--rm web yarn test

tar:
	tar \
		--exclude='node_modules' \
		--exclude='.DS_Store' \
		--exclude='.git' \
		--exclude='.vscode' \
		-pcvzf moovel.tar.gz .

untar:
	mkdir moovel
	tar -pxvzf moovel.tar.gz -C moovel