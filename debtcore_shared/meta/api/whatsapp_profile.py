from ..client import WhatsappMetaClient
import urllib.parse
import json
from debtcore_shared.meta.model.WhatsappProfile import WhatsappProfile

class WhatsappProfileRequest():
    def __init__(self, client: WhatsappMetaClient, phone_number_id: str):
        self.client = client
        self.endpoint = f"{phone_number_id}/whatsapp_business_profile"

    async def get_profile(self, fields=None):
        if fields is None:
            fields = "about,address,description,email,profile_picture_url,websites,vertical"
        fields_query = "fields=" + urllib.parse.quote(fields)  # Ensure proper URL encoding
        
        endpoint = f"{self.endpoint}?{fields_query}"
        return await self.client.get_async(endpoint)

    async def update_profile(self, profile_data: WhatsappProfile):
        # Serialize the BusinessProfileUpdateRequest data into JSON
        json_data = profile_data.to_json()
        return await self.client.post_async(self.endpoint, data=json_data)

