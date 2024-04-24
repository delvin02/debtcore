from .Language import Language
from .TemplateComponent import TemplateComponent

class TemplateObject:
    def __init__(self, name, language: Language, components: TemplateComponent=None, namespace=None):
        self.name = name
        self.language: Language = language  # This should be an instance of the Language class
        self.components = components if components is not None else []
        self.namespace = namespace
        
    def add_component(self, component: TemplateComponent):
      self.components.append(component.to_dict()) 
      
    def to_dict(self):
      return {
            'name': self.name,
            'language': {
                'code': self.language.code,
            },
            'components': self.components,
            'namespace': self.namespace if self.namespace else None
        }