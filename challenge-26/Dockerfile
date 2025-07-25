FROM node:18

# Set working directory
WORKDIR /app

# Copy package files (if you had them) and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app code
COPY . .

# Expose the app port
EXPOSE 3000

# Run the app
CMD ["node", "main.js"]
