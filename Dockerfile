FROM node:16

# создание директории приложения
WORKDIR /kodeks

# установка зависимостей
COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 5000:5000

CMD [ "node", "index.js" ]