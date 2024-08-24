FROM python:3.12.4-slim-bullseye

RUN pip install poetry

COPY . /app

WORKDIR /app

RUN poetry install

EXPOSE 8000

CMD ["poetry", "run", "fastapi", "run", "server.py"]