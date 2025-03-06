# any version should work, as long as Telegraf library is supported by that version
FROM node:23
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "index.js" ]
