FROM golang:1.20-alpine

WORKDIR /app

COPY main.go .

RUN go mod init demo && \
    go get go.mongodb.org/mongo-driver/mongo && \
    go get go.mongodb.org/mongo-driver/bson

RUN go build -o app .

EXPOSE 8080

CMD ["./app"]
