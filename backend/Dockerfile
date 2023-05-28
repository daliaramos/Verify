FROM node:18

RUN npm install -g pnpm

WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .
EXPOSE 8080
ENV ADDRESS=0.0.0.0 PORT=8080 DB_HOST=postgres DB_PORT=5432 DB_NAME=verify DB_USER=verify DB_PASS=verify PASSWORD=password NODE_ENV=development

RUN pnpm build

#NOTE WE CANNOT DO {PNPM DB:RESET} HERE BECAUSE DOCKER WILL NOT CONNECT THE NETWORK AT BUILD TIME

CMD ["pnpm", "startProd"]



