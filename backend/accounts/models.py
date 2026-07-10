from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    FARMER = "Farmer"
    BUYER = "Buyer"
    ADMIN = "Admin"

    ROLE_CHOICES = [
        (FARMER, "Farmer"),
        (BUYER, "Buyer"),
        (ADMIN, "Admin"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=BUYER
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True
    )

    location = models.CharField(
        max_length=100,
        blank=True
    )

    profile_picture = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.username