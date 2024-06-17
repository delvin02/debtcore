import requests
import json
import logging
import aiohttp
import asyncio

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BukkuClient():

    def __init__(self, base_url, company_subdomain, access_token):
        if not access_token:
            raise ValueError("Access token is missing")
        if not company_subdomain:
            raise ValueError("Company subdomain is missing")
        
        self.base_url = base_url
        self.company_subdomain = company_subdomain
        self.access_token = access_token
        self.headers = {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'application/json',
            'Authorization': f'Bearer {self.access_token}',
            'Company-Subdomain': self.company_subdomain
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
