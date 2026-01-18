#!/bin/bash

# Release Script for First Contact
# Usage: ./scripts/release.sh <version>
# Example: ./scripts/release.sh 0.2.0

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 0.2.0"
    echo ""
    echo "Current version: $(cat VERSION)"
    exit 1
fi

NEW_VERSION="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$ROOT_DIR"

echo "=========================================="
echo "Creating release v${NEW_VERSION}"
echo "=========================================="

# Step 1: Update VERSION file
echo ""
echo "[1/6] Updating VERSION file..."
echo "$NEW_VERSION" > VERSION
echo "   VERSION set to: $NEW_VERSION"

# Step 2: Update package.json
echo ""
echo "[2/6] Updating package.json..."
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$NEW_VERSION\"/" package.json
echo "   package.json updated"

# Step 3: Build
echo ""
echo "[3/6] Building..."
npm run build

# Step 4: Commit changes
echo ""
echo "[4/6] Committing changes..."
git add VERSION package.json package-lock.json
git commit -m "Release v${NEW_VERSION}"

# Step 5: Create tag
echo ""
echo "[5/6] Creating git tag..."
git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}"

# Step 6: Push
echo ""
echo "[6/6] Pushing to remote..."
git push origin main
git push origin "v${NEW_VERSION}"

echo ""
echo "=========================================="
echo "Release v${NEW_VERSION} created!"
echo ""
echo "To create GitHub release, run:"
echo "  gh release create v${NEW_VERSION} --title \"v${NEW_VERSION}\" --notes-file CHANGELOG.md"
echo ""
echo "Or with auto-generated notes:"
echo "  gh release create v${NEW_VERSION} --generate-notes"
echo "=========================================="
