from django import template
import os
from django.conf import settings

register = template.Library()

@register.simple_tag
def vue_css(bundle_name="main"):
    if settings.DEBUG:
        staticfiles_dir = os.path.join(settings.BASE_DIR, 'static', 'vue', 'assets')
    else:
        staticfiles_dir = os.path.join(settings.BASE_DIR, 'staticfiles', 'vue', 'assets')

    css_path = None
    for filename in os.listdir(staticfiles_dir):
        if filename.startswith(f'{bundle_name}.') and filename.endswith('.css'):
            css_path = os.path.join('vue', 'assets', filename)
            break

    if css_path:
        return f'{settings.STATIC_URL}{css_path}'
    else:
        return None