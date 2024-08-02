import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Modal } from '@/Modal';
import { ConfigType, File } from '@/Types';

export interface FileExplorerProps {
  onSelection: (files: File[]) => void;
  config: ConfigType;
}

const Iframe = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export enum ClientMessageType {
  SELECTION = 'SELECTION',
}

export const FileExplorer = ({ onSelection, config }: FileExplorerProps) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [modalOpened, setModalOpened] = useState(true);

  /**
   * SDK
   */

  /**
   * TODO: maybe make a specific client.
   */
  useEffect(() => {
    window.onmessage = (event) => {
      // TODO: Verify origin.
      // console.log('Message received window', event.data, event.origin);
      // if (event.origin !== ORIGIN) {
      //     console.error('Origin not allowed', event.origin);
      //     return;
      // }
      if (event.data.type === ClientMessageType.SELECTION) {
        const data = event.data.data;
        const files = data.files as File[];
        onSelection(files);
        setModalOpened(false);
      }
    };
  }, []);

  return (
    <Modal opened={modalOpened} onClose={() => setModalOpened(false)}>
      <Iframe
        ref={iframe}
        title="Exploreur de fichiers Resana"
        src={config.explorerUrl}
      />
    </Modal>
  );
};
