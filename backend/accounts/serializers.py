from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User

        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
            "confirm_password",
            "role",
            "phone_number",
            "county",
            "town",
            "profile_picture",
            "bio",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"password": "Passwords do not match."}
            )

        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        password = validated_data.pop("password")

        user = User(**validated_data)

        user.set_password(password)

        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "role",
            "phone_number",
            "county",
            "town",
            "profile_picture",
            "bio",
        ]