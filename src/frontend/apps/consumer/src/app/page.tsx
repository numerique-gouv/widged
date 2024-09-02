'use client';

import { File, WidgedClient } from 'lasuite-widged';
import { useEffect, useState } from 'react';

export default function Page() {
  const [widget, setWidget] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const open = () => {
    setWidget(true);
    const client = new WidgedClient();
    client.pickFile({
      maxFiles: 3,
      onSelection: (files: File[]) => {
        console.log('Selection', files);
        setFiles(files);
      },
    });
  };

  useEffect(() => {
    open();
  }, []);

  return (
    <div>
      <button onClick={open}>Import un fichier depuis Resana v3</button>
      {widget && (
        <div>
          {files.length > 0 && (
            <div>
              Vous avez selectionné les fichiers:{' '}
              <ul>
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
