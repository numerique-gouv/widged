'use client';
import { PropsWithChildren } from 'react';

import { AppProvider } from '@/core/AppProvider';

export default function SubLayout({ children }: PropsWithChildren) {
  return (
    <AppProvider>
      <div className="suite__app">
        <main>{children}</main>
      </div>
    </AppProvider>
  );
}
