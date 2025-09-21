# Use Node.js official image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /ws

# Copy package files first (for caching installs)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Run the app
CMD ["node", "server.js"]
