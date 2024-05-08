from django.core.exceptions import ValidationError
import os

def debt_document_path(instance, filename):
    debt_id = instance.id
    user_id = instance.created_by.id
  
    safe_filename = os.path.basename(filename)
    
    return f'upload/debt/{user_id}/{debt_id}/{safe_filename}'
  
def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # Get the file extension
    valid_extensions = ['.pdf']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')
    
def upload_profile_photo_path(instance, filename):
    return f'profile_photo/{instance.id}/{filename}'