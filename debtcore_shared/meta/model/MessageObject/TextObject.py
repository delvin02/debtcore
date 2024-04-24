class TextObject:
    def __init__(self, body, preview_url=False):
        if len(body) > 4096:
            raise ValueError("Text body exceeds maximum length of 4096 characters")
        self.body = body
        self.preview_url = preview_url