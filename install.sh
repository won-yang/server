#!/bin/bash

yarn tsc

docker-compose down
docker-compose build
docker-compose up
