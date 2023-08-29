from rest_framework import serializers

from .models import Projects, Articles


class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'

    type_display = serializers.CharField(source='get_type_display', read_only=True)


class ArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articles
        fields = '__all__'
