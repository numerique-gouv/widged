from ..factories import FileFactory, FolderFactory
from .dummy_data import CONTENT, WORKSPACES


class DummyBackend:
    def get_workspaces(self):
        return {
            "totalItems": len(WORKSPACES),
            "perPage": 100,
            "currentPage": 1,
            "workspaces": WORKSPACES,
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
            "parentEntities": [
                {
                    "name": ancestor["name"] if "name" in ancestor else "",
                    "uuid": ancestor["uuid"],
                }
                for ancestor in ancestors
            ],
        }

    def get_search(self, request):
        terms = request.GET.get("terms")
        folders, files = search(CONTENT, terms)

        folders_data = []
        for folder in folders:
            folder_data = FolderFactory(folder)
            folder_data["parentEntities"] = [
                {"name": ancestor["name"], "uuid": ancestor["uuid"]}
                for ancestor in folder["ancestors"]
            ]
            folders_data.append(folder_data)

        files_data = []
        for file in files:
            file_data = FileFactory(file["name"])
            file_data["parentEntities"] = [
                {"name": ancestor["name"], "uuid": ancestor["uuid"]}
                for ancestor in file["ancestors"]
            ]
            files_data.append(file_data)

        return {
            "totalItems": len(folders_data) + len(files_data),
            "items": {"folders": folders_data, "files": files_data},
        }

    def get_target_explore(self, request, uuid):
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
            "items": {"folders": folders, "files": files},
        }


def get_folder_by_uuid(root, uuid, ancestors=None):
    if ancestors is None:
        ancestors = []
    if root["uuid"] == uuid:
        root["ancestors"] = ancestors
        return root
    for folder in root.get("folders", []):
        result = get_folder_by_uuid(folder, uuid, ancestors + [root])
        if result:
            return result
    return None


def search(root, terms, ancestors=None, folders_acc=None, files_acc=None):
    if ancestors is None:
        ancestors = []
    if folders_acc is None:
        folders_acc = []
    if files_acc is None:
        files_acc = []

    root["ancestors"] = ancestors
    if terms in root["name"]:
        folders_acc.append(root)

    for file in root["files"]:
        if terms in file:
            files_acc.append({"name": file, "ancestors": ancestors})

    if "folders" in root:
        for folder in root["folders"]:
            search(folder, terms, ancestors + [root], folders_acc, files_acc)

    return folders_acc, files_acc
