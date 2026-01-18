# First Contact - Shortwave Propagation Simulator
# Multi-stage build: Node.js for building, nginx for serving

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source files
COPY js/ ./js/
COPY css/ ./css/
COPY scripts/ ./scripts/
COPY index.html favicon.svg world.json VERSION ./

# Run build script
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Nginx configuration with caching and compression
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # HTML: no cache \
    location = / { \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
        try_files /index.html =404; \
    } \
    location ~* \.html$ { \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
    } \
    \
    # Static assets with hash: cache forever \
    location ~* \.(js|css)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Other static files \
    location ~* \.(json|svg|png|jpg|ico)$ { \
        expires 7d; \
        add_header Cache-Control "public"; \
    } \
    \
    # Gzip \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
