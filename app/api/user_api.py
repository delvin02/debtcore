from app.models import *
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
import datetime
from app.models import *
from app.serializers.serializers import UserSerializer
from asgiref.sync import sync_to_async

class UserView(APIView):
    permission_classes = [IsAdminUser, IsAuthenticated]
    authentication_classes = (SessionAuthentication,)

    async def get(self, request, *args, **kwargs):
        users = await sync_to_async(list)(User.objects.all())  # Example of making DB call async
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data) 
    