FROM  node:alpine
WORKDIR /app/ui
COPY package.json .
RUN yarn
COPY . .
RUN yarn start