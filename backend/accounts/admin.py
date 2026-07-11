from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    fieldsets = UserAdmin.fieldsets + (
        (
            "Profile Information",
            {
                "fields": (
                    "role",
                    "phone_number",
                    "county",
                    "town",
                    "profile_picture",
                    "bio",
                )
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "Profile Information",
            {
                "fields": (
                    "role",
                    "phone_number",
                    "county",
                    "town",
                )
            },
        ),
    )

    list_display = (
        "username",
        "email",
        "role",
        "county",
        "town",
        "is_staff",
    )

    list_filter = (
        "role",
        "county",
        "is_staff",
    )

    search_fields = (
        "username",
        "email",
        "phone_number",
    )