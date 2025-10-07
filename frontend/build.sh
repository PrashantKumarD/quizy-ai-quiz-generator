
#!/bin/bash

# Install npm packages
npm install

# Make sure the public directory is properly copied
echo "Copying public assets to dist..."
mkdir -p dist
cp -r public/* dist/

# Exit with success status
exit 0