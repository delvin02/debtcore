from ..client import WhatsappMetaClient

class ResumableUploadRequest():
    def __init__(self, client: WhatsappMetaClient, app_id):
        self.client: WhatsappMetaClient = client
        self.endpoint = "uploads"
        self.app_id = app_id

    async def create_upload_session(self, file_length):
        self.client.set_header("Accept", "*/*")

        endpoint = f"{self.app_id}/" + self.endpoint + f"?file_type=application/pdf&file_length={file_length}"

        return await self.client.post_async(endpoint)
    
    async def upload(self, upload_session_id, body):
        self.client.set_header("file_offset", "0")
        self.client.set_header("Authorization", f"OAuth {self.client.access_token}")
        self.client.set_header("Content-Type", 'application/pdf')
        endpoint = f"{upload_session_id}"
        return await self.client.post_async(endpoint, data=body)
