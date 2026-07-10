from django.db import models

from marketplace.models import Produce, Demand


class Match(models.Model):
    """
    Stores the result of matching one Produce listing
    with one Demand listing.
    """

    PENDING = "Pending"
    VIEWED = "Viewed"
    ACCEPTED = "Accepted"
    REJECTED = "Rejected"
    COMPLETED = "Completed"

    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (VIEWED, "Viewed"),
        (ACCEPTED, "Accepted"),
        (REJECTED, "Rejected"),
        (COMPLETED, "Completed"),
    ]

    produce = models.ForeignKey(
        Produce,
        on_delete=models.CASCADE,
        related_name="matches"
    )

    demand = models.ForeignKey(
        Demand,
        on_delete=models.CASCADE,
        related_name="matches"
    )

    # Overall Score
    match_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0
    )

    # Individual Scores
    quantity_score = models.PositiveIntegerField(default=0)

    budget_score = models.PositiveIntegerField(default=0)

    distance_score = models.PositiveIntegerField(default=0)

    grade_score = models.PositiveIntegerField(default=0)

    organic_score = models.PositiveIntegerField(default=0)

    variety_score = models.PositiveIntegerField(default=0)

    date_score = models.PositiveIntegerField(default=0)

    # Calculated Distance
    distance_km = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=PENDING
    )

    matched_on = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-match_score"]
        unique_together = ("produce", "demand")

    def __str__(self):
        return (
            f"{self.produce.produce_type.name} "
            f"→ {self.demand.buyer.username} "
            f"({self.match_score}%)"
        )