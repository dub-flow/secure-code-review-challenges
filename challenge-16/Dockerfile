FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean package

FROM tomcat:9.0

RUN rm -rf /usr/local/tomcat/webapps/*

COPY --from=build /app/target/Challenge16.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080

CMD ["catalina.sh", "run"]
