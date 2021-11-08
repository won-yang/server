FROM node:16-alpine3.14
RUN apk add --no-cache 
RUN mkdir /wonyang

COPY yarn.lock /wonyang
COPY package.json /wonyang

COPY install.sh /wonyang
COPY .env /wonyang

WORKDIR /wonyang

RUN chmod 755 ./install.sh
RUN ./install.sh

ENTRYPOINT ["yarn", "start"]