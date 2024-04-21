import requests
import json
import logging
import aiohttp
import asyncio

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WhatsappMetaClient():
    BASE_URL = "https://graph.facebook.com/"

    def __init__(self, access_token, version="v19.0"):

        if not access_token:
            raise ValueError("Access token is missing")
        
        self.access_token = access_token
        self.version = version
        self.headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.access_token}'
        }
        self.url = ''

    def set_url(self, endpoint):
        return f"{self.BASE_URL}{self.version}/{endpoint}"

    def set_header(self, key, value):
        self.headers[key] = value
        
    async def get_async(self, endpoint):
        url = self.set_url(endpoint)
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=self.headers) as response:
                response.raise_for_status()  # Will raise an exception for 400/500 codes
                return await response.json()

    async def post_async(self, endpoint, data=None, json=None):
        url = self.set_url(endpoint)
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=self.headers, data=data, json=json) as response:
                response.raise_for_status()
                return await response.json()
