from ..client import WhatsappMetaClient
import aiohttp
import asyncio

class ClientWhatsAppBusinessAccountsRequest():
    def __init__(self, client: WhatsappMetaClient, whatsapp_business_id):
        self.client = client
        self.endpoint = f"{whatsapp_business_id}/client_whatsapp_business_accounts"

    async def get_whatsapp_business_account(self):
        return await self.client.get_async(self.endpoint)

