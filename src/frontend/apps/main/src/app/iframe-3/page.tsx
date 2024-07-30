'use client';

import { useEffect } from 'react';

import { Auth, useAuth } from '@/core/auth/Auth';
import { baseApiUrl } from '@/core/conf';

/**
 * TODO: Use API Key.
 */
const getAllowTargetOrigin = () => {
  return 'http://localhost:3010/consumer/';
};

const post = (type: string, data: any) => {
  window.parent.postMessage(
    {
      type,
      data,
    },
    getAllowTargetOrigin(),
  );
};

export default function Home() {
  return (
    <Auth>
      <Nested />
    </Auth>
  );
}

const Nested = () => {
  const files = ['compte-rendu.pdf', 'schema-api.pdf'];
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

  const choose = (file: string) => {
    post('FILE_SELECTED', { file: { name: file } });
  };

  return (
    <div className="container container--center">
      {!user && (
        <div>
          <p>Not authenticated</p>
          <button onClick={startSSO}>Please log in</button>
        </div>
      )}
      {user && (
        <>
          <p>Hello {user?.email}</p>
          <ul>
            {files.map((file) => (
              <li key={file}>
                <button onClick={() => choose(file)}>Choose {file}</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
