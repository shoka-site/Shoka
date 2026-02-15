FROM node:20.19.0-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
# Using npm ci for cleaner install
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
