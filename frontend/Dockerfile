# Common build stage
FROM node:14.14.0-alpine3.12

COPY . ./frontend

WORKDIR /frontend

RUN npm install

EXPOSE 8080

ENV NODE_ENV production

CMD ["npm", "run", "serve"]
