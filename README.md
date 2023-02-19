# MuscleQuest

## Developing

### Run with docker-compose
Running with docker-compose will automatically build the container and locally serve it on `localhost:4200`.

```
docker-compose up
```

### Run interactively
Running interactively will allow you run angular commands and such inside the container.

**1. Build the image from the `Dockerfile`:**
```
docker build -t muscle-quest .
```

**2. Once built run the image:**
```
docker run -p 4200:4200 --mount type=bind,source="$(pwd)/muscle-quest-app/src",target=/usr/local/app/src -it muscle-quest sh
```

You should now be able to go to `localhost:4200` and see live updates to the application from your local machine.