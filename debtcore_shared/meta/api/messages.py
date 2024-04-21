import sys
import aiohttp
import asyncio
from client import WhatsappMetaClient

class WhatsappMessage():
    def __init__(self, client: WhatsappMetaClient, whatsapp_business_id):
        self.client = client
        self.endpoint = f"{whatsapp_business_id}/message_templates"

    # TODO
    



    '''
        PRIVATE METHODS
    '''
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
    






