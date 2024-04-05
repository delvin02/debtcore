from django.urls import path
from app.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .api.api import *

app_name = 'webapp'
urlpatterns = [
    path('', HomeView.as_view(), name='homepage'),
    path('api/me/', me, name="me"),
    path('api/login', TokenObtainPairView.as_view(), name="token_obtain"),
    path('api/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/signup', SignUpView.as_view(), name="sign_up"),
    path('api/session-status', SessionStatusView.as_view(), name='session_status'),
    path('api/user/login', LoginView.as_view(), name='login'),
    path('api/user/logout', LogoutView.as_view(), name='logout'),

    # TABLES
    path('api/get/users', UserView.as_view(), name="get_users"),
    path('api/get/companies', CompanyView.as_view(), name="get_companies"),

    # COMPANY MODAL
    path('api/get/company', CompanyEditModalView.as_view(), name="get_company"),
    path('api/company/create', CompanyCreateModalView.as_view(), name="company_create")
]