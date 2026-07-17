/**
 * AppShell — ATUL-1 Application Shell
 *
 * Client component that manages the loading screen state and
 * wraps children with the navigation console and NOVA assistant.
 */

'use client';

import React from 'react';
import { useMissionStore } from '@/store/useMissionStore';
import NavigationConsole from '@/components/layout/NavigationConsole';
import LoadingScreen from '@/components/layout/LoadingScreen';
import NovaAssistant from '@/components/ai/NovaAssistant';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { isLoading } = useMissionStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

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