FROM node:alpine

USER root

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/front
RUN apk add --no-cache --virtual .build-deps make gcc g++ python \
 && npm install \
 && apk del .build-deps
RUN npm run build:prod
RUN mkdir -p ../back/static
RUN cp -r dist/* ../back/static

WORKDIR /usr/src/app/back
RUN npm ci --loglevel error

RUN npm run build
CMD [ "npm", "run", "start:prod" ]
