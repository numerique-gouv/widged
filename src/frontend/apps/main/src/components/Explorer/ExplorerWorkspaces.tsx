import { Row, SimpleDataGrid } from '@openfun/cunningham-react';
import React, { useEffect, useState } from 'react';

import {
  ExplorerMode,
  useExplorerContext,
} from '@/components/Explorer/Explorer';
import { WorkspaceIcon } from '@/components/WorkspaceIcon/WorkspaceIcon';
import { useApi } from '@/hooks/useApi';
import { Workspace } from '@/types/data';

type WorkspaceRow = Row & {
  workspace: Workspace;
  name: string;
};

export const ExplorerWorkspaces = () => {
  const context = useExplorerContext();
  const { fetchApi } = useApi();
  const [rows, setRows] = useState<WorkspaceRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
          headerName: 'Nom',
          field: 'name',
          renderCell: (params) => {
            return (
              <div
                className="suite__explorer__folder"
                onClick={() =>
                  context.navigate({
                    mode: ExplorerMode.FOLDERS_FILES,
                    workspace: params.row.workspace,
                    targetUuid: params.row.id,
                  })
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
