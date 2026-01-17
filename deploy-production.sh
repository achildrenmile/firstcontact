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

# Step 1: Pull latest changes on Synology
echo ""
echo "[1/3] Pulling latest changes..."
if ssh $SYNOLOGY_HOST "[ -d $REMOTE_DIR ]"; then
  ssh $SYNOLOGY_HOST "cd $REMOTE_DIR && git pull"
else
  echo "Directory does not exist, cloning repository..."
  ssh $SYNOLOGY_HOST "git clone https://github.com/achildrenmile/firstcontact.git $REMOTE_DIR"
fi

# Step 2: Build Docker image on Synology (bundling happens inside Docker)
echo ""
echo "[2/3] Building Docker image (bundling JS with hash filename)..."
ssh $SYNOLOGY_HOST "/usr/local/bin/docker build -t $IMAGE_NAME $REMOTE_DIR"

# Step 3: Restart container
echo ""
echo "[3/3] Restarting container..."
ssh $SYNOLOGY_HOST "/usr/local/bin/docker stop $CONTAINER_NAME 2>/dev/null || true"
ssh $SYNOLOGY_HOST "/usr/local/bin/docker rm $CONTAINER_NAME 2>/dev/null || true"

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
echo "[Verify] Checking deployment..."
sleep 3

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SITE_URL" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
  echo ""
  echo "=========================================="
  echo "Deployment successful!"
  echo "$SITE_URL is responding (HTTP $HTTP_CODE)"
  echo "=========================================="
else
  # Check local port
  LOCAL_CHECK=$(ssh $SYNOLOGY_HOST "curl -s -o /dev/null -w '%{http_code}' --max-time 5 http://localhost:3401/" 2>/dev/null || echo "000")
  echo ""
  echo "Local container check: HTTP $LOCAL_CHECK"
  echo "Public URL check: HTTP $HTTP_CODE"
  if [ "$LOCAL_CHECK" = "200" ]; then
    echo "Container is running. Cloudflare tunnel may need configuration."
  else
    echo "WARNING: Container may not be healthy"
    echo "Check logs: ssh $SYNOLOGY_HOST '/usr/local/bin/docker logs $CONTAINER_NAME'"
  fi
fi
