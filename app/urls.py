from django.urls import path

from app.views import *

app_name = 'webapp'
urlpatterns = [
    path('', HomeView.as_view(), name='homepage'),

    path('register-customer', register_customer, name="register_customer")
]