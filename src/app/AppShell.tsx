/**
 * AppShell — ATUL-1 Application Shell
 *
 * Client component that manages the loading screen and opening cinematic,
 * then wraps children with navigation console and NOVA assistant.
 */

'use client';

import React, { useState } from 'react';
import { useMissionStore } from '@/store/useMissionStore';
import NavigationConsole from '@/components/layout/NavigationConsole';
import LoadingScreen from '@/components/layout/LoadingScreen';
import OpeningSequence from '@/components/story/OpeningSequence';
import NovaAssistant from '@/components/ai/NovaAssistant';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { isLoading, showOpeningSequence, completeOpeningSequence } = useMissionStore();
  const [showOpening, setShowOpening] = useState(false);

  React.useEffect(() => {
    if (!isLoading && showOpeningSequence && !showOpening) {
      setShowOpening(true);
    }
  }, [isLoading, showOpeningSequence, showOpening]);

  const handleOpeningComplete = () => {
    setShowOpening(false);
    completeOpeningSequence();
  };

  // Loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Opening cinematic
  if (showOpening) {
    return <OpeningSequence onComplete={handleOpeningComplete} />;
  }

  // Main app
  return (
    <>
      <NavigationConsole />
      <main id="main-content" role="main">
        {children}
      </main>
      <NovaAssistant />
    </>
  );
}