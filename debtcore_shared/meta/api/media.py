import sys
import aiohttp 
from aiohttp import FormData
import asyncio
from urllib.parse import urljoin

from ..client import WhatsappMetaClient

class MediaRequest():
    def __init__(self, client: WhatsappMetaClient, phone_number_id):
        self.client = client
        self.phone_number_id = phone_number_id
        self.endpoint = f"{phone_number_id}/media"

    async def upload_pdf(self, file_obj, filename, messaging_product='whatsapp'):
        data = FormData()
        data.add_field('messaging_product', messaging_product)

        data.add_field('file', file_obj, filename=filename, content_type='application/pdf')


        return await self.client.post_async(self.endpoint, data=data)
    
    async def get_media(self, media_id: str):
        endpoint = f"{media_id}?phone_number_id={self.phone_number_id}"
        return await self.client.get_async(endpoint)
    

    



    '''
        PRIVATE METHODS
    '''








