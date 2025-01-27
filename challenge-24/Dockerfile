FROM python:3.12-bullseye

WORKDIR /app

COPY Pipfile Pipfile.lock /app/

RUN pip install pipenv

# Activate the virtual environment and install dependencies
RUN pipenv install --deploy --system

# Copy the rest of the application code to the working directory
COPY . /app/

EXPOSE 5000

CMD ["python", "app.py"]
