/**
 * CinematicEffects — Post-Processing Pipeline
 *
 * Adds bloom, chromatic aberration, and film grain
 * to make the opening sequence feel like a real sci-fi movie.
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

interface CinematicEffectsProps {
  bloomIntensity?: number;
  chromaticAberration?: number;
  noiseIntensity?: number;
}

export default function CinematicEffects({
  bloomIntensity = 1.5,
  chromaticAberration = 0.3,
  noiseIntensity = 0.4,
}: CinematicEffectsProps) {
  const { size } = useThree();
  const chromaticRef = useRef<any>(null);

  // Animate chromatic aberration based on scene intensity
  useFrame((state, delta) => {
    if (chromaticRef.current) {
      const time = state.clock.elapsedTime;
      // Subtle pulse
      const intensity = chromaticAberration + Math.sin(time * 0.5) * 0.05;
      chromaticRef.current.offset = [intensity, intensity];
    }
  });

  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.ADD}
      />
      <ChromaticAberration
        ref={chromaticRef}
        offset={[chromaticAberration, chromaticAberration]}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise
        opacity={noiseIntensity}
        blendFunction={BlendFunction.OVERLAY}
      />
    </EffectComposer>
  );
}