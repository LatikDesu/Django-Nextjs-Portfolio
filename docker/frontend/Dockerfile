FROM node:alpine

CMD [ "mkdir", "/app/frontend/" ]

WORKDIR /app/frontend

COPY ./frontend/ .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]