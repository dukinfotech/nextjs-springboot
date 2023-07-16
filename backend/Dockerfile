# FROM gradle:latest AS builder

# WORKDIR /usr/src/app
# # Copy all files and folders from current context (setted in the docker-compose file) to WORKDIR
# COPY . .
# # This changes default user to root
# USER root
# # This changes ownership of folder
# RUN chown -R gradle . 
# # This changes the user back to the default user "gradle"
# USER gradle

# RUN chmod +x gradlew

# RUN ./gradlew build --stacktrace

# FROM eclipse-temurin:17-jdk-alpine
# VOLUME /tmp

# COPY --from=builder build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]

FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp

COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]