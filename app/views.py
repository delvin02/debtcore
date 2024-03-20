from django.views.generic import TemplateView
from django.shortcuts import render
import json
from django.http import JsonResponse
from app.models import *

# Create your views here.

class HomeView(TemplateView):
    template_name = "webapp/home.html"

class MathGameView(TemplateView):
    template_name = "webapp/math-game.html"

def register_customer(request):
    pass