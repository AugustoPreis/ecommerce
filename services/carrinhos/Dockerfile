FROM node:20-alpine AS base

FROM base AS builder

WORKDIR /app
COPY package*.json ./

COPY . .
RUN npm install
RUN npm run build
COPY .env ./build

FROM base AS runtime

WORKDIR /app
COPY package*.json  ./

RUN npm install --production
COPY --from=builder /app/build .

EXPOSE 3003

CMD ["node", "src/app.js"]