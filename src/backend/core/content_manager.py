from django.conf import settings
from django.utils.module_loading import import_string


def get_content_backend():
    backend_class = import_string(settings.CONTENT_BACKEND)
    backend = backend_class()
    return backend
