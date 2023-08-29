from django.contrib import admin
from django import forms
from django.utils.safestring import mark_safe

from .models import *


class ArticlesAdminForm(forms.ModelForm):
    class Meta:
        model = Articles
        fields = '__all__'


class ProjectsAdminForm(forms.ModelForm):
    class Meta:
        model = Projects
        fields = '__all__'


class ProjectsModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'summary', 'updated_at', 'github')
    search_fields = ('title', 'summary')
    list_per_page = 15

    form = ProjectsAdminForm
    readonly_fields = ("get_image",)
    fieldsets = (
        (None, {
            "fields": ("type", "title", "link", "github")
        }),
        (None, {
            "fields": ("summary", ("img", "get_image"))
        })
    )

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.img.url} width="120" height="100"')


class ArticlesModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'summary', 'updated_at', 'slug')
    search_fields = ('title', 'summary')
    list_per_page = 15

    save_on_top = True
    save_as = True

    form = ArticlesAdminForm
    readonly_fields = ("get_image",)
    fieldsets = (
        (None, {
            "fields": ("title", "slug", "summary")
        }),
        (None, {
            "fields": ("text", ("img", "get_image"))
        }),
    )

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.img.url} width="120" height="100"')


admin.site.register(Projects, ProjectsModelAdmin)
admin.site.register(Articles, ArticlesModelAdmin)
