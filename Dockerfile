FROM node:16-alpine

WORKDIR /usr/client/app
COPY package*.json ./
RUN npm ci
COPY . .
ENV MONGODB_URI mongodb://mongo:27017/angularGT7
#RUN npm run builddev
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
