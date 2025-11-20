#get the base image of my application
FROM node:18-alpine

# inside my container create a dir
WORKDIR /app

#Copy package.json first (for caching layers)
COPY package*.json ./

#Install dependencies
RUN npm install --production

#Copy remaining source code
COPY . .

#Expose application port
EXPOSE 3000

#Start the Node server
CMD ["npm", "start"]
