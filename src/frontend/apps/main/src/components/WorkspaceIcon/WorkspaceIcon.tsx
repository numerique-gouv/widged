import { Workspace } from '@/types/data';

import './WorkspaceIcon.scss';

export const WorkspaceIcon = ({ workspace }: { workspace: Workspace }) => {
  return (
    <div
      className="suite__workspace-icon"
      style={{ backgroundColor: workspace.color }}
    >
      <div className="suite__workspace-icon__child"></div>
    </div>
  );
};
