from django.contrib import admin

from .models import Category, ProduceType, Location


admin.site.register(Category)
admin.site.register(ProduceType)
admin.site.register(Location)