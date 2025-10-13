FROM node:18-apline

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY ..

RUN npm run build

FROM node:18-alpine

WORKDIR /server

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /server/dist ./dist
COPY --from=builder /server/.env ./.env

EXPOSE 8000

CMD ["node", "dist/server.js"]