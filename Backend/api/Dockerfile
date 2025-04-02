# Backend
FROM ubuntu:latest

WORKDIR /app

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean


RUN apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libasound2t64 \
    libpangocairo-1.0-0 \
    libgtk-3-0 \
    libgbm1

COPY package*.json ./
RUN npm install

RUN npx --yes puppeteer browsers install chrome

COPY . .

EXPOSE 3100

CMD ["npm", "run", "start"]