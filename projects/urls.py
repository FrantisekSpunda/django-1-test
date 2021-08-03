from django.urls import path
from . import views


urlpatterns = [
    path('', views.projects, name="projects"),
    path('project_now_i_change_this/<str:pk>/', views.project, name="project"),
]