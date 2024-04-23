from typing import List, Optional
import re

class WhatsappProfile:
    def __init__(self, messaging_product: str, about: Optional[str] = None, 
                 address: Optional[str] = None, description: Optional[str] = None, 
                 email: Optional[str] = None, profile_picture_handle: Optional[str] = None, 
                 vertical: Optional[str] = None, websites: Optional[List[str]] = None):
        self.messaging_product = messaging_product
        self.about = self.validate_about(about)
        self.address = self.validate_address(address)
        self.description = self.validate_description(description)
        self.email = self.validate_email(email)
        self.profile_picture_handle = profile_picture_handle
        self.vertical = vertical
        self.websites = self.validate_websites(websites)

    def __init__(self, data):
        self.messaging_product = data.get('messaging_product', 'whatsapp')
        self.about = self.validate_about(data.get('about'))
        self.address = self.validate_address(data.get('address'))
        self.description = self.validate_description(data.get('description'))
        self.email = self.validate_email(data.get('email'))
        self.profile_picture_handle = data.get('profile_picture_handle')
        self.vertical = data.get('vertical')
        self.websites = self.validate_websites([data.get('website1'), data.get('website2')])
        self.profile_picture_handle = data.get('profile_picture_handle')
        
    def validate_about(self, about: Optional[str]) -> Optional[str]:
        if about is not None and (len(about) < 1 or len(about) > 139):
            raise ValueError("About text must be between 1 and 139 characters")
        return about

    def validate_address(self, address: Optional[str]) -> Optional[str]:
        if address is not None and len(address) > 256:
            raise ValueError("Address character limit is 256")
        return address

    def validate_description(self, description: Optional[str]) -> Optional[str]:
        if description is not None and len(description) > 512:
            raise ValueError("Description character limit is 512")
        return description

    def validate_email(self, email: Optional[str]) -> Optional[str]:
        if email is not None:
            if len(email) > 128:
                raise ValueError("Email character limit is 128")
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                raise ValueError("Invalid email format")
        return email
    

    def validate_websites(self, websites: Optional[List[str]]) -> Optional[List[str]]:
        if websites is not None:
            if len(websites) > 2:
                raise ValueError("A maximum of 2 websites are allowed")
            for website in websites:
                if website is None:
                    continue
                
                if len(website) > 256:
                    raise ValueError("Website URL must be under 256 characters")
                if not website.startswith("http://") and not website.startswith("https://"):
                    raise ValueError("Website URL must start with http:// or https://")
        return websites
