import requests
import json
from ..client import WhatsappClient

class Request():
  def __init__(self, client: WhatsappClient, api_url: str):
    self.client = client
    self.api_url = f"{client.base_url}{api_url}"
    