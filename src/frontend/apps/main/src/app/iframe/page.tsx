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
  const { user } = useAuth();
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.location.replace('https://bitly.cx/8mwyY');
  //   }, 3000);
  // }, []);

  // if (!window.opener) {
  //   return <div>This widget must be opened in a popup</div>;
  // }

  useEffect(() => {
    console.log('CHILD', user);
    if (user === null) {
      post('NOT_AUTHENTICATED', {});
    } else if (user) {
      post('AUTHENTICATED', {});
    }
  }, [user]);

  const choose = (file: string) => {
    post('FILE_SELECTED', { file: { name: file } });
  };
  return (
    <div className="container container--center">
      {!user && <p>Not authenticated</p>}
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
