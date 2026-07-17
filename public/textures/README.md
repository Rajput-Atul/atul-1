# Textures Directory

## Required Textures

Download free textures from these sources:

### Planet Textures
- Source: Poly Haven (https://polyhaven.com/textures), AmbientCG
- Format: JPG/PNG, 4K or 2K
- Place in: `public/textures/planets/`

### Nebula Textures
- Source: Poly Haven HDRIs, procedural generation
- Format: EXR/HDR for HDRI, PNG for projected nebula
- Place in: `public/textures/nebula/`

### Environment Maps
- Source: Poly Haven HDRIs
- Format: HDR/EXR
- Place in: `public/hdr/`

## Naming Convention
- `earth_day.jpg`, `earth_night.jpg`
- `mars_day.jpg`
- `moon.jpg`
- `nebula_01.hdr`
- `space.hdr`

## Optimization
- Compress to KTX2/Basis
- Use power-of-2 sizes (1024, 2048, 4096)
- Generate mipmaps