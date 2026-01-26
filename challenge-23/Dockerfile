FROM eclipse-temurin:17-jdk AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y maven

COPY pom.xml /app/
COPY src /app/src/

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=builder /app/target/demoapp-0.0.1-SNAPSHOT.jar /app/demoapp.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "demoapp.jar"]
