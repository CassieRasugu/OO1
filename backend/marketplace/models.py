from django.db import models


class Category(models.Model):
    """
    Main produce categories.
    Example: Fruits, Vegetables, Dairy.
    """

    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class ProduceType(models.Model):
    """
    Individual produce under a category.
    Example:
    Category -> Fruits
    ProduceType -> Apple
    """

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="produce_types"
    )

    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ("category", "name")
        ordering = ["name"]

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
        unique_together = ("county", "town")
        ordering = ["town"]

    def __str__(self):
        return f"{self.town}, {self.county}"