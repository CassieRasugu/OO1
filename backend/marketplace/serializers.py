from rest_framework import serializers

from .models import Category, ProduceType, Location, Produce


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

    class Meta:

        model = Produce

        fields = "__all__"

        read_only_fields = (
            "farmer",
            "availability_status",
            "created_at",
            "updated_at",
        )