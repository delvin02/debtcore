import sys
import aiohttp 
from urllib.parse import urljoin
from ..client import BukkuClient

class PaymentsRequest():
    def __init__(self, client: BukkuClient):
        self.client = client
        self.endpoint = f"/sales/payments"

    
    async def get_payment(self, transaction_id: str):
        endpoint = f"{self.endpoint}/{transaction_id}" 
        return await self.client.get_async(endpoint)
    
    async def get_payment_list(self, date_from: str = None):
        endpoint = f"{self.endpoint}"
        params = {}

        if date_from:
            params['date_from'] = date_from

        return await self.client.get_async(endpoint, params=params)
    
    # async def get_attachment(self, transaction_id: str):
    #     endpoint = f"{self.endpoint}/{transaction_id}/pdf"
    #     return await self.client.get_content_file_async(endpoint)
    