from .MessageObject.TextObject import TextObject
from .MessageObject.TemplateObject import TemplateObject


class Message:
    def __init__(self, message_type, to, messaging_product="whatsapp", recipient_type="individual", **kwargs):
        self.message_type = message_type
        self.to = to
        self.messaging_product = messaging_product
        self.recipient_type = recipient_type
        self.biz_opaque_callback_data = kwargs.get('biz_opaque_callback_data', None)
        self.context = kwargs.get('context', None)
        self.preview_url = kwargs.get('preview_url', False)
        self.status = kwargs.get('status', None)
        self.media = kwargs.get('media', None)
        self.interactive = kwargs.get('interactive', None)
        self.location = kwargs.get('location', None)
        self.template: TemplateObject = kwargs.get('template', None)
        self.text: TextObject = kwargs.get('text', None)
        
        