FROM eclipse-temurin:17-jdk-alpine

WORKDIR /usr/src/app
# Copy all files and folders from current context (setted in the docker-compose file) to WORKDIR
COPY . .

RUN ./gradlew jar
VOLUME /tmp

COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]