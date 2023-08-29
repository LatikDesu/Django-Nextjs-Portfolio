from PIL import Image
from django.db import models
from django.template.defaultfilters import slugify
from tinymce.models import HTMLField
from cloudinary.models import CloudinaryField

feature_project = 'FP'
project = 'PR'

TYPE = [
    (feature_project, 'Feature Project'),
    (project, 'Project'),
]


class Projects(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    type = models.CharField(max_length=2, choices=TYPE, default=project)
    title = models.CharField(max_length=128)
    summary = models.TextField(max_length=256)
    img = CloudinaryField('image', overwrite=True, format='jpg', null=False, blank=False,
                          transformation=[{'width': 1280, 'height': 720, 'crop': 'fill'}])
    link = models.CharField(max_length=128, null=True, blank=True)
    github = models.CharField(max_length=128)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"

    def __str__(self):
        return f'{self.title} ({self.type}): {self.summary[:20]}'


class Articles(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=128)
    summary = models.TextField(max_length=256)
    img = CloudinaryField('image', overwrite=True, format='jpg', null=False, blank=False,
                          transformation=[{'width': 1280, 'height': 720, 'crop': 'fill'}])
    slug = models.SlugField(blank=True, null=True)
    text = HTMLField()

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"

    def __str__(self):
        return f'{self.title}: {self.summary[:20]}'

    def save(self, *args, **kwargs):
        to_assign = slugify(self.title)

        if Articles.objects.filter(slug=to_assign).exists():
            to_assign = to_assign + str(Articles.objects.all().count())

        self.slug = to_assign
        super().save(*args, **kwargs)
