/**
 * ATUL-1 Asset Loading Utilities
 *
 * Centralized asset loading for 3D models, textures, audio, and HDRIs.
 * All free/open-source assets only.
 */

import { useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { RGBELoader } from 'three-stdlib';
import * as THREE from 'three';

// =====================================================
// Model Loading
// =====================================================

export function useModel(path: string) {
  return useGLTF(path);
}

// Preload models for better performance
export function preloadModel(path: string) {
  useGLTF.preload(path);
}

// =====================================================
// Texture Loading
// =====================================================

export function usePlanetTexture(path: string) {
  return useTexture(path, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
  });
}

export function useHDRTexture(path: string) {
  return useTexture(path, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.LinearSRGBColorSpace;
  });
}

// =====================================================
// Audio Loading
// =====================================================

export function useAudio(src: string): HTMLAudioElement | null {
  return useMemo(() => {
    if (typeof window === 'undefined') return null;
    const audio = new Audio(src);
    audio.preload = 'auto';
    return audio;
  }, [src]);
}

// =====================================================
// Procedural Asset Generators
// =====================================================

/**
 * Generate procedural starfield
 * Creates millions of stars with excellent performance
 */
export function createStarfield(count: number = 10000, radius: number = 1000): THREE.Points {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = radius * (0.5 + Math.random() * 0.5);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);

    const colorChoice = Math.random();
    if (colorChoice < 0.7) {
      colors[i3] = 1; colors[i3 + 1] = 1; colors[i3 + 2] = 1;
    } else if (colorChoice < 0.85) {
      colors[i3] = 0.7; colors[i3 + 1] = 0.8; colors[i3 + 2] = 1;
    } else {
      colors[i3] = 1; colors[i3 + 1] = 0.95; colors[i3 + 2] = 0.8;
    }

    sizes[i] = Math.random() * 2 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 1.5,
    sizeAttenuation: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.8,
  });

  return new THREE.Points(geometry, material);
}

/**
 * Generate procedural nebula
 * Uses noise-based texture generation
 */
export function createNebula(
  size: number = 512,
  colors: [number, number, number][] = [
    [0.2, 0.4, 0.8],
    [0.6, 0.2, 0.8],
    [0.1, 0.3, 0.6],
  ]
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  for (let i = 0; i < 50; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 100 + 50;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(${color[0]*255}, ${color[1]*255}, ${color[2]*255}, 0.15)`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// =====================================================
// Asset Path Constants
// =====================================================

export const ASSET_PATHS = {
  models: {
    spaceship: '/models/spaceship/ship.glb',
    robot: '/models/robots/robot.glb',
    drone: '/models/robots/drone.glb',
    asteroid: '/models/asteroids/asteroid.glb',
    satellite: '/models/satellites/satellite.glb',
  },
  textures: {
    earth: '/textures/planets/earth.jpg',
    mars: '/textures/planets/mars.jpg',
    moon: '/textures/planets/moon.jpg',
    nebula: '/textures/nebula/nebula_01.png',
  },
  hdr: {
    space: '/hdr/space_01.hdr',
    nebula: '/hdr/nebula_01.hdr',
    dock: '/hdr/dock_01.hdr',
  },
  audio: {
    spaceAmbient: '/audio/ambient/space_ambient.mp3',
    engineIdle: '/audio/engine/engine_idle.mp3',
    uiHover: '/audio/ui/hover.mp3',
    uiClick: '/audio/ui/click.mp3',
    hologramActivate: '/audio/hologram/hologram_activate.mp3',
    doorOpen: '/audio/doors/door_open.mp3',
    doorClose: '/audio/doors/door_close.mp3',
  },
} as const;