FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
COPY . .

FROM nginx
COPY  --from=builder /app/build /usr/share/nginx/html