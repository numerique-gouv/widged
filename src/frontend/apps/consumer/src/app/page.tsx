"use client"
import { useEffect, useRef, useState } from 'react';


/**
 * Popup strategy.
 */

const ENDPOINT = 'http://localhost:3000';

export default function Home() {

    const [file, setFile] = useState();

    const open = () => {
        let win: Window;

        window.onmessage = (event) => {
            console.log('Message received window', event.data, event.origin);
            if (event.origin !== ENDPOINT) {
                console.error('Origin not allowed', event.origin);
                return;
            }
            if (event.data.type === 'FILE_SELECTED') {
                const data = event.data.data;
                console.log('File selected', data.file);
                setFile(data.file)
                win.close()
            }
        }

        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=1200,height=900,left=100,top=100`;
        win = window.open(ENDPOINT, '', params);
        if (!win) {
            alert('Please allow popups for this website');
            return;
        }
    };

    return (
      <main>
          <button onClick={open}>Import un fichier depuis Resana</button>
          {file && <div>
              Vous avez selectionné le fichier "{file.name}"
          </div>}
      </main>
    );
}
