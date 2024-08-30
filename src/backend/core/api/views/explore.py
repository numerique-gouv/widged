from rest_framework.response import Response
from rest_framework.views import APIView

from core.content_manager import get_content_backend


class WorkspaceView(APIView):

    def get(self, request):
        return Response(get_content_backend().get_workspaces())


class TargetExploreView(APIView):

    def get(self, request, uuid):
        return Response(get_content_backend().get_target_explore(request, uuid))

class SearchView(APIView):

    def get(self, request):
        return Response(get_content_backend().get_search(request))


class TargetDetailsView(APIView):

    def get(self, request, uuid):
        return Response(get_content_backend().get_target_details(uuid))
