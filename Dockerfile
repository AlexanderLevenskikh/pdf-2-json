FROM node:alpine

USER root

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/front
RUN apk add make gcc g++ python \
 && npm install
RUN npm run build:prod
RUN mkdir -p ../back/static
RUN cp -r dist/* ../back/static

WORKDIR /usr/src/app/back
RUN npm install

RUN npm run build
CMD [ "npm", "run", "start:prod" ]
