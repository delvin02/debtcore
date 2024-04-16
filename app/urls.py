from django.urls import path
from app.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .api.api import *
from django.conf import settings
from django.conf.urls.static import static


app_name = 'webapp'
urlpatterns = [
    path('', HomeView.as_view(), name='homepage'),
    path('x/api/whatsapp', WhatsappWebhook.as_view(), name="whatsapp" ),
    path('api/me/', me, name="me"),
    path('api/login', LoginView.as_view(), name="token_obtain"),
    path('api/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/signup', SignUpView.as_view(), name="sign_up"),
    path('api/user/login', LoginView.as_view(), name='login'),
    path('api/user/logout', LogoutView.as_view(), name='logout'),

    # TABLES
    path('api/user', UserView.as_view(), name="get_users"),
    path('api/user/<uuid:user_id>/', UserView.as_view(), name="get_users"),
    path('api/role-choices/', UserRoleChoicesAPIView.as_view(), name='role-choices'),
    path('api/user/change-password/', PasswordChangeView.as_view(), name="user_change_password"),
    path('api/user/change-company/', CompanyChangeView.as_view(), name="get_companies"),

    path('api/company', CompanyView.as_view(), name="get_companies"),
    path('api/company/<int:company_id>/', CompanyView.as_view(), name="get_company"),  
    path('api/company/list', GetCompanySelectList.as_view(), name="company_get_list"),
    path('api/company/setup/', CompanySetupView.as_view(), name="get_companies"),

    path('api/customer', CustomerView.as_view(), name="get_companies"),
    path('api/customer/<int:customer_id>/', CustomerView.as_view(), name="get_company"),  
    path('api/customer/list', GetCustomerSelectList.as_view(), name="get_customer_list"),

    path('api/country/list', GetCountrySelectList.as_view(), name="get_country_list"),
    
    path('api/debt', DebtView.as_view(), name="get_companies"),
    path('api/debt/<int:debt_id>/', DebtView.as_view(), name="get_company"),  
    path('api/debt/<int:debt_id>/document/', DebtDocumentView.as_view(), name='debt-document'),
    path('api/debt/<int:debt_id>/backlog/', DebtBacklogView.as_view(), name='debt-backlog'),
    path('api/status/list', DebtStatusChoicesAPIView.as_view(), name="get_customer_list"),




]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)