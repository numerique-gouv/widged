'use client';

import { Loader } from '@openfun/cunningham-react';
import { useEffect } from 'react';

import { Auth, useAuth } from '@/core/auth/Auth';

import './page.scss';

export default function Home() {
  return (
    <Auth>
      <Nested />
    </Auth>
  );
}

const Nested = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    const bc = new BroadcastChannel('APP_CHANNEL');
    bc.postMessage({ type: 'AUTHENTICATED' });

    /**
     * This means the parent window has authenticated has successfully refetched user, then we can close the popup.
     */
    bc.onmessage = (event) => {
      console.log('message', event.data);
      if (event.data.type === 'AUTHENTICATED_ACK') {
        console.log('CLOSE WINDOW');
        window.close();
      }
    };
  }, [user]);

  return (
    <div>
      <Loader />
    </div>
  );
};
