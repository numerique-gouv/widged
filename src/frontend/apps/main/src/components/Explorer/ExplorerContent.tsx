import { Row, SimpleDataGrid } from '@openfun/cunningham-react';
import prettyBytes from 'pretty-bytes';
import React, { useContext, useEffect, useState } from 'react';

import { ClientMessageType } from '@/app/explorer/WidgedReverseClient';
import { AppContext } from '@/app/explorer/page';
import {
  ExplorerMode,
  useExplorerContext,
} from '@/components/Explorer/Explorer';
import { FileIcon } from '@/components/FileIcon/FileIcon';
import { useApi } from '@/hooks/useApi';
import { File, Folder } from '@/types/data';

enum ExplorerRowType {
  FILE,
  FOLDER,
}
type ExplorerRow = Row & {
  name: string;
  editedAt: Date;
  size?: number;
  author?: string;
  type: ExplorerRowType;
  file?: File;
  folder?: Folder;
};

export const ExplorerContent = ({ targetUuid }: { targetUuid: string }) => {
  const { navigate, setAncestors } = useExplorerContext();
  const { fetchApi } = useApi();
  const [selectedRows, setSelectedRows] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let selectedRowsCount = 0;
  for (const key in selectedRows) {
    if (selectedRows[key]) {
      selectedRowsCount++;
    }
  }

  const [rows, setRows] = useState<ExplorerRow[]>([]);

  const { client } = useContext(AppContext);

  const choose = () => {
    const selectedFiles = rows.filter((row) => selectedRows[row.id]);
    console.log('selectedFiles', selectedFiles);

    client.post(ClientMessageType.SELECTION, {
      files: selectedFiles,
    });
  };

  useEffect(() => {
    const wrapper = async () => {
      const detailsResponse = await fetchApi(`targets/${targetUuid}/details/`);
      const folder = (await detailsResponse.json()) as Folder;
      console.log('detailsData', folder);
      setAncestors([...folder.parentEntities, folder]);

      const response = await fetchApi(`targets/${targetUuid}/explore/`);
      const data = (await response.json()) as {
        items: {
          files: File[];
          folders: Folder[];
        };
        parentEntities: Folder[];
      };
      const items = data.items;

      const rows: ExplorerRow[] = [
        ...items.files.map((file) => ({
          type: ExplorerRowType.FILE,
          id: file.uuid,
          name: file.name,
          editedAt: new Date(file.editedAt),
          size: file.size,
          author: file.createdByUser?.name,
          file: file,
        })),
        ...items.folders.map((folder) => ({
          type: ExplorerRowType.FOLDER,
          id: folder.uuid,
          name: folder.name,
          editedAt: new Date(folder.editedAt),
          author: folder.createdByUser?.name,
          folder: folder,
        })),
      ];

      setRows(rows);
      setIsLoading(false);
    };

    void wrapper();
  }, []);

  console.log(rows.length);

  return (
    <SimpleDataGrid
      isLoading={isLoading}
      columns={[
        {
          headerName: 'Nom',
          field: 'name',
          renderCell: (params) => {
            return (
              <div
                className="suite__explorer__folder"
                onClick={() =>
                  navigate({
                    mode: ExplorerMode.FOLDERS_FILES,
                    targetUuid: params.row.id,
                    folder: params.row.folder,
                  })
                }
              >
                {params.row.type === ExplorerRowType.FOLDER && (
                  <span className="material-icons">folder</span>
                )}
                {params.row.type === ExplorerRowType.FILE && (
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  <FileIcon file={params.row.file!} />
                )}
                {params.row.name}
              </div>
            );
          },
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
      enableRowSelection={(row) => row.original.type === ExplorerRowType.FILE}
      rowSelection={selectedRows}
      onRowSelectionChange={(selectedRows) => {
        setSelectedRows(selectedRows);
      }}
    />
  );
};
