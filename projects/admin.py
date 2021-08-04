from django.contrib import admin

# Register your models here.
from .models import Project, Rewiew, Tag

admin.site.register(Project)
admin.site.register(Rewiew)
admin.site.register(Tag)