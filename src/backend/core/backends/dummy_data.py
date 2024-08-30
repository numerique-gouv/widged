from faker import Faker

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

fake = Faker()
CONTENT = {
    "uuid": "default",
    "name": "Mon Espace",
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
                            "files": ["Python.pdf", "Java.pdf", "C++.pdf", "C#.pdf", "Ruby.pdf", "Javascript.pdf", "HTML.pdf", "CSS.pdf"],
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

