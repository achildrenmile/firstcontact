# First Contact - Shortwave Propagation Simulator
# Multi-stage build: Node.js for bundling with hash, nginx for serving

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY js/ ./js/
COPY css/ ./css/
COPY index.prod.html ./

# Bundle JavaScript with hash filename
# Also hash CSS filename for cache busting
RUN npm run build:prod && \
    BUNDLE_FILE=$(ls dist/ | grep -E '^app\.[a-zA-Z0-9]+\.js$' | head -1) && \
    echo "Generated JS bundle: $BUNDLE_FILE" && \
    sed -i "s|app\.[a-zA-Z0-9_]*\.js|$BUNDLE_FILE|g" index.prod.html && \
    # Generate hash for CSS file
    CSS_HASH=$(md5sum css/styles.css | cut -c1-8) && \
    CSS_FILE="styles.${CSS_HASH}.css" && \
    echo "Generated CSS: $CSS_FILE" && \
    mkdir -p dist/css && \
    cp css/styles.css "dist/css/${CSS_FILE}" && \
    sed -i "s|css/styles\.css|css/${CSS_FILE}|g" index.prod.html

# Stage 2: Production
FROM nginx:alpine

# Copy static files
COPY favicon.svg /usr/share/nginx/html/
COPY world.json /usr/share/nginx/html/
COPY countries.json /usr/share/nginx/html/

# Copy bundled JavaScript, hashed CSS, and updated HTML from builder
COPY --from=builder /app/dist/*.js /usr/share/nginx/html/
COPY --from=builder /app/dist/css/ /usr/share/nginx/html/css/
COPY --from=builder /app/index.prod.html /usr/share/nginx/html/index.html

# Custom nginx config
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Root and HTML files: no cache, always revalidate \
    location = / { \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
        add_header Pragma "no-cache"; \
        add_header Expires "0"; \
        try_files /index.html =404; \
    } \
    \
    location ~* \.html$ { \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
        add_header Pragma "no-cache"; \
        add_header Expires "0"; \
    } \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache static assets with hash in filename forever \
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
