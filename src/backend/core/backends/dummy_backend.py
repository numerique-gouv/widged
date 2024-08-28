from .dummy_data import WORKSPACES, CONTENT
from ..factories import FolderFactory, FileFactory


class DummyBackend:

    def get_workspaces(self):
        return {
            "totalItems": len(WORKSPACES),
            "perPage": 100,
            "currentPage": 1,
            "workspaces": WORKSPACES
        }

    def get_target_details(self, uuid):
        if "workspace" in uuid:
            folder = CONTENT
        else:
            folder = get_folder_by_uuid(CONTENT, uuid)

        ancestors = folder["ancestors"] if "ancestors" in folder else []
        folder_data = FolderFactory(folder)

        return {
            **folder_data,
            "parentEntities": [{"name": ancestor["name"] if "name" in ancestor else "", "uuid": ancestor['uuid']} for
                               ancestor in ancestors],
        }

    def get_target_explore(self, uuid):
        if "workspace" in uuid:
            folder = CONTENT
        else:
            folder = get_folder_by_uuid(CONTENT, uuid)

        if "folders" in folder:
            folders = [FolderFactory(sub_folder) for sub_folder in folder["folders"]]
        else:
            folders = []

        files = [FileFactory(file) for file in folder["files"]]

        return {
            "totalItems": 0,
            "perPage": 100,
            "currentPage": 1,
            "items": {
                "folders": folders,
                "files": files
            }
        }

def get_folder_by_uuid(root, uuid, ancestors=[]):
    if root["uuid"] == uuid:
        root["ancestors"] = ancestors
        return root
    for folder in root.get("folders", []):
        result = get_folder_by_uuid(folder, uuid, ancestors + [root])
        if result:
            return result
    return None
