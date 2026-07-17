from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Category, ProduceType, Location, Produce
from .serializers import (
    CategorySerializer,
    ProduceTypeSerializer,
    LocationSerializer,
    ProduceSerializer,
    DemandSerializer
)


class CategoryListAPIView(generics.ListAPIView):

    queryset = Category.objects.all()

    serializer_class = CategorySerializer


class ProduceTypeListAPIView(generics.ListAPIView):

    serializer_class = ProduceTypeSerializer

    def get_queryset(self):

        queryset = ProduceType.objects.all()

        category = self.request.GET.get("category")

        if category:

            queryset = queryset.filter(category_id=category)

        return queryset


class LocationListAPIView(generics.ListAPIView):

    queryset = Location.objects.all()

    serializer_class = LocationSerializer

class ProduceCreateAPIView(generics.CreateAPIView):

    serializer_class = ProduceSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        serializer.save(

            farmer=self.request.user

        )
class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class FarmerProduceListAPIView(generics.ListAPIView):

    serializer_class = ProduceSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Produce.objects.filter(

            farmer=self.request.user

        ).order_by("-created_at")
    
class DemandCreateAPIView(generics.CreateAPIView):

    serializer_class = DemandSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        serializer.save(

            buyer=self.request.user

        )


class BuyerDemandListAPIView(generics.ListAPIView):

    serializer_class = DemandSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Demand.objects.filter(

            buyer=self.request.user

        ).order_by("-created_at")
    

    