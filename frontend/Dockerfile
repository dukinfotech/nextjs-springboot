FROM node:18-alpine

WORKDIR /usr/src/app
# Copy all files and folders from current context (set in the docker-compose file) to WORKINGDIR
COPY . .
ARG APP_HOST
ENV APP_HOST=${APP_HOST}
ARG APP_ACCESS_TOKEN_EXPIRE
ENV APP_ACCESS_TOKEN_EXPIRE=${APP_ACCESS_TOKEN_EXPIRE}
# Install dependencies
RUN npm install --omit=dev
# Build app
RUN npm run build
# Run app
CMD [ "npm run start" ]