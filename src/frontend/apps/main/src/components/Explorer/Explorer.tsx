import { Input } from '@openfun/cunningham-react';
import Image from 'next/image';
import React, { useContext, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { ExplorerContent } from '@/components/Explorer/ExplorerContent';
import { ExplorerWorkspaces } from '@/components/Explorer/ExplorerWorkspaces';

import './Explorer.scss';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Folder, Workspace } from '@/types/data';

interface ExplorerContextInterface {
  navigate: (view: ExplorerView) => void;
  setAncestors: (ancestors: Folder[]) => void;
}

const ExplorerContext = React.createContext<ExplorerContextInterface>(
  {} as ExplorerContextInterface,
);

export const useExplorerContext = () => useContext(ExplorerContext);

export enum ExplorerMode {
  WORKSPACES = 'workspaces',
  FOLDERS_FILES = 'folders_files',
}

interface ExplorerView {
  mode: ExplorerMode;
  targetUuid?: string;
  workspace?: Workspace;
  folder?: Folder;
}

interface AncestorContext {
  view: ExplorerView;
  name: string;
}

export const Explorer = () => {
  const [view, setView] = useState<ExplorerView>({
    mode: ExplorerMode.WORKSPACES,
  });
  const [folderAncestors, setFolderAncestors] = useState<Folder[]>([]);
  const [workspace, setWorkspace] = useState<Workspace>();

  const getBreadcrumbs = () => {
    const ancestors: AncestorContext[] = [];
    // Add all workspaces.
    ancestors.push({
      view: {
        mode: ExplorerMode.WORKSPACES,
      },
      name: 'Mes espaces',
    });

    // Add the current workspace.
    if (workspace) {
      ancestors.push({
        view: {
          mode: ExplorerMode.FOLDERS_FILES,
          workspace: workspace,
          targetUuid: workspace.uuid,
        },
        name: workspace.name,
      });
    }

    // Add folder ancestors.
    folderAncestors
      .filter((ancestor) => ancestor.name !== '')
      .forEach((ancestor) => {
        ancestors.push({
          view: {
            mode: ExplorerMode.FOLDERS_FILES,
            targetUuid: ancestor.uuid,
          },
          name: ancestor.name,
        });
      });

    return ancestors;
  };

  const navigate = (view: ExplorerView) => {
    setView(view);
    setFolderAncestors([]);
    if (view.workspace) {
      setWorkspace(view.workspace);
    }
    if (view.mode === ExplorerMode.WORKSPACES) {
      setWorkspace(undefined);
    }
  };

  const context: ExplorerContextInterface = {
    navigate,
    setAncestors: (ancestors) => {
      setFolderAncestors(ancestors);
    },
  };
  console.log('view', view);
  // console.log('views', views);

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="suite__explorer">
      <div className="suite__explorer__top">
        <div className="suite__explorer__header">
          <span className="material-icons">folder</span>
          <h2>Ajouter un document</h2>
        </div>
        <div className="suite__explorer__search">
          <Input
            label="Rechercher un document"
            icon={<span className="material-icons">search</span>}
            fullWidth={true}
          />
        </div>
        <Breadcrumbs
          displayBack={false}
          items={[
            ...breadcrumbs.map((ancestor) => ({
              content: (
                <Button
                  color="tertiary-text"
                  size="small"
                  onClick={() => navigate(ancestor.view)}
                >
                  {ancestor.name}
                </Button>
              ),
            })),
          ]}
        />
        <ExplorerContext.Provider value={context}>
          {view.mode === ExplorerMode.WORKSPACES && <ExplorerWorkspaces />}
          {view.mode === ExplorerMode.FOLDERS_FILES && view.targetUuid && (
            <ExplorerContent
              targetUuid={view.targetUuid}
              key={view.targetUuid}
            />
          )}
        </ExplorerContext.Provider>
      </div>
    </div>
  );
};

const ExplorerFooter = () => {
  return (
    <div className="suite__explorer__footer">
      {selectedRowsCount ? (
        <p>{selectedRowsCount} documents sélectionnés</p>
      ) : (
        <p></p>
      )}
      <div className="suite__explorer__footer__actions">
        <Button color="tertiary">Annuler</Button>
        <Button color="primary" onClick={choose}>
          Confirmer
        </Button>
      </div>
    </div>
  );
};
