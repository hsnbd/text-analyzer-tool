FROM node:22

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

RUN mkdir -p /app/logs

EXPOSE 5000

CMD [ "yarn", "start:prod" ]