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
