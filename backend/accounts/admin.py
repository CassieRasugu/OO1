from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # Controls what fields show up when EDITING an existing user
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Profile Info', {
            'fields': ('role', 'phone_number', 'location', 'profile_picture'),
        }),
    )

    # Controls what fields show up when CREATING a new user
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Profile Info', {
            'fields': ('role', 'phone_number', 'location', 'profile_picture'),
        }),
    )

    # Controls the columns displayed on the main user list page
    list_display = ['username', 'email', 'role', 'location', 'is_staff']
    
    # Adds a filter sidebar to quickly sort by role
    list_filter = ['role', 'is_staff', 'is_superuser']

admin.site.register(User, CustomUserAdmin)