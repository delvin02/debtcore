import sys
import aiohttp 
from aiohttp import FormData
import asyncio
from urllib.parse import urljoin
from ..client import BukkuClient

class ContactRequest():
    def __init__(self, client: BukkuClient):
        self.client = client
        self.endpoint = f"/contacts"

    
    async def get_contact(self, contact_id: str):
        endpoint = f"{self.endpoint}/{contact_id}" 
        return await self.client.get_async(endpoint)
    
    async def get_contact_list(self):
        endpoint = f"{self.endpoint}?type=customer" 
        return await self.client.get_async(endpoint)
    