'use client';

import React from 'react';

import { ExplorerContent } from '@/components/Explorer/ExplorerContent';

export default function Page({ params }: { params: { id: string } }) {
  return <ExplorerContent targetUuid={params.id} />;
}
