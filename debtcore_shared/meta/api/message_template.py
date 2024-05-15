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
                    "text": "Hi {{1}},\n\nThis is a friendly reminder about invoice #{{2}} for {{3}}.\n\n- *Invoice Date*: {{4}}\n- *Due Date*: {{5}}\n- *Days Overdue*: {{6}}\n\n*Please note: This is an automated message, please do not reply.*\n\nThanks,\n{{7}}",
                    "example": {
                        "body_text": [
                            ["John Doe", 
                             "001", 
                             "RM 500", 
                             "2024-04-22", 
                             "2024-04-26", 
                             "5 days", 
                             "SEMIX SDN BHD"]
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
    






