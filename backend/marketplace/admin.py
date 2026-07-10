from django.contrib import admin

from .models import (
    Category,
    ProduceType,
    Location,
    Produce,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(ProduceType)
class ProduceTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "category")
    list_filter = ("category",)
    search_fields = ("name",)


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = (
        "town",
        "county",
    )

    search_fields = (
        "town",
        "county",
    )


@admin.register(Produce)
class ProduceAdmin(admin.ModelAdmin):

    list_display = (
        "produce_type",
        "farmer",
        "location",
        "quantity_available",
        "unit",
        "total_price",
        "availability_status",
        "available_until",
    )

    list_filter = (
        "category",
        "availability_status",
        "organic_certified",
        "grade",
    )

    search_fields = (
        "produce_type__name",
        "farmer__username",
        "location__town",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
        "available_until",
    )