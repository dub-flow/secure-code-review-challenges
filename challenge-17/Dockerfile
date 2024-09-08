# Use Golang image to build the app
FROM golang:1.20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy everything to the container
COPY . .

# Build the app
RUN go mod init command-injection-challenge && \
    go mod tidy && \
    go build -o /ping-app

# Start a new image to run the app using a more recent base image
FROM ubuntu:22.04

# Install the required version of glibc and ping utility
RUN apt-get update && apt-get install -y libc6 iputils-ping

# Copy the binary from the build stage
COPY --from=builder /ping-app /ping-app

# Expose the port the app runs on
EXPOSE 5000

# Command to run the binary
CMD ["/ping-app"]
