#syntax=docker/dockerfile:1.4

FROM golang:1.18.0-alpine3.15 as builder

RUN apk add git

WORKDIR /app

RUN --mount=target=. go build -o /binary

FROM scratch as final

COPY --from=builder --link /binary /app

ENTRYPOINT /app
