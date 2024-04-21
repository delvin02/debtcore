from ..client import WhatsappMetaClient
import aiohttp
import asyncio

class WhatsappBusinessPhoneRequest():
    def __init__(self, client: WhatsappMetaClient, waba_id):
        self.client = client
        self.endpoint = f"{waba_id}/phone_numbers"

    async def get_whatsapp_phone_profile(self):
        return await self.client.get_async(self.endpoint)

