class IServiceProcess:
    def process_queue_async(self):
        raise NotImplementedError("Subclasses must implement this method")
