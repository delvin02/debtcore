FROM node:latest

WORKDIR /app

COPY package.json ./

# Setting up dependencies
RUN npm install -g npm@8.6.0
RUN npm install 

COPY . .

EXPOSE 5174
