# CMI Admin in a Docker

## MongoDB

1. Build the docker in docker_mongodb:
docker build -t epflsti/mongodb .

2. RUn the docker (in deamon mode):
docker run -d -p 27017:27017 --name=epflstimongodb epflsti/mongodb

3. (Optional) To find the docker's IP address use:
$ docker inspect $(docker ps -q) | grep IPA

Or more specifically

docker inspect epflstimongodb | grep IPA

=> Mongo DB is running, you can test with
mongo 172.17.0.2


## Meteor APP
1. We use the meteorhack docker base image (check differences between onbuild/devbuild) on the [github page](https://github.com/meteorhacks/meteord)
1. First copy the Docker file to the app's root folder ! e.g. with ln -s docker_meteor/Dockerfile .
1. Buid the cmiadmin container (from app's root folder):
docker build -t epflsti/cmiadmin .

The Dockerfile will install meteor and copy the whole repo into the container except file listed in the .dockerignore

This can take a very long time (~10 minutes).

In a production release, be sure to use the [onbuild tag](https://github.com/meteorhacks/meteord#stop-downloading-meteor-each-and-every-time-mostly-in-development)


### Run the meteor app container

docker run -p 3000:80 --name=cmiadmin -e MONGO_URL="mongodb://172.17.0.2" -e ROOT_URL="http://localhost:3000"  epflsti/cmiadmin



## How to link both containers together

1. $ docker run -d --name=epflstimongodb epflsti/mongodb
1. $ docker run -p 3000:80 --name=cmiadmin -e MONGO_URL="mongodb://epflstimongodb" -e ROOT_URL="http://localhost:3000" --link epflstimongodb:epflstimongodb  epflsti/cmiadmin



## How to use docker compose

@TODO next friday: https://docs.docker.com/compose/

