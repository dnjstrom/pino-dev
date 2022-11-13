FROM node:14-slim as deps
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install

FROM deps as dev
CMD npm run dev
