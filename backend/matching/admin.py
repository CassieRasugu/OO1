from django.contrib import admin

from .models import Match


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):

    list_display = (
        "produce",
        "demand",
        "match_score",
        "distance_km",
        "status",
        "matched_on",
    )

    list_filter = (
        "status",
        "matched_on",
    )

    search_fields = (
        "produce__produce_type__name",
        "produce__farmer__username",
        "demand__buyer__username",
    )

    readonly_fields = (
        "match_score",
        "quantity_score",
        "budget_score",
        "distance_score",
        "grade_score",
        "organic_score",
        "variety_score",
        "date_score",
        "distance_km",
        "matched_on",
    )

    ordering = ("-match_score",)