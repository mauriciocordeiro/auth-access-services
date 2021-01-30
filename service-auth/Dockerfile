FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN ls -las
EXPOSE 3000
CMD [ "node", "server.js" ]