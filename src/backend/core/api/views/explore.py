from faker import Faker
from rest_framework.response import Response
from rest_framework.views import APIView

from core.factories import FileFactory, FolderFactory

WORKSPACES = [
    {
        "uuid": "workspace1",
        "name": "Club Utilisateur Interministériel Resana",
        "isPersonalWorkspace": False,
        "color": "#008380",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "workspace2",
        "name": "Espace de test",
        "isPersonalWorkspace": False,
        "color": "#CD3636",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052er0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "workspace3",
        "name": "Espace Rennes Métropole",
        "isPersonalWorkspace": False,
        "color": "#707070",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82q52ed0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "workspace4",
        "name": "Ressourcerie Externe",
        "isPersonalWorkspace": False,
        "color": "#E88B1C",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "workspace5",
        "name": "Communication Interne",
        "isPersonalWorkspace": False,
        "color": "#0870BA",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "workspace6",
        "name": "Espace CSE",
        "isPersonalWorkspace": False,
        "color": "#CD3636",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "workspace7",
        "name": "Territoire Métropolitain",
        "isPersonalWorkspace": False,
        "color": "#707070",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3",
            "name": "Organization 1"
        }
    }
]


class WorkspaceView(APIView):

    def get(self, request):
        return Response({
            "totalItems": len(WORKSPACES),
            "perPage": 100,
            "currentPage": 1,
            "workspaces": WORKSPACES
        })


fake = Faker()
CONTENT = {
    "uuid": "default",
    "files": ["Rush séminaire.mp4", "Planning CA.xlsx", "CR Réunion A.docx", "Fiche de poste.pdf", "montagne.jpg"],
    "folders": [
        {
            "uuid": "aaa",
            "name": "Seminaire 2022",
            "files": [fake.file_name() for _ in range(8)]
        }, {
            "uuid": "bbb",
            "name": "Comptabilité",
            "files": [fake.file_name() for _ in range(8)],
            "folders": [
                {
                    "uuid": "ccc",
                    "name": "Factures",
                    "files": [fake.file_name() for _ in range(8)]
                }, {
                    "uuid": "ddd",
                    "name": "Bilan",
                    "files": [fake.file_name() for _ in range(8)]
                }
            ]
        }, {
            "uuid": "eee",
            "name": "Ressources Humaines",
            "files": [fake.file_name() for _ in range(8)],
            "folders": [
                {
                    "uuid": "fff",
                    "name": "Recrutement",
                    "files": [fake.file_name() for _ in range(8)]
                }, {
                    "uuid": "ggg",
                    "name": "Formation",
                    "files": [fake.file_name() for _ in range(8)],
                    "folders": [
                        {
                            "uuid": "hhh",
                            "name": "Technologie",
                            "files": [fake.file_name() for _ in range(8)],
                            "folders": [
                                {
                                    "uuid": "iii",
                                    "name": "Programming",
                                    "files": [fake.file_name() for _ in range(8)],
                                    "folders": [
                                        {
                                            "uuid": "jjj",
                                            "name": "Python",
                                            "files": [fake.file_name() for _ in range(8)],
                                            "folders": [
                                                {
                                                    "uuid": "kkk",
                                                    "name": "Architecture",
                                                    "files": [fake.file_name() for _ in range(8)],
                                                    "folders": [
                                                        {
                                                            "uuid": "lll",
                                                            "name": "Cloud Architecture",
                                                            "files": [fake.file_name() for _ in range(8)],
                                                            "folders": [
                                                                {
                                                                    "uuid": "mmm",
                                                                    "name": "AWS Architecture",
                                                                    "files": [fake.file_name() for _ in range(8)],
                                                                    "folders": [

                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
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


class TargetExploreView(APIView):

    def get(self, request, uuid):
        if "workspace" in uuid:
            folder = CONTENT
        else:
            folder = get_folder_by_uuid(CONTENT, uuid)

        if "folders" in folder:
            folders = [FolderFactory(sub_folder) for sub_folder in folder["folders"]]
        else:
            folders = []

        files = [FileFactory(file) for file in folder["files"]]

        return Response({
            "totalItems": 0,
            "perPage": 100,
            "currentPage": 1,

            "items": {
                "folders": folders,
                "files": files
            }
        })


class TargetDetailsView(APIView):

    def get(self, request, uuid):

        if "workspace" in uuid:
            folder = CONTENT
        else:
            folder = get_folder_by_uuid(CONTENT, uuid)

        ancestors = folder["ancestors"] if "ancestors" in folder else []
        folder_data = FolderFactory(folder)

        return Response({
            **folder_data,
            "parentEntities": [{"name": ancestor["name"] if "name" in ancestor else "", "uuid": ancestor['uuid']} for
                               ancestor in ancestors],
        })
