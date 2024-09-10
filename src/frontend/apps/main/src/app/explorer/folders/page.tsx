'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

import { ExplorerContent } from '@/components/Explorer/ExplorerContent';

export default function Page() {
  const r = useSearchParams();
  const uuid = r.get('uuid') as string;
  return <ExplorerContent targetUuid={uuid} key={uuid} />;
}
