import { Row } from '@openfun/cunningham-react';
import React, { useEffect, useState } from 'react';

import { useExplorerContext } from '@/components/Explorer/Explorer';
import { ExplorerContentGrid } from '@/components/Explorer/ExplorerContentGrid';
import { useApi } from '@/hooks/useApi';
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

export const ExplorerContent = ({ targetUuid }: { targetUuid: string }) => {
  const { setCrumbs } = useExplorerContext();
  const { fetchApi } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<ExplorerRow[]>([]);

  useEffect(() => {
    const wrapper = async () => {
      const detailsResponse = await fetchApi(`targets/${targetUuid}/details/`);
      const folder = (await detailsResponse.json()) as Folder;

      setCrumbs(
        [...folder.parentEntities, folder]
          .filter((ancestor) => ancestor.name !== '')
          .map((ancestor) => {
            return {
              name: ancestor.name,
              href: `/explorer/folders/${ancestor.uuid}`,
            };
          }),
      );

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

  return <ExplorerContentGrid isLoading={isLoading} rows={rows} />;
};
