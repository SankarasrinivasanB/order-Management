FROM node:10
#Create app directory to hold our application code inside image
WORKDIR /usr/src/app
# Install app dependencies usin npm 
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]