FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

RUN apt-get update && apt-get install -y maven

COPY pom.xml .

COPY src ./src

RUN mvn clean package

FROM tomcat:9.0

RUN rm -rf /usr/local/tomcat/webapps/*

COPY --from=build /app/target/Challenge16.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080

CMD ["catalina.sh", "run"]
