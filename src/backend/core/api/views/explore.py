from rest_framework.views import APIView
from rest_framework.response import Response


WORKSPACES = [
    {
        "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3",
        "name": "Club Utilisateur Interministériel Resana",
        "isPersonalWorkspace": False,
        "color": "#FF0000",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "02-01-2d6facaf-0e5b-418e-9825-42052ed0d8c3",
        "name": "Espace de test",
        "isPersonalWorkspace": False,
        "color": "#FF0000",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052er0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8s3",
        "name": "Espace Rennes Métropole",
        "isPersonalWorkspace": False,
        "color": "#FF0000",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82q52ed0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052et0d8c3",
        "name": "Ressourcerie Externe",
        "isPersonalWorkspace": False,
        "color": "#FF0000",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "02-01-2d6facaf-0e5b-418e-9825-820z2ed0d8c3",
        "name": "Communication Interne",
        "isPersonalWorkspace": False,
        "color": "#FF0000",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052st0d8c3",
        "name": "Espace CSE",
        "isPersonalWorkspace": False,
        "color": "#FF0000",
        "organization": {
            "uuid": "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3",
            "name": "Organization 1"
        }
    }, {
        "uuid": "02-01-2d6facaf-0e5b-418e-9825-8205sed0d8c3",
        "name": "Territoire Métropolitain",
        "isPersonalWorkspace": False,
        "color": "#FF0000",
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

class TargetExploreView(APIView):

    def get(self, request, uuid):
        return Response({
            "totalItems": 0,
            "perPage": 100,
            "currentPage": 1,
            "items": {
                "folders": [
                    {
                        "uuid": "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e2s",
                        "name": "Dossier 1",
                        "parentEntities": [
                            "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e25",
                            "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3"
                        ],
                        "createdAt": "2023-07-08T14:48:00.000Z",
                        "editedAt": "2023-07-08T14:48:00.000Z",
                        "createdBy": "01-01-79341a41-426b-4c1f-a1db-463fb972533b",
                        "createdByUser": {
                            "name": "John Doe"
                        },
                        "permissions": {
                            "rights": "read"
                        }
                    }, {
                        "uuid": "05-01-49bd69be-4bc1-4049-abb8-3d13a21a5e25",
                        "name": "Dossier 2",
                        "parentEntities": [
                            "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e25",
                            "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3"
                        ],
                        "createdAt": "2023-07-08T14:48:00.000Z",
                        "editedAt": "2023-07-08T14:48:00.000Z",
                        "createdBy": "01-01-79341a41-426b-4c1f-a1db-463fb972533b",
                        "createdByUser": {
                            "name": "John Doe"
                        },
                        "permissions": {
                            "rights": "read"
                        }
                    }, {
                        "uuid": "05-01-49bd69be-4bc1-4049-abb8-3d13a213de25",
                        "name": "Dossier 3",
                        "parentEntities": [
                            "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e25",
                            "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3"
                        ],
                        "createdAt": "2023-07-08T14:48:00.000Z",
                        "editedAt": "2023-07-08T14:48:00.000Z",
                        "createdBy": "01-01-79341a41-426b-4c1f-a1db-463fb972533b",
                        "createdByUser": {
                            "name": "John Doe"
                        },
                        "permissions": {
                            "rights": "read"
                        }
                    }, {
                        "uuid": "05-01-49bd69be-4bc1-4049-abb8-3d1ia2135e25",
                        "name": "Dossier 4",
                        "parentEntities": [
                            "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e25",
                            "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3"
                        ],
                        "createdAt": "2023-07-08T14:48:00.000Z",
                        "editedAt": "2023-07-08T14:48:00.000Z",
                        "createdBy": "01-01-79341a41-426b-4c1f-a1db-463fb972533b",
                        "createdByUser": {
                            "name": "John Doe"
                        },
                        "permissions": {
                            "rights": "read"
                        }
                    }
                ],
                "files": [
                    {
                        "uuid": "05-02-02d49e68-dfa5-4b33-9421-319fb6fa6eam",
                        "name": "Fiche de poste.pdf",
                        "parentEntities": [
                            "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e25",
                            "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3"
                        ],
                        "createdAt": "2023-07-08T14:48:00.000Z",
                        "editedAt": "2023-07-08T14:48:00.000Z",
                        "size": 6291456,
                        "createdBy": "01-01-79341a41-426b-4c1f-a1db-463fb972533b",
                        "createdByUser": {
                            "name": "John Doe"
                        },
                        "permissions": {
                            "rights": "read"
                        }
                    }, {
                        "uuid": "05-02-02d49e68-dfa5-4b33-9421-319fr6fa6eab",
                        "name": "Planning CA.xlsx",
                        "parentEntities": [
                            "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e25",
                            "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3"
                        ],
                        "createdAt": "2023-07-08T14:48:00.000Z",
                        "editedAt": "2023-07-08T14:48:00.000Z",
                        "size": 6291456,
                        "createdBy": "01-01-79341a41-426b-4c1f-a1db-463fb972533b",
                        "createdByUser": {
                            "name": "John Doe"
                        },
                        "permissions": {
                            "rights": "read"
                        }
                    }, {
                        "uuid": "05-02-02d49e68-dfa5-4b33-9421-319fbqfa6eab",
                        "name": "CR Réunion A.xlsx",
                        "parentEntities": [
                            "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e25",
                            "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3"
                        ],
                        "createdAt": "2023-07-08T14:48:00.000Z",
                        "editedAt": "2023-07-08T14:48:00.000Z",
                        "size": 6291456,
                        "createdBy": "01-01-79341a41-426b-4c1f-a1db-463fb972533b",
                        "createdByUser": {
                            "name": "John Doe"
                        },
                        "permissions": {
                            "rights": "read"
                        }
                    }, {
                        "uuid": "05-02-02d49e68-dfa5-4b33-9421-319fb6ftreab",
                        "name": "montagne.jpg",
                        "parentEntities": [
                            "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e25",
                            "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3"
                        ],
                        "createdAt": "2023-07-08T14:48:00.000Z",
                        "editedAt": "2023-07-08T14:48:00.000Z",
                        "size": 6291456,
                        "createdBy": "01-01-79341a41-426b-4c1f-a1db-463fb972533b",
                        "createdByUser": {
                            "name": "John Doe"
                        },
                        "permissions": {
                            "rights": "read"
                        }
                    }
                ]
            }
        })
