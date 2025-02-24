# Use the official Go image as the base image
FROM golang:1.20 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files and download dependencies
COPY go.mod ./
RUN go mod download

# Copy the source code into the container
COPY main.go ./

# Build the Go application
RUN go build -o main .

# Start a new stage from scratch
FROM gcr.io/distroless/base

# Copy the binary from the builder stage
COPY --from=builder /app/main /app/main

# Command to run the application
ENTRYPOINT ["/app/main"]
