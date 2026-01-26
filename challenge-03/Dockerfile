FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y maven && mvn clean package -DskipTests

CMD ["java", "-jar", "target/demo-1.0.0.jar"]
