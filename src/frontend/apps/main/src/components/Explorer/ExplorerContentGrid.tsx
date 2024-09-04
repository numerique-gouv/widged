import { Row, SimpleDataGrid } from '@openfun/cunningham-react';
import { RowSelectionState } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import prettyBytes from 'pretty-bytes';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useExplorerContext } from '@/components/Explorer/Explorer';
import { FileIcon } from '@/components/FileIcon/FileIcon';
import { File, Folder } from '@/types/data';

export enum ExplorerRowType {
  FILE,
  FOLDER,
}
export type ExplorerRow = Row & {
  name: string;
  editedAt: Date;
  size?: number;
  author?: string;
  type: ExplorerRowType;
  file?: File;
  folder?: Folder;
};

interface Props {
  isLoading: boolean;
  rows: ExplorerRow[];
}

export const ExplorerContentGrid = ({ isLoading, rows }: Props) => {
  const router = useRouter();
  const { selectedFiles, selectFile, unselectFile } = useExplorerContext();
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const { t } = useTranslation();

  const getSelectedFilesDiff = (newSelectedRows: RowSelectionState) => {
    const newSelectedFiles = Object.entries(newSelectedRows).filter(
      (newSelectedRow) => !selectedRows[newSelectedRow[0]],
    );
    const unselectedFiles = Object.entries(selectedRows).filter(
      (selectedRow) => !newSelectedRows[selectedRow[0]],
    );

    const toFiles = (selectionState: [string, boolean][]) => {
      return selectionState.map(([id]) => {
        const row = rows.find((row) => row.id === id);
        if (!row) {
          throw new Error('Row not found');
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return row.file!;
      });
    };

    return {
      added: toFiles(newSelectedFiles),
      removed: toFiles(unselectedFiles),
    };
  };

  useEffect(() => {
    // Make selected rows already selected.
    const selectedRowsTmp: RowSelectionState = {};
    selectedFiles.forEach((file) => {
      const row = rows.find((row) => row.id === file.uuid);
      if (row) {
        selectedRowsTmp[row.id] = true;
      }
    });
    setSelectedRows(selectedRowsTmp);
  }, [rows]);

  return (
    <SimpleDataGrid
      isLoading={isLoading}
      columns={[
        {
          headerName: t('Nom'),
          field: 'name',
          renderCell: (params) => {
            return (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
              <div
                className="suite__explorer__folder"
                onClick={() => {
                  router.push(`/explorer/folders/${params.row.id}`);
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
          headerName: t('Dernière modification'),
          field: 'editedAt',
          renderCell: (params) => {
            return params.row.editedAt.toLocaleString();
          },
        },
        {
          headerName: t('Auteur'),
          field: 'author',
        },
        {
          headerName: t('Taille'),
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
        setSelectedRows(newSelectedRows);

        const diff = getSelectedFilesDiff(newSelectedRows);
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
