export interface Organization {
  uuid: string;
  name: string;
}

export interface Workspace {
  uuid: string;
  name: string;
  isPersonalWorkspace: boolean;
  color: string;
  organization: Organization;
}

export interface Folder {
  uuid: string;
  name: string;
  parentEntities: Folder[];
  createdAt: string;
  editedAt: string;
  createdBy: string;
  createdByUser: {
    name: string;
  };
}

export interface File {
  uuid: string;
  name: string;
  parentEntities: string[];
  createdAt: string;
  editedAt: string;
  createdBy: string;
  createdByUser: {
    name: string;
  };
  size: number;
}
