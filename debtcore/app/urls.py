from django.urls import path
from app.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .api.api import *
from django.conf import settings
from django.conf.urls.static import static


app_name = 'webapp'
urlpatterns = [
    path('email', EmailTemplateView.as_view(), name='email'),
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
    path('api/company/setup/bukku', BukkuSetupView.as_view(), name="get_companies"),
    path('api/company/setup/test-bukku', test_bukku, name="get_companies"),

    path('api/customer', CustomerView.as_view(), name="get_companies"),
    path('api/customer/<int:customer_id>/', CustomerView.as_view(), name="get_company"),  
    path('api/customer/<int:customer_id>/debt', CustomerDebtView.as_view(), name="get_company_debt"),  
    path('api/customer/<int:customer_id>/debt/card', customer_debt_card_data, name="get_session_data"),
    path('api/customer/settings', CustomerSettings.as_view(), name="customer_setting"),

    path('api/customer/list', GetCustomerSelectList.as_view(), name="get_customer_list"),

    path('api/country/list', GetCountrySelectList.as_view(), name="get_country_list"),
    
    path('api/debt', DebtView.as_view(), name="get_companies"),
    path('api/debt/<int:debt_id>/', DebtView.as_view(), name="get_company"),  
    path('api/debt/<int:debt_id>/document/', DebtDocumentView.as_view(), name='debt-document'),
    path('api/debt/<int:debt_id>/backlog/', DebtBacklogView.as_view(), name='debt-backlog'),
    path('api/debt/status/create/list', DebtStatusCreateChoicesAPIView.as_view(), name="create_debt_status"),
    path('api/debt/status/edit/list', DebtStatusEditChoicesAPIView.as_view(), name="edit_debt_status"),

    path('api/template', WhatsappTemplateView.as_view(), name="get_templates"),
    path('api/template/<int:template_id>', WhatsappTemplateView.as_view(), name="get_template"),
    path('api/connections/facebook', FacebookOAuthView.as_view(), name="facebook_oauth"),
    path('api/connections/bukku', BukkuAuthView.as_view(), name="bukku_oauth"),

    # Transaction
    path('api/transaction', TransactionView.as_view(), name="get_transactions"),
    path('api/transaction/<int:session_id>/scheduled_date', TransactionScheduleEditView.as_view(), name="get_transaction_schedule"),
    path('api/transaction/card', transaction_card_data, name="get_transaction_data"),

    path('api/session', SessionView.as_view(), name="get_sessions"),
    path('api/session/<int:session_id>/scheduled_date', SessionScheduleEditView.as_view(), name="get_session_schedule"),
    path('api/session/<int:session_id>/send_whatsapp', send_whatsapp, name="session_send_whatsapp"),
    path('api/session/refresh_session', refresh_session, name="session_send_whatsapp"),

    # Conversation
    path('api/conversations', ConversationView.as_view, name="conversations"),

    # Setup
    path('api/setup/template', import_template, name="import_template"),
    path('api/export/reminder-template', export_reminder_template, name="export_reminder_template"),
    path('api/refresh/company',company_refresh, name="company_refresh"),
    path('api/setup/phone',phone, name="setup_phone"),
    path('api/setup/phone/setdefault', set_phone_default, name="setup_phone_default"),
    path('api/setup/whatsapp-profile/<str:phone_number_id>', WhatsAppProfileAPIView.as_view(), name="whatsapp_profile"),
    path('api/setup/whatsapp_business/category/list', get_whatsapp_business_category_list, name="get_category_list"),
    path('api/setup/phone/send-test-message', send_test_message, name="send_test_message"),



    # Bukku 
    path('api/bukku/refresh-contact', refresh_contact, name="refresh_contact"),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)