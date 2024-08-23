'use client';

import { IconContext } from '@phosphor-icons/react';
import { createContext, useEffect } from 'react';

import { WidgedReverseClient } from '@/app/explorer/WidgedReverseClient';
import { Explorer } from '@/components/Explorer/Explorer';
import { Auth, useAuth } from '@/core/auth/Auth';
import { baseApiUrl } from '@/core/conf';

export default function Home() {
  return (
    <Auth>
      <Nested />
    </Auth>
  );
}

const client = new WidgedReverseClient();

interface AppContextType {
  client: WidgedReverseClient;
}

export const AppContext = createContext<AppContextType>({
  client,
});

const Nested = () => {
  const { user, init } = useAuth();

  const startSSO = () => {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=400,height=900,left=100,top=100`;
    window.open(new URL('authenticate/', baseApiUrl()).href, '', params);
  };

  /**
   * Listen to the broadcast channel. When the window opened via startSSO will be redirected to the success page,
   * it will broadcast an AUTHENTICATED message which this function will use to re-fetch the user.
   * Once this is done we will broadcast an AUTHENTICATED_ACK message to the opened window which will be waiting
   * for it to close itself.
   */
  const setupBroadcastChannel = () => {
    const bc = new BroadcastChannel('APP_CHANNEL');
    bc.onmessage = async (event) => {
      if (event.data.type === 'AUTHENTICATED') {
        const user = await init?.();
        bc.postMessage({ type: 'AUTHENTICATED_ACK' });
      }
    };
  };

  useEffect(() => {
    setupBroadcastChannel();
  }, []);

  return (
    <IconContext.Provider
      value={{
        size: 24,
        weight: 'fill',
      }}
    >
      <AppContext.Provider value={{ client }}>
        {!user && (
          <div>
            <p>Not authenticated</p>
            <button onClick={startSSO}>Please log in</button>
          </div>
        )}
        {user && (
          <>
            <Explorer />
          </>
        )}
      </AppContext.Provider>
    </IconContext.Provider>
  );
};
