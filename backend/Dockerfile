FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# Expose the port on which the API will run
EXPOSE 5008

CMD ["npm", "start"]