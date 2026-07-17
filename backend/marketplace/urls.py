from django.urls import path

from .views import (
    CategoryListAPIView,
    ProduceTypeListAPIView,
    LocationListAPIView,
    ProduceCreateAPIView,
    CategoryDetailAPIView,
    FarmerProduceListAPIView,
    DemandCreateAPIView,
    BuyerDemandListAPIView,
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

    path(
    "categories/<int:pk>/",
    CategoryDetailAPIView.as_view(),
    name="category-detail",
    ),
    path(

    "my-produce/",

    FarmerProduceListAPIView.as_view(),

    name="my-produce",

    ),
    
    path(
        "demands/",
        DemandCreateAPIView.as_view(),
        name="demand-create",
    ),

    path(
        "my-demands/",
        BuyerDemandListAPIView.as_view(),
        name="my-demands",
    ),


]
