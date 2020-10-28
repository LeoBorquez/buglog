FROM node:15.0.1-alpine3.12

RUN mkdir -p /usr/src/app
RUN mkdir -p /logs/access.log
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --silent

COPY . .

EXPOSE 3001
CMD ["node", "server.js"]