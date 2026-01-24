#!/bin/sh

# Docker entrypoint script
# Injects environment variables into config.json at runtime

CONFIG_FILE="/usr/share/nginx/html/config.json"

# Create config.json from environment variables
cat > "$CONFIG_FILE" << EOF
{
    "parentSiteName": "${PARENT_SITE_NAME:-}",
    "parentSiteUrl": "${PARENT_SITE_URL:-}",
    "parentSiteLogo": "${PARENT_SITE_LOGO:-}"
}
EOF

echo "Config written to $CONFIG_FILE:"
cat "$CONFIG_FILE"

# Start nginx
exec nginx -g 'daemon off;'
