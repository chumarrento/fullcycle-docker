FROM golang:alpine AS builder
WORKDIR /usr/go/app
COPY hello-world.go .
RUN go build -ldflags "-s -w" hello-world.go

FROM scratch
COPY --from=builder /usr/go/app/hello-world .
CMD [ "./hello-world" ]