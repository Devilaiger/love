# Use official Node.js LTS Alpine image for minimal footprint and maximum security
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source code and static assets
COPY . .

# Render automatically provides PORT at runtime (defaulting to 8000)
ENV PORT=8000
ENV NODE_ENV=production

# Expose default port
EXPOSE 8000

# Start Express server
CMD ["npm", "start"]
