FROM openjdk:8u131-slim
EXPOSE 8080
RUN apt-get update && apt-get install -y wget
RUN wget https://downloads.apache.org/maven/maven-3/3.8.8/binaries/apache-maven-3.8.8-bin.tar.gz 
RUN mkdir /opt/maven
RUN tar xzvf apache-maven-3.8.8-bin.tar.gz -C /opt/maven
RUN export PATH=$PATH:/opt/maven/apache-maven-3.8.6/bin
RUN mkdir /app
WORKDIR /app
COPY . .
# Add DB jar to repository
RUN /opt/maven/apache-maven-3.8.8/bin/mvn install:install-file -Dfile=/app/src/main/resources/jars/postgresql-42.6.0.jar -DgroupId=postgresql -DartifactId=jdbc -Dversion=42.6 -Dpackaging=jar
RUN /opt/maven/apache-maven-3.8.8/bin/mvn package  -Dmaven.test.skip=true
CMD [ "java" , "-jar", "/app/target/mytracker-1.0.0.war"]

