import sys
import aiohttp
import asyncio
from urllib.parse import urljoin

from ..client import WhatsappMetaClient

class WhatsAppMessageTemplateRequest():
    def __init__(self, client: WhatsappMetaClient, whatsapp_business_id):
        self.client = client
        self.endpoint = f"{whatsapp_business_id}/message_templates"

    async def get_templates(self):
        return await self.client.get_async(self.endpoint)


    async def create_default_reminder_template(self, header_handle):
        json = self._construct_reminder_payload(header_handle)

        return await self.client.post_async(self.endpoint, json=json)
    



    '''
        PRIVATE METHODS
    '''

    
    def _construct_reminder_payload(self, header_handle: str) -> object:
        return {
            "name": "payment_reminder",
            "language": "en",
            "category": "UTILITY",
            "components": [
                {
                    "type": "HEADER",
                    "format": "DOCUMENT",
                    "example": {
                        "header_handle": [
                            header_handle
                        ]
                    }
                },
                {
                    "type": "BODY",
                    "text": "Hi {{1}},\n\nThis is a friendly reminder about invoice #{{2}} for {{3}} which is due on {{4}}.\n\nFor your convenience, please make payment to this bank:\nBank: {{5}}\nAccount Number: {{6}}\n\nOnce transferred, please add the payment attachment for our reference.\nLet us know if you have any questions.\n\nThanks,\n{{7}}",
                    "example": {
                        "body_text": [
                            ["John Doe", "12345", "RM 500", "2024-04-22", "CIMB Bank", "987654321", "SEMIX SDN BHD"]
                        ]
                    }
                },
                {
                    "type": "FOOTER",
                    "text": "Powered by DebtCore"
                }
            ]
        }

    def _construct_tq_payload():
        return {
            "name": "thank_you_message",
            "components": [
                {
                    "type": "HEADER",
                    "format": "TEXT",
                    "text": "Thank you for your payment!"
                },
                {
                    "type": "BODY",
                    "text": "Hi {{1}},\n\n Invoice {{2}} has been paid. Hope you have a great day.",
                    "example": {
                        "body_text": [
                            [
                                "John Doe",
                                "RM720"
                            ]
                        ]
                    }
                },
                {
                    "type": "FOOTER",
                    "text": "Powered by DebtCore"
                }
            ],
            "language": "en",
            "category": "UTILITY"
        }
    






