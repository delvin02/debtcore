from .Parameter import Parameter 

class TemplateComponent:
    def __init__(self, component_type, parameters: Parameter=None, sub_type=None, index=None):
        self.type = component_type
        self.parameters = parameters if parameters is not None else []
        self.sub_type = sub_type
        self.index = index

        if self.type == 'button':
            if self.sub_type is None or self.index is None:
                raise ValueError("sub_type and index are required for button type components")
            if not 0 <= self.index <= 9:
                raise ValueError("Index must be between 0 and 9")

    def add_parameter(self, param_type, content):
      if param_type != 'text' and not isinstance(content, dict):
            raise ValueError("Content must be a dictionary for parameter types other than 'text'.")
      self.parameters.append(Parameter(param_type, content))

    def get_parameters(self):
        return [param.content for param in self.parameters]
    
    def to_dict(self):
        return {
            'type': self.type,
            'sub_type': self.sub_type,
            'index': self.index,
            'parameters': [param.to_dict() for param in self.parameters]
        }

