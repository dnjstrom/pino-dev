FROM node:16-slim as deps
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install

FROM deps as dev
CMD npm run dev
