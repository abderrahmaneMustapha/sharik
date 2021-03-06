
from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from django.conf.urls.static import static
from django.conf import settings
import notifications.urls
from .tasks  import get_completed_events 
from graphene_file_upload.django import FileUploadGraphQLView as GraphQLView
from graphql_jwt.decorators import jwt_cookie

get_completed_events( schedule=1)
urlpatterns = [
    path('admin/', admin.site.urls),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('notifications/', include(notifications.urls, namespace='notifications')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
