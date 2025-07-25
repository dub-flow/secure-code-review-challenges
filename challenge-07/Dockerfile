FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
