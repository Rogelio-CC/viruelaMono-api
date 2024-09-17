FROM node:18.17.0
# CREATE APP DIRECTORY
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/app.js"]