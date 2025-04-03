# Use matching Node version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package.json first for better caching
COPY package.json package-lock.json* ./

# Install deps
RUN npm install

# Copy the rest of the app
COPY . .

# Set env
ENV NODE_ENV=production

# Build the app
RUN npm run build

# Start the app
EXPOSE 3000
CMD ["npm", "start"]
