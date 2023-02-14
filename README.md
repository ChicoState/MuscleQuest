# MuscleQuest

## Running in Docker

Building the image from `Dockerfile`
`docker build -t muscle-quest .`

Once built run the image
`docker run -p 4200:4200 --mount type=bind,source="$(pwd)/muscle-quest-app/src",target=/usr/local/app/src -it muscle-quest`

You should now be able to go to localhost:4200