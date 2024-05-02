from abc import ABC, abstractmethod

class EventProcessor(ABC):
    """
    Abstract base class for all event processors.
    """
    @abstractmethod
    def process(self, session):
        """
        Process an event from a session.
        """
        pass

class WhatsAppProcessor(EventProcessor):
    def process(self, session):
        print(f"Processing WhatsApp event for session {session.id}")

class EmailProcessor(EventProcessor):
    def process(self, session):
        print(f"Processing Email event for session {session.id}")

class ProcessorFactory:
    """
    Factory to return the appropriate processor based on the event type.
    """
    processors = {
        'whatsapp': WhatsAppProcessor,
        'email': EmailProcessor,
        # Add other event types and processors as needed
    }

    @classmethod
    def get_processor(cls, event_type):
        """
        Get the processor class for a given event type.
        """
        processor_class = cls.processors.get(event_type)
        if not processor_class:
            raise ValueError(f"No processor available for event type: {event_type}")
        return processor_class()