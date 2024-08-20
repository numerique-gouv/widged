import { Input, Row, SimpleDataGrid } from '@openfun/cunningham-react';
import Image from 'next/image';
import prettyBytes from 'pretty-bytes';
import React, { useContext, useEffect, useState } from 'react';

import { fetchAPI } from '@/api/fetchApi';
import { ClientMessageType } from '@/app/explorer/WidgedReverseClient';
import { AppContext } from '@/app/explorer/page';
import { default as IconFolder } from '@/assets/images/folder.svg?url';
import { Button } from '@/components/Button/Button';
import { useAuth } from '@/core/auth/Auth';
import { Workspace } from '@/types/data';

import './page.scss';

interface ExplorerContextInterface {
  navigate: (mode: ExplorerMode, targetUuid: string) => void;
}

const ExplorerContext = React.createContext<ExplorerContextInterface>(
  {} as ExplorerContextInterface,
);

export const useExplorerContext = () => useContext(ExplorerContext);

enum ExplorerMode {
  WORKSPACES,
  FOLDERS_FILES,
}

export const Explorer = () => {
  const [mode, setMode] = useState<ExplorerMode>(ExplorerMode.WORKSPACES);
  const [targetUuid, setTargetUuid] = useState<string>();

  const context: ExplorerContextInterface = {
    navigate: (mode, targetUuid) => {
      setMode(mode);
      setTargetUuid(targetUuid);
    },
  };

  return (
    <div className="suite__explorer">
      <div className="suite__explorer__top">
        <div className="suite__explorer__header">
          <Image
            priority
            src={IconFolder}
            alt="Icone d'un dossier"
            aria-hidden={true}
          />
          <h2>Ajouter un document</h2>
        </div>
        <div className="suite__explorer__search">
          <Input
            label="Rechercher un document"
            icon={<span className="material-icons">search</span>}
            fullWidth={true}
          />
        </div>
        <ExplorerContext.Provider value={context}>
          {mode === ExplorerMode.WORKSPACES && <ExplorerWorkspaces />}
          {mode === ExplorerMode.FOLDERS_FILES && targetUuid && (
            <ExplorerFoldersFiles targetUuid={targetUuid} />
          )}
        </ExplorerContext.Provider>
      </div>
    </div>
  );
};

const ExplorerWorkspaces = () => {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const wrapper = async () => {
      const response = await fetchAPI(`workspaces/`);
      const data = await response.json();
      const workspaces = data.workspaces as Workspace[];
      const rows = workspaces.map((workspace) => ({
        id: workspace.uuid,
        name: workspace.name,
      }));
      setRows(rows);
    };

    void wrapper();
  }, []);

  const context = useExplorerContext();

  return (
    <SimpleDataGrid
      columns={[
        {
          headerName: 'Nom',
          field: 'name',
          renderCell: (params) => {
            return (
              <div
                className="suite__explorer__folder"
                onClick={() =>
                  context.navigate(ExplorerMode.FOLDERS_FILES, params.row.id)
                }
              >
                {params.row.name}
              </div>
            );
          },
        },
      ]}
      rows={rows}
    />
  );
};

const ExplorerFoldersFiles = ({ targetUuid }: { targetUuid: string }) => {
  const [selectedRows, setSelectedRows] = useState({});

  let selectedRowsCount = 0;
  for (const key in selectedRows) {
    if (selectedRows[key]) {
      selectedRowsCount++;
    }
  }

  // const rows = [
  //   {
  //     id: '1',
  //     name: 'compte-rendu.pdf',
  //     lastUpdate: '2021-10-12',
  //     size: '1.2 Mo',
  //     author: 'John Doe',
  //   },
  //   {
  //     id: '2',
  //     name: 'schema-api.pdf',
  //     lastUpdate: '2021-10-12',
  //     size: '200 Ko',
  //     author: 'John Doe',
  //   },
  //   {
  //     id: '4',
  //     name: 'promo.mp4',
  //     lastUpdate: '2021-10-12',
  //     size: '1.54 Go',
  //     author: 'Jane Doe',
  //   },
  // ];

  const [rows, setRows] = useState<Row[]>([]);

  const { client } = useContext(AppContext);
  const { user } = useAuth();

  const choose = () => {
    const selectedFiles = rows.filter((row) => selectedRows[row.id]);
    console.log('selectedFiles', selectedFiles);

    client.post(ClientMessageType.SELECTION, {
      files: selectedFiles,
    });
  };

  useEffect(() => {
    const wrapper = async () => {
      const response = await fetchAPI(`targets/${targetUuid}/explore/`);
      const data = await response.json();
      console.log(data);

      const rows = [
        ...data.items.files.map((file: any) => ({
          id: file.uuid,
          name: file.name,
          editedAt: new Date(file.editedAt),
          size: file.size,
          author: file.createdByUser?.name,
        })),
        ...data.items.folders.map((file: any) => ({
          id: file.uuid,
          name: file.name,
          editedAt: new Date(file.editedAt),
          author: file.createdByUser?.name,
        })),
      ];
      setRows(rows);
    };

    void wrapper();
  }, []);

  return (
    <SimpleDataGrid
      columns={[
        {
          headerName: 'Nom',
          field: 'name',
        },
        {
          headerName: 'Dernière modification',
          field: 'editedAt',
          renderCell: (params) => {
            return params.row.editedAt.toLocaleString();
          },
        },
        {
          headerName: 'Auteur',
          field: 'author',
        },
        {
          headerName: 'Taille',
          field: 'size',
          renderCell: (params) => {
            return params.row.size ? prettyBytes(params.row.size) : '-';
          },
        },
      ]}
      rows={rows}
      enableRowSelection={true}
      rowSelection={selectedRows}
      onRowSelectionChange={(selectedRows) => {
        setSelectedRows(selectedRows);
      }}
    />
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
