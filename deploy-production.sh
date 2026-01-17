#!/bin/bash

# Deploy firstcontact to Synology NAS
# Usage: ./deploy-production.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load environment variables
if [ -f "$SCRIPT_DIR/.env.production" ]; then
  export $(grep -v '^#' "$SCRIPT_DIR/.env.production" | xargs)
else
  echo "ERROR: .env.production not found"
  echo "Copy .env.production.example to .env.production and configure it"
  exit 1
fi

echo "=========================================="
echo "Deploying $CONTAINER_NAME to Synology"
echo "=========================================="

# Check if remote directory exists, if not clone the repo
echo ""
echo "[1/5] Checking remote directory..."
if ssh $SYNOLOGY_HOST "[ -d $REMOTE_DIR ]"; then
  echo "Directory exists, pulling latest changes..."
  ssh $SYNOLOGY_HOST "cd $REMOTE_DIR && git pull"
else
  echo "Directory does not exist, cloning repository..."
  ssh $SYNOLOGY_HOST "git clone https://github.com/achildrenmile/firstcontact.git $REMOTE_DIR"
fi

# Install npm dependencies for build
echo ""
echo "[2/5] Installing build dependencies..."
ssh $SYNOLOGY_HOST "cd $REMOTE_DIR && npm install"

# Build Docker image
echo ""
echo "[3/5] Building Docker image..."
ssh $SYNOLOGY_HOST "/usr/local/bin/docker build -t $IMAGE_NAME $REMOTE_DIR"

# Stop and remove old container
echo ""
echo "[4/5] Restarting container..."
ssh $SYNOLOGY_HOST "/usr/local/bin/docker stop $CONTAINER_NAME 2>/dev/null || true"
ssh $SYNOLOGY_HOST "/usr/local/bin/docker rm $CONTAINER_NAME 2>/dev/null || true"

# Start new container
ssh $SYNOLOGY_HOST "/usr/local/bin/docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p $CONTAINER_PORT \
  --health-cmd='wget -q -O /dev/null http://localhost:80/ || exit 1' \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  --health-start-period=10s \
  $IMAGE_NAME"

# Verify
echo ""
echo "[5/5] Verifying deployment..."
sleep 5

# First check local port
LOCAL_CHECK=$(ssh $SYNOLOGY_HOST "curl -s -o /dev/null -w '%{http_code}' --max-time 5 http://localhost:3401/" 2>/dev/null || echo "000")
echo "Local check (port 3401): HTTP $LOCAL_CHECK"

# Then check public URL
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SITE_URL" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
  echo ""
  echo "=========================================="
  echo "Deployment successful!"
  echo "$SITE_URL is responding (HTTP $HTTP_CODE)"
  echo "=========================================="
else
  echo ""
  echo "Local container check: HTTP $LOCAL_CHECK"
  echo "Public URL check: HTTP $HTTP_CODE"
  echo ""
  if [ "$LOCAL_CHECK" = "200" ]; then
    echo "Container is running. Cloudflare tunnel may need configuration."
    echo "Add route for firstcontact.oeradio.at -> http://localhost:3401"
  else
    echo "WARNING: Container may not be healthy"
    echo "Check logs: ssh $SYNOLOGY_HOST '/usr/local/bin/docker logs $CONTAINER_NAME'"
  fi
fi
