FROM node:alpine
COPY package*.json ./

RUN yarn install
RUN yarn add nodemon

COPY . .
WORKDIR /usr/app/backend

ENV MONGO_DB_URL=comic-workshop-db:27017

EXPOSE 8080
CMD ["yarn", "dev"]