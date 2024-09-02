'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {
  ExplorerRow,
  ExplorerRowType,
} from '@/components/Explorer/ExplorerContent';
import { ExplorerContentGrid } from '@/components/Explorer/ExplorerContentGrid';
import { useApi } from '@/hooks/useApi';
import { File, Folder } from '@/types/data';

import './page.scss';

import { useExplorerContext } from '@/components/Explorer/Explorer';

import { useTranslation } from 'react-i18next';

export default function Search() {
  const { fetchApi } = useApi();
  const { setCrumbs } = useExplorerContext();
  const { t } = useTranslation();
  const params = useSearchParams();
  const terms = params.get('terms');
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<ExplorerRow[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      const response = await fetchApi('search?terms=' + terms);
      const data = (await response.json()) as {
        totalItems: number;
        items: {
          files: File[];
          folders: Folder[];
        };
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
      setCount(data.totalItems);
      setCrumbs([
        {
          name: t('Recherche'),
          href: window.location.pathname + window.location.search,
        },
      ]);
    })();
  }, [terms]);

  return (
    <>
      {!isLoading && (
        <div className="suite__explore__search__results fw-medium fs-m">
          {t('explorer.search.results', {
            count: count,
          })}
        </div>
      )}
      <ExplorerContentGrid isLoading={isLoading} rows={rows} />
    </>
  );
}
