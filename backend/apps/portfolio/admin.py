from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'category', 'is_featured')
    prepopulated_fields = {'slug': ('title',)}
