FROM openjdk:17-oracle

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file into the container
COPY xyz-company*SNAPSHOT.jar /app/app.jar

# Expose the port that your Spring Boot application will run on
EXPOSE 8080

# Define environment variables if needed
# ENV SPRING_PROFILES_ACTIVE=production
ENV TZ=Asia/Singapore

# Command to run the application
CMD ["java", "-Xms1024m", "-Xmx2048m", "-jar", "app.jar"]
