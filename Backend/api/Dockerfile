## Backend
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npx puppeteer browsers install chrome
RUN npm install

COPY . .

EXPOSE 3100

CMD ["npm", "run", "start"]