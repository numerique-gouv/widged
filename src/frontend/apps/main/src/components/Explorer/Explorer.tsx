import { usePathname } from 'next/navigation';
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  Crumb,
  ExplorerBreadcrumbs,
} from '@/components/Explorer/ExplorerBreadcrumbs';
import { ExplorerFooter } from '@/components/Explorer/ExplorerFooter';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { File } from '@/types/data';

import './Explorer.scss';

interface ExplorerContextInterface {
  crumbs: Crumb[];
  setCrumbs: (crumbs: Crumb[]) => void;
  selectedFiles: File[];
  selectFile: (file: File) => void;
  unselectFile: (file: File) => void;
  props: ExplorerProps;
}

const ExplorerContext = React.createContext<ExplorerContextInterface>(
  {} as ExplorerContextInterface,
);

export const useExplorerContext = () => useContext(ExplorerContext);

export interface ExplorerProps extends PropsWithChildren {
  maxFiles?: number;
}

export const Explorer = (props: ExplorerProps) => {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);
  const pathname = usePathname();

  // On page change.
  useEffect(() => {
    /**
     * We only reset the folder ancestors when navigating to the root of the explorer. When navigating between
     * folders, we keep the ancestors to avoid the "blinking" effect of the breadcrumbs.
     */
    if (pathname === '/explorer/') {
      setCrumbs([]);
    }
  }, [pathname]);

  const context: ExplorerContextInterface = {
    crumbs,
    setCrumbs: (crumbs) => {
      setCrumbs(crumbs);
    },
    selectedFiles,
    selectFile: (file) => {
      setSelectedFiles((value) => [...value, file]);
    },
    unselectFile: (file) => {
      setSelectedFiles((value) => value.filter((f) => f.uuid !== file.uuid));
    },
    props,
  };

  return (
    <ExplorerContext.Provider value={context}>
      <div className="suite__explorer">
        <div className="suite__explorer__top">
          <div className="suite__explorer__header">
            <span className="material-icons">folder</span>
            <h2 className="clr-greyscale-900">{t('Ajouter un document')}</h2>
          </div>
          <SearchBar />
          <ExplorerBreadcrumbs />
        </div>
        <div className="suite__explorer__content">{props.children}</div>
        <ExplorerFooter />
      </div>
    </ExplorerContext.Provider>
  );
};
