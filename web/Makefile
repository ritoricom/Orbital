.PHONY:
.SILENT:
.DEFAULT_GOAL := run

# vars

APP_IMAGE=hotel-orbital-web

# build

build:
	@docker build -t $(APP_IMAGE) .

# start

start:
	@docker run -p 3000:80 $(APP_IMAGE)

# run

run: build start
