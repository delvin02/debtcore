from django.core.exceptions import ValidationError
import os

def debt_document_path(instance, filename):
    user_id = instance.created_by.id
    customer_id = instance.customer.id  
    invoice_id = instance.invoice
  
    safe_filename = os.path.basename(filename)
    
    return f'upload/debt/{user_id}/{customer_id}/{invoice_id}/{safe_filename}'
  
def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # Get the file extension
    valid_extensions = ['.pdf', '.jpeg', '.jpg', '.png', '.heic']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')