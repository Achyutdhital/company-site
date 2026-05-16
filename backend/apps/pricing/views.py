from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from .models import PricingPlan
from .serializers import PricingPlanSerializer


class PricingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'slug']
    search_fields = ['name', 'tagline']
    ordering_fields = ['is_featured', 'name']


class AdminPricingViewSet(viewsets.ModelViewSet):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'slug']
    search_fields = ['name', 'tagline']
    ordering_fields = ['is_featured', 'name']
