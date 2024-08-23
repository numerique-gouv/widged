# ruff: noqa: S311
"""
Core application factories
"""
from django.conf import settings
from django.contrib.auth.hashers import make_password

import factory.fuzzy
from faker import Faker

from core import models


class UserFactory(factory.django.DjangoModelFactory):
    """A factory to random users for testing purposes."""

    class Meta:
        model = models.User

    sub = factory.Sequence(lambda n: f"user{n!s}")
    email = factory.Faker("email")
    language = factory.fuzzy.FuzzyChoice([lang[0] for lang in settings.LANGUAGES])
    password = make_password("password")


def FolderFactory(folder):
    fake = Faker()
    return {
        "uuid": folder["uuid"],
        "name": folder["name"] if "name" in folder else "",
        "parentEntities": [
            "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e25",
            "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3"
        ],
        "createdAt": fake.date_time(),
        "editedAt": fake.date_time(),
        "createdBy": "01-01-79341a41-426b-4c1f-a1db-463fb972533b",
        "createdByUser": {
            "name": fake.name()
        },
        "permissions": {
            "rights": "read"
        }
    }

def FileFactory(name):
    fake = Faker()
    return {
        "uuid": fake.uuid4(),
        "name": name,
        "parentEntities": [
            "05-01-49bd69be-4bc1-4049-abb8-3d13a2135e25",
            "02-01-2d6facaf-0e5b-418e-9825-82052ed0d8c3"
        ],
        "createdAt": fake.date_time(),
        "editedAt": fake.date_time(),
        "size": fake.pyint(100, 1000000000),
        "createdBy": "01-01-79341a41-426b-4c1f-a1db-463fb972533b",
        "createdByUser": {
            "name": fake.name()
        },
        "permissions": {
            "rights": "read"
        }
    }
