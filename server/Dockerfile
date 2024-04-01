# Use an official Node.js runtime as a base image
FROM node

# Set the working directory in the container
WORKDIR /index

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the backend source code to the container
COPY . .

# Expose the port your app will run on
EXPOSE 80

# Command to run your application
CMD ["npm", "start"]
