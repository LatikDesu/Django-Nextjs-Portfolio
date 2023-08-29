from django.shortcuts import render
from rest_framework import generics, response, status
from .models import *
from .serializers import *


class ProjectsListAPIView(generics.ListAPIView):
    serializer_class = ProjectsSerializer

    def get_queryset(self):
        return Projects.objects.all()


class ArticlesListAPIView(generics.ListAPIView):
    serializer_class = ArticlesSerializer

    def get_queryset(self):
        return Articles.objects.all()


class ArticlesDetailAPIView(generics.GenericAPIView):
    serializer_class = ArticlesSerializer

    def get(self, request, slug):
        query_set = Articles.objects.filter(slug=slug).first()

        if query_set:
            return response.Response(self.serializer_class(query_set).data)

        return response.Response('Not found', status=status.HTTP_404_NOT_FOUND)
