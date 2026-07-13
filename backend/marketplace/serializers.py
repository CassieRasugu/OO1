from rest_framework import serializers

from .models import (
    Category,
    ProduceType,
    Location,
    Produce,
)


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
        ]


class ProduceTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProduceType
        fields = [
            "id",
            "name",
            "category",
        ]


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = [
            "id",
            "town",
            "county",
        ]


class ProduceSerializer(serializers.ModelSerializer):

    produce_type_name = serializers.CharField(
        source="produce_type.name",
        read_only=True
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    location_name = serializers.SerializerMethodField()

    farmer_name = serializers.CharField(
        source="farmer.username",
        read_only=True
    )

    class Meta:

        model = Produce

        fields = "__all__"

        read_only_fields = (
            "farmer",
            "availability_status",
            "created_at",
            "updated_at",
        )

    def get_location_name(self, obj):

        return f"{obj.location.town}, {obj.location.county}"