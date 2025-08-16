#!/bin/bash

# SEO Setup Script for Feedbacker.io
echo "🚀 Setting up SEO for Feedbacker.io..."

# Create public directory if it doesn't exist
mkdir -p public

# Check if favicon exists
if [ ! -f "public/favicon.ico" ]; then
    echo "⚠️  Please add favicon.ico to your public folder"
    echo "   You can generate one at: https://favicon.io/"
fi

# Check if required images exist
REQUIRED_IMAGES=(
    "public/icon-16.png"
    "public/icon-32.png" 
    "public/icon-192.png"
    "public/icon-512.png"
    "public/apple-icon-180.png"
    "public/og-image.png"
    "public/logo.png"
)

echo "📸 Checking for required images..."
for image in "${REQUIRED_IMAGES[@]}"; do
    if [ ! -f "$image" ]; then
        echo "❌ Missing: $image"
    else
        echo "✅ Found: $image"
    fi
done

# Check environment variables
echo ""
echo "🔧 Environment Variables Setup:"
if [ ! -f ".env.local" ]; then
    echo "⚠️  No .env.local found. Copy .env.example to .env.local and configure:"
    echo "   - NEXT_PUBLIC_BASE_URL"
    echo "   - NEXT_PUBLIC_GA_ID (for Google Analytics)"
    echo "   - NEXT_PUBLIC_CLARITY_ID (for Microsoft Clarity)"
    echo "   - Search engine verification codes"
else
    echo "✅ .env.local exists - make sure to configure SEO variables"
fi

echo ""
echo "🎯 SEO Implementation Complete!"
echo ""
echo "Next steps:"
echo "1. Add missing images to public/ folder"
echo "2. Configure environment variables in .env.local"
echo "3. Run 'npm run build' to test sitemap generation"
echo "4. Submit sitemap to Google Search Console: yoursite.com/sitemap.xml"
echo "5. Verify your site with search engines using provided verification codes"
echo ""
echo "🔍 Test your SEO:"
echo "- Sitemap: http://localhost:3000/sitemap.xml"
echo "- Robots: http://localhost:3000/robots.txt"
echo "- Manifest: http://localhost:3000/manifest.json"
echo ""
echo "📊 Use these tools to validate:"
echo "- Google PageSpeed Insights"
echo "- Rich Results Test (Google)"
echo "- Open Graph Debugger (Facebook)"
echo "- Twitter Card Validator"
