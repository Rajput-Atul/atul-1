/**
 * CinematicEffects — Post-Processing Pipeline
 *
 * Adds bloom to make the opening sequence feel cinematic.
 * Simplified to avoid circular serialization issues with @react-three/postprocessing.
 */

'use client';

import React from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

interface CinematicEffectsProps {
  bloomIntensity?: number;
}

export default function CinematicEffects({ bloomIntensity = 1.2 }: CinematicEffectsProps) {
  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.ADD}
      />
    </EffectComposer>
  );
}