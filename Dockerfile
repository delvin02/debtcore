FROM python:3.12

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app/

# Expose the port
EXPOSE 80

CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:$PORT debtcore.wsgi:application"]

