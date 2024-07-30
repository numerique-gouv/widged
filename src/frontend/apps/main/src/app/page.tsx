'use client';

import './page.scss';

import { Auth, useAuth } from '@/core/auth/Auth';

import { useEffect } from 'react';

/**
 * TODO: Use API Key.
 */
const getAllowTargetOrigin = () => {
  return 'http://localhost:3010/consumer/';
};

const post = (type: string, data: any) => {
  (window.opener as Window).postMessage(
    {
      type,
      data,
    },
    getAllowTargetOrigin(),
  );
};

export default function Home() {
  return (
    <Auth redirect={true}>
      <Nested />
    </Auth>
  );
}

const Nested = () => {
  const files = ['compte-rendu.pdf', 'schema-api.pdf'];
  const { user } = useAuth();

  console.log('window.opener', window.opener);

  // if (!window.opener) {
  //   return <div>This widget must be opened in a popup</div>;
  // }

  // Only enable for iframe mode POC.
  useEffect(() => {
    // if (user) {
    //   console.log('CLOSE');
    //   window.close();
    // }

    const bc = new BroadcastChannel('APP_CHANNEL');
    bc.postMessage({ type: 'AUTHENTICATED' });

    bc.onmessage = (event) => {
      if (event.data.type === 'AUTHENTICATED_ACK') {
        /**
         * This means the parent has authenticated has successfully refetched user via /me.
         */
        window.close();
      }
    };
  }, [user]);

  const choose = (file: string) => {
    post('FILE_SELECTED', { file: { name: file } });
  };

  return (
    <Auth redirect={true}>
      <div className="container container--center">
        <p>Hello {user?.email}</p>
        <ul>
          {files.map((file) => (
            <li key={file}>
              <button onClick={() => choose(file)}>Choose {file}</button>
            </li>
          ))}
        </ul>
      </div>
    </Auth>
  );
};
