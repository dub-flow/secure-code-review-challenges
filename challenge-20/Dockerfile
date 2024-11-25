FROM openjdk:17-jdk-slim

# Install Maven
RUN apt-get update && apt-get install -y maven

RUN mkdir -p /var/www/uploads

# Add a test file to the uploads directory
RUN echo "This is a test file." > /var/www/uploads/test.txt

WORKDIR /app

COPY . /app

RUN mvn clean install -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/file-management-1.0-SNAPSHOT.jar"]
