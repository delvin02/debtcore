class Parameter:
    def __init__(self, param_type, content):
        self.type = param_type
        self.content = content
        self.validate_content()

    def validate_content(self):
        # Validate the content based on the parameter type
        if self.type == 'text':
            self.validate_text(self.content)
        elif self.type == 'currency' and not isinstance(self.content, dict):
            raise ValueError("Currency content must be a dictionary.")
        elif self.type == 'date_time' and not isinstance(self.content, dict):
            raise ValueError("Date_time content must be a dictionary.")
        elif self.type == 'image' and not isinstance(self.content, dict):
            raise ValueError("Image content must be a dictionary.")
        elif self.type == 'document' and not isinstance(self.content, dict):
            raise ValueError("Document content must be a dictionary.")
        elif self.type == 'video' and not isinstance(self.content, dict):
            raise ValueError("Video content must be a dictionary.")
        elif self.type not in ['text', 'currency', 'date_time', 'document', 'image', 'video']:
            raise ValueError(f"Unsupported parameter type: {self.type}")

    def validate_text(self, text):
        # Validate text based on component type context passed during instantiation
        # This part needs to be adapted based on where and how it's used.
        max_length = 32768  # Default max, assuming 'body' with no other components
        if self.type == 'header' or self.type == 'footer':
            max_length = 60
        elif self.type == 'body':
            max_length = 1024  # This would vary based on other contextual info

        if not isinstance(text, str) or len(text) > max_length:
            raise ValueError(f"Text content exceeds maximum length of {max_length} characters.")

    def to_dict(self):
        # Convert the parameter to a dictionary for serialization
        if self.type == 'text':
            return {'type': 'text', 'text': self.content}
        else:
            return {'type': self.type, self.type: self.content}
