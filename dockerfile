FROM node:20.19.3-alpine3.22

WORKDIR /app

COPY ./package*.json .

RUN npm install -g pnpm@latest-10

RUN pnpm i

COPY . .

RUN npx prisma generate

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start:prod"]