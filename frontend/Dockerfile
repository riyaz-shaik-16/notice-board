FROM node:20-alpine

WORKDIR /app

COPY package*.json .

COPY components.json .

COPY jsconfig.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]