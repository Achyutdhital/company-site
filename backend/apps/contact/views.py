from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django_ratelimit.decorators import ratelimit

from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser


class AdminContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [IsAdminUser]


@api_view(['POST'])
@permission_classes([AllowAny])
@ratelimit(key='ip', rate='5/h', block=True)
def submit_contact(request):
    serializer = ContactSubmissionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'ok'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
