from app.models import WhatsappTemplate

def extract_body_from_whatsapp_template(template: WhatsappTemplate):
    """
        extracts the json object for the body from a list of json components
    """

    for component in template.components:
        if component.get('type') == "BODY":
            return component.get('text')
    return None

    

def parse_whatsapp_body_template(body, parameters):
    """
    Replace placeholders in the template with the actual parameters.

    Args:
    template (str): The body text template with placeholders.
    parameters (list): List of values to replace the placeholders.

    Returns:
    str: The parsed body text with placeholders replaced by actual values.
    """
    for i, param in enumerate(parameters):
        placeholder = "{{" + str(i + 1) + "}}" 
        body = body.replace(placeholder, param)
    return body

def format_phone_number(phone_number):
    # Remove spaces, hyphens, and plus signs
    cleaned_number = phone_number.replace(" ", "").replace("-", "").replace("+", "")
    return cleaned_number
