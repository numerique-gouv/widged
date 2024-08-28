import { Row, SimpleDataGrid } from '@openfun/cunningham-react';
import { RowSelectionState } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
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
  const { navigate, setAncestors, selectFile, unselectFile, selectedFiles } =
    useExplorerContext();
  const { fetchApi } = useApi();
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<ExplorerRow[]>([]);
  const router = useRouter();

  const getSelectedFilesDiff = (newSelectedRows: RowSelectionState) => {
    const newSelectedFiles = Object.entries(newSelectedRows).filter(
      (newSelectedRow) => !selectedRows[newSelectedRow[0]],
    );
    const unselectedFiles = Object.entries(selectedRows).filter(
      (selectedRow) => !newSelectedRows[selectedRow[0]],
    );

    const toFiles = (selectionState: [string, boolean][]) => {
      return selectionState.map(([id, isSelected]) => {
        const row = rows.find((row) => row.id === id);
        if (!row) {
          throw new Error('Row not found');
        }
        return row.file!;
      });
    };

    // console.log('getSelectedFilesDiff', selectedRows);

    return {
      added: toFiles(newSelectedFiles),
      removed: toFiles(unselectedFiles),
    };
  };

  useEffect(() => {
    const wrapper = async () => {
      const detailsResponse = await fetchApi(`targets/${targetUuid}/details/`);
      const folder = (await detailsResponse.json()) as Folder;
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

      // Make selected rows already selected.
      const selectedRowsTmp: RowSelectionState = {};
      selectedFiles.forEach((file) => {
        const row = rows.find((row) => row.id === file.uuid);
        if (row) {
          selectedRowsTmp[row.id] = true;
        }
      });
      setSelectedRows(selectedRowsTmp);
    };

    void wrapper();
  }, []);

  // console.log('selectedRows', selectedRows);

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
                onClick={() => {
                  // navigate({
                  //   mode: ExplorerMode.FOLDERS_FILES,
                  //   targetUuid: params.row.id,
                  //   folder: params.row.folder,
                  // })
                  router.push(`/explorer/${params.row.id}`);
                }}
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
      onRowSelectionChange={(newSelectedRows) => {
        console.log('onRowSelectionChange', 'selectedRows', newSelectedRows);
        setSelectedRows(newSelectedRows);

        const diff = getSelectedFilesDiff(newSelectedRows);
        console.log('diff', diff);
        diff.added.forEach((added) => {
          selectFile(added);
        });
        diff.removed.forEach((removed) => {
          unselectFile(removed);
        });
      }}
    />
  );
};
