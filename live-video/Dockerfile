FROM  node:alpine
WORKDIR '/app'
COPY package.json .
#RUN yarn
#RUN yarn build
COPY . .
CMD ["node", "./dist/main"]