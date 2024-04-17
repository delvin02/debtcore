import requests
import json

class WhatsappClient:
    def __init__(self, base_url, access_token):
        self.base_url = base_url
        self.access_token = access_token
        self.headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {self.access_token}'}

    def send_template_message(self, recipient_phone_number, template_name, variables, document_id):
        url = f"{self.base_url}/messages"
        payload = self._construct_payload(recipient_phone_number, template_name, variables, document_id)
        response = requests.post(url, headers=self.headers, data=json.dumps(payload))
        try:
            return response.json()
        except ValueError:
            return {'error': 'Failed to parse JSON response'}

    def _construct_payload(self, recipient_phone_number, template_name, variables, document_id):
        return {
            "messaging_product": "whatsapp",
            "to": recipient_phone_number,
            "type": "template",
            "template": {
                "name": template_name,
                "language": {"code": "en"},
                "components": [
                    {
                        "type": "header",
                        "parameters": [{"type": "document", "document": {"id": document_id}}]
                    },
                    {
                        "type": "body",
                        "parameters": [
                            {"type": "text", "text": variables["customer_name"]},
                            {"type": "text", "text": variables["invoice_number"]},
                            {"type": "text", "text": variables["amount_due"]},
                            {"type": "text", "text": variables["bank_transfer_details"]},
                            {"type": "text", "text": variables["your_name"]},
                            {"type": "text", "text": variables["due_date"]}
                        ]
                    }
                ]
            }
        }