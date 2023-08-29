from django.urls import path
from .views import ProjectsListAPIView, ArticlesListAPIView, ArticlesDetailAPIView

urlpatterns = [
    path('projects/', ProjectsListAPIView.as_view(), name='projects'),
    path('articles/', ArticlesListAPIView.as_view(), name='articles'),

    path('articles/<str:slug>/', ArticlesDetailAPIView.as_view(), name='articles-detail'),
]
