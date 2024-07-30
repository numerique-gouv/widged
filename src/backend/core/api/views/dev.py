# pylint: skip-file
"""Development views."""
from django.conf import settings
from django.http import Http404, HttpResponse

def dev_view(request):
    if not settings.DEBUG:
        raise Http404()

    return HttpResponse("Dev")
