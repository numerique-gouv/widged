"use client"
import { useEffect, useRef, useState } from 'react';

/**
 * Multi pop up strategy 3.
 *
 * - Only display iframe from here.
 * - The iframe handle the popup opening itself.
 */


const ENDPOINT = 'http://localhost:3000/iframe-3';
const LOGIN = 'http://localhost:3000';

export default function Page() {


    const [widget, setWidget] = useState(false);
    const [file, setFile] = useState();
    // const [readyToChooseFile, setReadyToChooseFile] = useState(false);
    const iframe = useRef<HTMLIFrameElement>();

    useEffect(() => {
        window.onmessage = (event) => {
            // console.log('Message received window', event.data, event.origin);
            // if (event.origin !== ORIGIN) {
            //     console.error('Origin not allowed', event.origin);
            //     return;
            // }
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
        <button onClick={open}>Import un fichier depuis Resana v3</button>
        {widget && (
            <div>
                {/*{readyToChooseFile ? <p>Prêt à selectionner.</p> : <p>Pas prêt: login en cours</p>}*/}
                {file && <div>
                  Vous avez selectionné le fichier "{file.name}"
                </div>}
                <iframe ref={iframe} src={ENDPOINT} width={800} height={800}></iframe>
            </div>
        )}

    </div>
}
