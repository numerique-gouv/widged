'use client';

import { useSearchParams } from 'next/navigation';

export default function Search() {
  const params = useSearchParams();
  const terms = params.get('terms');
  return <div>Searching: {terms}</div>;
}
