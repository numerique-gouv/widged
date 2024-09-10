import { Row, SimpleDataGrid } from '@openfun/cunningham-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WorkspaceIcon } from '@/components/WorkspaceIcon/WorkspaceIcon';
import { useApi } from '@/hooks/useApi';
import { Workspace } from '@/types/data';

type WorkspaceRow = Row & {
  workspace: Workspace;
  name: string;
};

export const ExplorerWorkspaces = () => {
  const { fetchApi } = useApi();
  const { t } = useTranslation();
  const [rows, setRows] = useState<WorkspaceRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const wrapper = async () => {
      const response = await fetchApi(`workspaces/`, undefined, {
        closableError: false,
      });
      const data = await response.json();
      const workspaces = data.workspaces as Workspace[];
      const rows = workspaces.map((workspace) => ({
        id: workspace.uuid,
        name: workspace.name,
        workspace: workspace,
      }));
      setRows(rows);
      setIsLoading(false);
    };

    void wrapper();
  }, []);

  return (
    <SimpleDataGrid
      isLoading={isLoading}
      columns={[
        {
          headerName: t('Nom'),
          field: 'name',
          renderCell: (params) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div
                className="suite__explorer__folder"
                onClick={() =>
                  router.push(`/explorer/folders?uuid=${params.row.id}`)
                }
              >
                <WorkspaceIcon workspace={params.row.workspace} />
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
