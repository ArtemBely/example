FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
EXPOSE 8888
CMD ["node", "app.js"]
