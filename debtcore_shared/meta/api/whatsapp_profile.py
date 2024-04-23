from ..client import WhatsappMetaClient
import aiohttp
import asyncio

class WhatsappProfileRequest():
    def __init__(self, client: WhatsappMetaClient, phone_number_id: str):
        self.client = client
        self.endpoint = f"{phone_number_id}/whatsapp_business_profile"

    async def get_profile(self, fields="fields=about,address,description,email,profile_picture_url,websites,vertical"):
        endpoint = self.endpoint + "?" + fields
        
        self.client.set_url(endpoint)
        return await self.client.get_async(self.endpoint)



