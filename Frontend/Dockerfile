FROM node:20-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./
RUN npm ci

COPY .env .env

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve \
    && addgroup -S app \
    && adduser -S app -G app

COPY --from=builder /app/dist ./dist

USER app

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
