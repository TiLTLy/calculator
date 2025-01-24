# Use an official Node.js runtime as a parent image
FROM node:16-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install project dependencies
RUN npm install

# Build the React app for production
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Serve the built app using a simple web server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
