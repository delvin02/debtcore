from ..client import WhatsappClient
import requests
import json


class WhatsAppTemplateMessageSender(WhatsappClient):
    def __init__(self, base_url, access_token, phone_number_id):
        super().__init__(base_url, access_token)
        self.phone_number_id = phone_number_id

    def send_template_message(self, recipient_phone_number, template_name, variables, document_id):
        if not self.access_token:
            raise ValueError("Access token is missing")

        url = f"{self.base_url}/{self.phone_number_id}/messages"
        payload = self._construct_payload(recipient_phone_number, template_name, variables, document_id)
        response = requests.post(url, headers=self.headers, data=json.dumps(payload))
        try:
            return response.json()
        except ValueError:
            return {'error': 'Failed to parse JSON response'}