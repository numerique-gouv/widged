import Image from 'next/image';
import React, { useContext, useState } from 'react';

import { ClientMessageType } from '@/app/explorer/WidgedReverseClient';
import { ExplorerContext } from '@/app/explorer/page';
import { default as IconFolder } from '@/assets/images/folder.svg?url';
import { useAuth } from '@/core/auth/Auth';

import './page.scss';

import { Input, SimpleDataGrid } from '@openfun/cunningham-react';

import { Button } from '@/components/Button/Button';

import { RowSelectionState } from '@tanstack/table-core/src/features/RowSelection';

export const Explorer = () => {
  const files = ['compte-rendu.pdf', 'schema-api.pdf'];
  const { client } = useContext(ExplorerContext);
  const { user } = useAuth();
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

  let selectedRowsCount = 0;
  for (const key in selectedRows) {
    if (selectedRows[key]) {
      selectedRowsCount++;
    }
  }

  const rows = [
    {
      id: '1',
      name: 'compte-rendu.pdf',
      lastUpdate: '2021-10-12',
      size: '1.2 Mo',
      author: 'John Doe',
    },
    {
      id: '2',
      name: 'schema-api.pdf',
      lastUpdate: '2021-10-12',
      size: '200 Ko',
      author: 'John Doe',
    },
    {
      id: '4',
      name: 'promo.mp4',
      lastUpdate: '2021-10-12',
      size: '1.54 Go',
      author: 'Jane Doe',
    },
  ];

  const choose = () => {
    const selectedFiles = rows.filter((row) => selectedRows[row.id]);
    console.log('selectedFiles', selectedFiles);

    client.post(ClientMessageType.SELECTION, {
      files: selectedFiles,
    });
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
        <SimpleDataGrid
          columns={[
            {
              headerName: 'Nom',
              field: 'name',
            },
            {
              headerName: 'Dernière modification',
              field: 'lastUpdate',
            },
            {
              headerName: 'Auteur',
              field: 'author',
            },
            {
              headerName: 'Taille',
              field: 'size',
            },
          ]}
          rows={rows}
          enableRowSelection={true}
          rowSelection={selectedRows}
          onRowSelectionChange={(selectedRows) => {
            setSelectedRows(selectedRows);
          }}
        />
      </div>

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
    </div>
  );
};
