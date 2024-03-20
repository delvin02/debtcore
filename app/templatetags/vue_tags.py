from django import template
import os
from django.conf import settings

register = template.Library()

@register.simple_tag
def vue_css(bundle_name="main"):
    staticfiles_dir = os.path.join(settings.BASE_DIR, 'app', 'static', 'vue', 'assets')
    for filename in os.listdir(staticfiles_dir):
        if filename.startswith(bundle_name) and filename.endswith('.css'):
            return f'/static/vue/css/{filename}'
    return None