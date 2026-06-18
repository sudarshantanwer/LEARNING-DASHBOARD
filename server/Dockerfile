FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY server/package.json server/
COPY client/package.json client/

RUN npm ci

COPY server server
COPY database database

RUN npm run build -w server

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY server/package.json server/
COPY client/package.json client/

RUN npm ci --omit=dev

COPY --from=build /app/server/dist ./server/dist
COPY database ./database

WORKDIR /app/server
ENV PORT=4010
EXPOSE 4010

CMD ["node", "dist/index.js"]
