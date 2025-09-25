FROM node:22.18-alpine

WORKDIR /app

COPY ./package*.json .

RUN npm i

COPY . .

RUN npx prisma generate

RUN npm build

EXPOSE 3000

CMD ["npm", "start:prod"]
