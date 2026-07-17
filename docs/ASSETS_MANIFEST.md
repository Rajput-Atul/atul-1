# ATUL-1 Asset Manifest

## Free Asset Sources

### 3D Models (GLB/GLTF)
- **Spaceship**: Sketchfab (CC license), Poly Pizza, Kenney Assets
- **Planets**: Procedural generation preferred (SphereGeometry + textures)
- **Robots/Drones**: Sketchfab, Poly Pizza, Quaternius
- **Asteroids**: Generate procedurally or download 1-2 models, reuse with scaling/rotation
- **Satellites**: Download 1 model, reuse with different transforms

### Textures
- **Planet textures**: Poly Haven (free PBR), AmbientCG
- **Nebula**: Poly Haven HDRIs, procedural noise shaders
- **HDRI**: Poly Haven (free HDRIs for environment lighting)

### Generated in Code (No downloads needed)
- **Stars**: THREE.Points + BufferGeometry (millions of stars)
- **Particles**: Custom shader materials
- **Holograms**: Transparent planes + custom shaders + additive blending
- **Lights**: Three.js built-in lights (Ambient, Directional, Point, Spot)
- **Galaxy**: Mathematical generation (spiral galaxy algorithm)
- **Energy waves**: GLSL shaders + noise
- **Engine flames**: Particle systems + shader materials

### Audio (Free)
- **Pixabay**: https://pixabay.com/sound-effects/
- **Mixkit**: https://mixkit.co/free-sound-effects/
- **Freesound**: https://freesound.org/ (check licenses)
- **OpenGameArt**: https://opengameart.org/

**Needed sounds:**
- Ambient space hum
- Engine idle
- UI hover/click
- Hologram activation
- Reactor pulse
- Door open/close
- Alert/notification

### Icons
- **Lucide React** (already installed)
- **Heroicons**
- **Tabler Icons**

### Fonts (Google Fonts - already set up)
- Orbitron (headings)
- Inter (body)
- JetBrains Mono (code)
- Space Grotesk (numbers)

## Folder Structure

```
public/
├── models/
│   ├── spaceship/
│   ├── robots/
│   ├── drones/
│   ├── asteroids/
│   └── satellites/
├── textures/
│   ├── planets/
│   ├── nebula/
│   └── environment/
├── hdr/
├── audio/
│   ├── ambient/
│   ├── ui/
│   ├── engine/
│   └── hologram/
└── images/
    ├── og-image.jpg
    └── favicon.ico
```

## Installation & Creation Plan

### Step 1: Download Free Models
- Visit Sketchfab, filter by "Downloadable" + "Creative Commons"
- Download spaceship model → `public/models/spaceship/`
- Download robot/drone models → `public/models/robots/`
- Keep models under 5MB each (optimize with Draco compression)

### Step 2: Download Textures
- Visit Poly Haven → download planet textures (Earth, Mars, etc.)
- Download nebula HDRIs → `public/hdr/`
- Download PBR textures → `public/textures/`

### Step 3: Download Audio
- Visit Pixabay/Mixkit → download free sound effects
- Place in `public/audio/` with descriptive names

### Step 4: Create Procedural Systems
- Stars generator (Three.js Points)
- Particle system (custom shader)
- Planet generator (Sphere + texture + atmosphere shader)
- Galaxy generator (mathematical spiral)

### Step 5: Optimize
- Compress models with Draco
- Compress textures (KTX2/Basis)
- Lazy load all assets
- Implement LOD for models