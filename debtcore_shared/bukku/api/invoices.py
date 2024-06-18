import sys
import aiohttp 
from aiohttp import FormData
import asyncio
from urllib.parse import urljoin

from ..client import BukkuClient

class InvoicesRequest():
    def __init__(self, client: BukkuClient):
        self.client = client
        self.endpoint = f"/sales/invoices"

    
    async def get_invoice(self, transaction_id: str):
        endpoint = f"{self.endpoint}/{transaction_id}" 
        return await self.client.get_async(endpoint)
    
    async def get_invoice_list(self, date_from: str = None, is_voided: bool = False):
        endpoint = f"{self.endpoint}"
        params = {}

        if date_from:
            params['date_from'] = date_from
            
        if is_voided:
            params['status'] = 'void'

        return await self.client.get_async(endpoint, params=params)
    
    async def get_attachment(self, transaction_id: str):
        endpoint = f"{self.endpoint}/{transaction_id}/pdf"
        return await self.client.get_content_file_async(endpoint)
    