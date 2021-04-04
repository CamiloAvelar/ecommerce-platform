.PHONY: config build up down debug start stop restart logs ps login

config:
	cp -n docker/example.env ./.env

build:
	docker-compose build

up: config
	docker-compose up -d

watch: config
	WATCH_FILES=1 docker-compose up -d

down: config
	docker-compose down

debug: down config
	WATCH_FILES=1 docker-compose -f docker-compose.yml -f ./docker/debug.yml up -d

start: config
	docker-compose start

stop:
	docker-compose stop

restart: down up

logs:
	docker-compose logs --tail=10 -f

ps:
	docker-compose ps

login:
	docker-compose run -w /application proshop-frontend /bin/bash