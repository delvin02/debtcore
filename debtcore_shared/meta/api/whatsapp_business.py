from ..client import WhatsappMetaClient
import aiohttp
import asyncio

class WhatsAppBusinessRequest():
    def __init__(self, client: WhatsappMetaClient, user_access_token: str):
        self.client = client
        self.endpoint = f"debug_token?input_token={user_access_token}"

    async def get_whatsapp_business(self):
        return await self.client.get_async(self.endpoint)

