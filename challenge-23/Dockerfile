FROM maven:3.8.6-openjdk-11-slim AS builder

WORKDIR /app

COPY pom.xml /app/
COPY src /app/src/

RUN mvn clean package -DskipTests

FROM openjdk:11-jre-slim

WORKDIR /app

COPY --from=builder /app/target/demoapp-0.0.1-SNAPSHOT.jar /app/demoapp.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "demoapp.jar"]
