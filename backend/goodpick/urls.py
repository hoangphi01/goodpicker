from django.contrib import admin
from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
    path('admin/', admin.site.urls),
]