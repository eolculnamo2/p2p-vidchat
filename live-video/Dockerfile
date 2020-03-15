FROM  node:alpine
WORKDIR /app/live-video
COPY package.json .
RUN yarn
RUN yarn build
COPY . .
RUN yarn start:prod