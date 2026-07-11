from datetime import timedelta

from django.conf import settings
from django.db import models


class Category(models.Model):
    """
    Main produce categories.
    Example:
    Fruits, Vegetables, Dairy.
    """

    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class ProduceType(models.Model):
    """
    Individual produce belonging to a category.
    Example:
    Category -> Fruits
    Produce Type -> Apple
    """

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="produce_types"
    )

    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["name"]
        unique_together = ("category", "name")
        verbose_name = "Produce Type"
        verbose_name_plural = "Produce Types"

    def __str__(self):
        return f"{self.category.name} - {self.name}"


class Location(models.Model):
    """
    Stores known locations used by farmers and buyers.
    """

    county = models.CharField(max_length=100)

    town = models.CharField(max_length=100)

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6
    )

    class Meta:
        ordering = ["county", "town"]
        unique_together = ("county", "town")

    def __str__(self):
        return f"{self.town}, {self.county}"


class Produce(models.Model):
    """
    Produce uploaded by a farmer.
    """

    AVAILABLE = "Available"
    RESERVED = "Reserved"
    SOLD_OUT = "Sold Out"

    STATUS_CHOICES = [
        (AVAILABLE, "Available"),
        (RESERVED, "Reserved"),
        (SOLD_OUT, "Sold Out"),
    ]

    GRADE_CHOICES = [
        ("Premium", "Premium"),
        ("Grade A", "Grade A"),
        ("Grade B", "Grade B"),
        ("Standard", "Standard"),
    ]

    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="produce_listings"
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="produce_listings"
    )

    produce_type = models.ForeignKey(
        ProduceType,
        on_delete=models.CASCADE,
        related_name="produce_listings"
    )

    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name="produce_listings"
    )

    variety = models.CharField(
        max_length=100,
        blank=True
    )

    description = models.TextField()

    quantity_available = models.PositiveIntegerField()

    unit = models.CharField(
        max_length=50
    )

    price_per_unit = models.DecimalField(
    max_digits=10,
    decimal_places=2
   )
    harvest_date = models.DateField()

    shelf_life_days = models.PositiveIntegerField(
        help_text="Enter shelf life in days."
    )

    organic_certified = models.BooleanField(
        default=False
    )

    grade = models.CharField(
        max_length=20,
        choices=GRADE_CHOICES,
        default="Standard"
    )

    availability_status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=AVAILABLE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    @property
    def available_until(self):
        return self.harvest_date + timedelta(days=self.shelf_life_days)

    def __str__(self):
        return f"{self.produce_type.name} - {self.farmer.username}"
    

class Demand(models.Model):
    """
    Produce demand created by a buyer.
    """
    OPEN = "Open"
    MATCHED = "Matched"
    CLOSED = "Closed"
    CANCELLED = "Cancelled"

    STATUS_CHOICES = [
        (OPEN, "Open"),
        (MATCHED, "Matched"),
        (CLOSED, "Closed"),
        (CANCELLED, "Cancelled"),
    ]

    GRADE_CHOICES = [
        ("Premium", "Premium"),
        ("Grade A", "Grade A"),
        ("Grade B", "Grade B"),
        ("Standard", "Standard"),
    ]

    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="demands"
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="demands"
    )

    produce_type = models.ForeignKey(
        ProduceType,
        on_delete=models.CASCADE,
        related_name="demands"
    )

    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name="demands"
    )

    variety = models.CharField(
        max_length=100,
        blank=True
    )

    description = models.TextField()

    minimum_quantity = models.PositiveIntegerField()

    maximum_quantity = models.PositiveIntegerField()

    unit = models.CharField(
        max_length=50
    )

    minimum_budget = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    maximum_budget = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    maximum_distance_km = models.PositiveIntegerField(
        default=20
    )

    organic_required = models.BooleanField(
        default=False
    )

    minimum_grade = models.CharField(
        max_length=20,
        choices=GRADE_CHOICES,
        default="Standard"
    )

    needed_before = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=OPEN
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.buyer.username} needs {self.produce_type.name}"