# Refactored from https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx/
# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./muscle-quest-app /usr/local/app/

# Install all the dependencies
RUN npm install
RUN npm install -g @angular/cli

# Generate the build of the application
#RUN npm run build
CMD ng serve --host 0.0.0.0

# Expose port 4200
EXPOSE 4200
