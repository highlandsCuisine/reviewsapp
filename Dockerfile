FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install pm2@latest -g

RUN npm install

COPY . .

EXPOSE 8002

CMD ["pm2", "start", "pm2.config.js"]
