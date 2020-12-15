FROM node:lts

# Create app directory
WORKDIR /var/www/InOutBackend

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy all app source files
COPY . .

CMD [ "npm", "run", "start:prod" ]
