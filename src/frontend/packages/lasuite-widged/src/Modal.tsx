import { PropsWithChildren } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #0c1a2b99;
  //opacity: 0;
  //animation: backdrop-fade-in 0.2s ease-out forwards;
`;

const Content = styled.div`
  box-sizing: border-box;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1200px;
  max-height: calc(100% - 2em - 6px);
`;

interface ModalProps extends PropsWithChildren {
  opened: boolean;
  onClose: () => void;
}

export const Modal = ({ children, opened, onClose }: ModalProps) => {
  if (!opened) {
    return null;
  }

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={opened}
      onRequestClose={() => onClose()}
      style={{
        overlay: {
          backgroundColor: '#0c1a2b99',
        },
        content: {
          left: '50%',
          transform: 'translate(-50%, 0)',
          width: '1200px',
          padding: '0',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};
