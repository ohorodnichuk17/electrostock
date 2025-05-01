FROM openjdk:11-jre-slim

EXPOSE 8080

COPY target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
