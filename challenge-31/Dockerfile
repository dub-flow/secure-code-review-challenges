FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o app .

FROM alpine:3.20

WORKDIR /app
COPY --from=builder /app/app .

EXPOSE 5000

CMD ["./app"]
