"""URL configuration for the core app."""
from django.conf import settings
from django.urls import include, path

from mozilla_django_oidc.views import OIDCAuthenticationCallbackView
from rest_framework.routers import DefaultRouter

from core.api import viewsets
from core.api.views.dev import dev_view
from core.api.views.explore import (
    SearchView,
    TargetDetailsView,
    TargetExploreView,
    WorkspaceView,
)
from core.api.views.spoof import spoof_view
from core.authentication.urls import urlpatterns as oidc_urls
from core.authentication.views import OIDCLogoutCallbackView

# - Main endpoints
router = DefaultRouter()
router.register("users", viewsets.UserViewSet, basename="users")

urlpatterns = [
    path(
        f"api/{settings.API_VERSION}/",
        include(
            [
                *router.urls,
                *oidc_urls,
                path("workspaces/", WorkspaceView.as_view()),
                path("targets/<str:uuid>/explore/", TargetExploreView.as_view()),
                path("targets/<str:uuid>/details/", TargetDetailsView.as_view()),
                path("search/", SearchView.as_view()),
            ]
        ),
    ),
    path(
        "redirect",
        OIDCAuthenticationCallbackView.as_view(),
        name="oidc_authentication_callback",
    ),
    path(
        "logout/",
        OIDCLogoutCallbackView.as_view(),
        name="oidc_logout_callback",
    ),
    path(
        "spoof/",
        spoof_view,
    ),
    path(
        "dev/",
        dev_view,
    ),
]
