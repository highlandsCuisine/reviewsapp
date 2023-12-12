FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install -g pm2

RUN npm install

COPY . .

EXPOSE 8000

CMD ["pm2", "start", "pm2.config.js"]
