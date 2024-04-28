FROM node:latest

WORKDIR /app

COPY package.json ./

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL:-https://3c0f-211-26-122-216.ngrok-free.app}

RUN npm i
RUN npm install -g npm@8.6.0

RUN npm install 

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Expose the port your app runs on
EXPOSE 5174
