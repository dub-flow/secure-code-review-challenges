# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the rest of the application code
COPY . .

# Install the app dependencies
RUN npm install

# Expose port 5000 for the Express app
EXPOSE 5000

# Start the Express app
CMD ["node", "main.js"]
