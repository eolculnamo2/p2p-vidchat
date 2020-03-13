FROM  node:alpine
WORKDIR /app/live-video
COPY package.json .
RUN yarn
COPY . .
RUN yarn start