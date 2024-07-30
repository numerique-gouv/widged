"use client"
import { useEffect, useRef, useState } from 'react';

/**
 * Multi pop up strategy.
 */


const ENDPOINT = 'http://localhost:3000/iframe';
const LOGIN = 'http://localhost:3000';

export default function Page() {


    const [widget, setWidget] = useState(false);
    const [file, setFile] = useState();
    const [readyToChooseFile, setReadyToChooseFile] = useState(false);
    const iframe = useRef<HTMLIFrameElement>();

    useEffect(() => {
        window.onmessage = (event) => {
            // console.log('Message received window', event.data, event.origin);
            // if (event.origin !== ORIGIN) {
            //     console.error('Origin not allowed', event.origin);
            //     return;
            // }
            if (event.data.type === 'NOT_AUTHENTICATED') {


                return;
                /**
                 * If the iframe sends NOT_AUTHENTICATED then open the SSO login page and reload the
                 * iframe until the user is authenticated, we check that via AUTHENTICATED message.
                 */
                let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=400,height=900,left=100,top=100`;
                window.open(LOGIN, '', params);

                const interval = setTimeout(() => {
                    console.log('Checking user', iframe.current);
                    const ref = iframe.current;
                    if (ref) {
                        // Reload iframe.
                        ref.src += ""
                    }
                }, 1000);

                console.log(interval);
            }
            if (event.data.type === 'AUTHENTICATED') {
                console.log('PARENT', 'authenticated');
                setReadyToChooseFile(true);
            }
            if (event.data.type === 'FILE_SELECTED') {
                const data = event.data.data;
                console.log('File selected', data.file);
                setFile(data.file)
            }
        }
    }, []);


    const open = () => {
        setWidget(true);
    };

    return <div>
        <button onClick={open}>Import un fichier depuis Resana</button>
        {widget && (
            <div>
                {readyToChooseFile ? <p>Prêt à selectionner.</p> : <p>Pas prêt: login en cours</p>}
                {file && <div>
                  Vous avez selectionné le fichier "{file.name}"
                </div>}
                <iframe ref={iframe} src={ENDPOINT} width={800} height={800} style={{
                    display: readyToChooseFile ? 'block' : 'none'
                }}></iframe>
            </div>
        )}

    </div>
}
