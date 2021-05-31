FROM node:alpine

WORKDIR /usr/app/backend

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]