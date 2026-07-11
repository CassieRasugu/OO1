from django.urls import path

from .views import (
    CategoryListAPIView,
    ProduceTypeListAPIView,
    LocationListAPIView,
    ProduceCreateAPIView,
)

urlpatterns = [

    path(
        "categories/",
        CategoryListAPIView.as_view(),
        name="categories",
    ),

    path(
        "produce-types/",
        ProduceTypeListAPIView.as_view(),
        name="produce-types",
    ),

    path(
        "locations/",
        LocationListAPIView.as_view(),
        name="locations",
    ),

    path(

    "produce/",

    ProduceCreateAPIView.as_view(),

    name="produce-create",

    ),

]