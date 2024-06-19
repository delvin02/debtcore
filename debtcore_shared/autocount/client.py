import requests
import json
import logging
import aiohttp
import asyncio

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BukkuClient():

    def __init__(self, base_url, key_id, api_key):
        if not access_token:
            raise ValueError("Access token is missing")

        
        self.base_url = base_url
        self.key_id = key_id
        self.api_key = api_key
        self.headers = {
            'Content-Type': 'application/json',
            'API-Key': api_key,
            'Key-ID': self.key_id
        }
        self.url = ''

    def set_url(self, endpoint):
        return f"{self.base_url}{endpoint}"

    def set_header(self, key, value):
        self.headers[key] = value
        
    async def get_async(self, endpoint, params=None):
        url = self.set_url(endpoint)
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=self.headers, params=params) as response:
                response.raise_for_status()  # Will raise an exception for 400/500 codes
                return await response.json()

    async def post_async(self, endpoint, data=None, json=None):
        url = self.set_url(endpoint)
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=self.headers, data=data, json=json) as response:
                response.raise_for_status()
                return await response.json()
            
    async def get_content_file_async(self, endpoint):
        url = self.set_url(endpoint)
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=self.headers) as response:
                response.raise_for_status()
                return await response.read()
