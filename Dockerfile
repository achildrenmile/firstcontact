# First Contact - Shortwave Propagation Simulator
# Multi-stage build: Node.js for bundling, nginx for serving

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY js/ ./js/

# Bundle JavaScript
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy static files
COPY index.prod.html /usr/share/nginx/html/index.html
COPY css/ /usr/share/nginx/html/css/
COPY favicon.svg /usr/share/nginx/html/
COPY world.json /usr/share/nginx/html/
COPY countries.json /usr/share/nginx/html/

# Copy bundled JavaScript from builder
COPY --from=builder /app/dist/app.bundle.js /usr/share/nginx/html/

# Custom nginx config
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache static assets \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|json)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Gzip compression \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
