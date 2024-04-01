from django.urls import path
from app.views import *

app_name = 'webapp'
urlpatterns = [
    path('', HomeView.as_view(), name='homepage'),
    path('api/session-status', SessionStatusView.as_view(), name='session_status'),
    path('api/user/login', LoginView.as_view(), name='login'),
    path('api/user/logout', LogoutView.as_view(), name='logout')
]