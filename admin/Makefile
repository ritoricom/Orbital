.PHONY:
.SILENT:
.DEFAULT_GOAL := run

# vars

DOCKER_IMAGE=hotel-orbital-admin

# build

build:
	@docker build -t $(DOCKER_IMAGE) .

# start

start:
	@docker run -p 80:80 $(DOCKER_IMAGE)

# run

run: build start
