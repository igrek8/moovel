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
		-e PATH=$$PATH:/usr/src/node_modules/.bin \
		-v $(pwd)/tests:/usr/src/app/tests \
		--rm web yarn test
