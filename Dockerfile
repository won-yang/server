FROM node:16-alpine3.14
RUN apk add --no-cache 
RUN mkdir /wonyang

COPY yarn.lock /wonyang
COPY package.json /wonyang

COPY .env /wonyang

WORKDIR /wonyang

RUN yarn install

ENTRYPOINT ["yarn", "start"]