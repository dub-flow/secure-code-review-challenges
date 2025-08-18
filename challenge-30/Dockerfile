FROM golang:1.21-bullseye AS builder

WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .
RUN go build -o app main.go

FROM debian:bullseye

RUN apt-get update && apt-get install -y \
    wkhtmltopdf \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/app .

EXPOSE 5000
CMD ["./app"]
