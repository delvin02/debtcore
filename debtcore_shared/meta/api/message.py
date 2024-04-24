from ..client import WhatsappMetaClient
from ..model.Message import Message
import json

class MessageRequest():
    def __init__(self, client: WhatsappMetaClient, phone_number_id: str):
        self.client = client
        self.endpoint = f"{phone_number_id}/messages"

    async def send_test_message(self, message: Message):
        message_data = {
            "messaging_product": message.messaging_product,
            "receipient_type": message.recipient_type,
            "to": message.to,
            "type": message.message_type
        }

        if message.message_type == 'template' and message.template:
            message_data['template'] = message.template.to_dict()

                                  
        return await self.client.post_async(self.endpoint, json=message_data)

