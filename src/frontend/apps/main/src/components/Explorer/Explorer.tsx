import { Input } from '@openfun/cunningham-react';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ClientMessageType } from '@/app/explorer/WidgedReverseClient';
import { AppContext } from '@/app/explorer/layout';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button/Button';
import { ExplorerContent } from '@/components/Explorer/ExplorerContent';
import { ExplorerWorkspaces } from '@/components/Explorer/ExplorerWorkspaces';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { File, Folder, Workspace } from '@/types/data';

import './Explorer.scss';

import { useRouter } from 'next/navigation';

interface ExplorerContextInterface {
  navigate: (view: ExplorerView) => void;
  setAncestors: (ancestors: Folder[]) => void;
  selectedFiles: File[];
  selectFile: (file: File) => void;
  unselectFile: (file: File) => void;
  props: ExplorerProps;
}

const ExplorerContext = React.createContext<ExplorerContextInterface>(
  {} as ExplorerContextInterface,
);

export const useExplorerContext = () => useContext(ExplorerContext);

export enum ExplorerMode {
  WORKSPACES = 'workspaces',
  FOLDERS_FILES = 'folders_files',
  SEARCH = 'search',
}

interface ExplorerView {
  mode: ExplorerMode;
  targetUuid?: string;
  workspace?: Workspace;
  folder?: Folder;
}

interface AncestorContext {
  // view: ExplorerView;
  href: string;
  name: string;
}

function isSameView(a: ExplorerView, b: ExplorerView) {
  return (
    a.mode === b.mode &&
    a.targetUuid === b.targetUuid &&
    a.workspace?.uuid === b.workspace?.uuid
  );
}

export interface ExplorerProps extends PropsWithChildren {
  maxFiles?: number;
}

export const Explorer = (props: ExplorerProps) => {
  const router = useRouter();
  const [view, setView] = useState<ExplorerView>({
    mode: ExplorerMode.WORKSPACES,
  });
  const [folderAncestors, setFolderAncestors] = useState<Folder[]>([]);
  const [workspace, setWorkspace] = useState<Workspace>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const getBreadcrumbs = () => {
    const ancestors: AncestorContext[] = [];
    // Add all workspaces.
    ancestors.push({
      name: 'Mes espaces',
      href: '/explorer',
    });

    // Add the current workspace.
    if (workspace) {
      ancestors.push({
        name: workspace.name,
        href: `/explorer/${workspace.uuid}`,
      });
    }

    // Add folder ancestors.
    folderAncestors
      .filter((ancestor) => ancestor.name !== '')
      .forEach((ancestor) => {
        ancestors.push({
          name: ancestor.name,
          href: `/explorer/${ancestor.uuid}`,
        });
      });

    return ancestors;
  };

  const navigate = (toView: ExplorerView) => {
    if (isSameView(view, toView)) {
      return;
    }
    setView(toView);
    setFolderAncestors([]);
    if (toView.workspace) {
      setWorkspace(toView.workspace);
    }
    if (toView.mode === ExplorerMode.WORKSPACES) {
      setWorkspace(undefined);
    }
  };

  const context: ExplorerContextInterface = {
    navigate,
    setAncestors: (ancestors) => {
      setFolderAncestors(ancestors);
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

  const breadcrumbs = getBreadcrumbs();

  return (
    <ExplorerContext.Provider value={context}>
      <div className="suite__explorer">
        <div className="suite__explorer__top">
          <div className="suite__explorer__header">
            <span className="material-icons">folder</span>
            <h2 className="clr-greyscale-900">Ajouter un document</h2>
          </div>
          <SearchBar />

          <Breadcrumbs
            displayBack={false}
            items={[
              ...breadcrumbs.map((ancestor, i) => ({
                content: (
                  <Button
                    color="tertiary-text"
                    size="small"
                    onClick={() => router.push(ancestor.href)}
                  >
                    {ancestor.name}
                  </Button>
                ),
              })),
            ]}
          />
        </div>
        <div className="suite__explorer__content">{props.children}</div>
        <ExplorerFooter />
      </div>
    </ExplorerContext.Provider>
  );
};

const ExplorerFooter = () => {
  const { selectedFiles, props } = useExplorerContext();
  const { client } = useContext(AppContext);

  const choose = () => {
    client.post(ClientMessageType.SELECTION, {
      files: selectedFiles,
    });
  };

  const isValid = () => {
    if (props.maxFiles === undefined) {
      return true;
    }
    return selectedFiles.length <= props.maxFiles;
  };

  const canSubmit = () => {
    return selectedFiles.length > 0 && isValid();
  };

  const cancel = () => {
    client.post(ClientMessageType.CANCEL);
  };

  return (
    <div className="suite__explorer__footer">
      <div>
        {selectedFiles.length > 0 ? (
          <div>{selectedFiles.length} documents sélectionnés</div>
        ) : (
          <div className="clr-greyscale-800">Aucun document selectionné</div>
        )}
        {!isValid() && (
          <div className="clr-danger-500 fs-t">
            Vous ne pouvez pas sélectionner plus de {props.maxFiles} documents
          </div>
        )}
      </div>
      <div className="suite__explorer__footer__actions">
        <Button color="secondary" onClick={cancel}>
          Annuler
        </Button>
        <Button color="primary" disabled={!canSubmit()} onClick={choose}>
          Confirmer
        </Button>
      </div>
    </div>
  );
};
