from django.urls import path
from app.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .api.api import *

app_name = 'webapp'
urlpatterns = [
    path('', HomeView.as_view(), name='homepage'),
    path('api/me/', me, name="me"),
    path('api/login', LoginView.as_view(), name="token_obtain"),
    path('api/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/signup', SignUpView.as_view(), name="sign_up"),
    path('api/session-status', SessionStatusView.as_view(), name='session_status'),
    path('api/user/login', LoginView.as_view(), name='login'),
    path('api/user/logout', LogoutView.as_view(), name='logout'),

    # TABLES
    path('api/user', UserView.as_view(), name="get_users"),
    path('api/user/<uuid:user_id>/', UserView.as_view(), name="get_users"),
    path('api/role-choices/', UserRoleChoicesAPIView.as_view(), name='role-choices'),

    path('api/company', CompanyView.as_view(), name="get_companies"),
    path('api/company/<int:company_id>/', CompanyView.as_view(), name="get_company"),  
    path('api/company/list', GetCompanySelectList.as_view(), name="company_get_list")

]