#!/bin/bash
# ATUL-1 Asset Download Script
# Downloads free 3D models and textures for the cinematic experience

echo "🚀 Starting ATUL-1 Asset Downloads..."
echo ""

# Create directories
mkdir -p public/models/spaceship
mkdir -p public/models/robots
mkdir -p public/models/drones
mkdir -p public/textures/planets
mkdir -p public/textures/nebula
mkdir -p public/hdr
mkdir -p public/audio

echo "📁 Directories created"
echo ""
echo "📥 MANUAL DOWNLOAD REQUIRED:"
echo ""
echo "1. SPACESHIP MODEL:"
echo "   Visit: https://sketchfab.com"
echo "   Search: 'spaceship'"
echo "   Filter: Downloadable + Creative Commons"
echo "   Download GLB format"
echo "   Save to: public/models/spaceship/ship.glb"
echo ""
echo "2. ROBOT/DRONE MODELS:"
echo "   Visit: https://sketchfab.com"
echo "   Search: 'drone' or 'robot'"
echo "   Download GLB format"
echo "   Save to: public/models/robots/drone.glb"
echo ""
echo "3. TEXTURES:"
echo "   Visit: https://polyhaven.com/textures"
echo "   Download: Earth, Mars, Moon textures"
echo "   Save to: public/textures/planets/"
echo ""
echo "4. HDR ENVIRONMENTS:"
echo "   Visit: https://polyhaven.com/hdris"
echo "   Download: Space, Nebula HDRIs"
echo "   Save to: public/hdr/"
echo ""
echo "5. AUDIO:"
echo "   Visit: https://pixabay.com/sound-effects/"
echo "   Search: 'space ambient', 'engine', 'ui hover'"
echo "   Save to: public/audio/"
echo ""
echo "✅ After downloading, run: npm run dev"
echo ""