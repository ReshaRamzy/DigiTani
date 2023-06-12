<<<<<<< HEAD
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY rec.h5 .

COPY main.py .

EXPOSE 5000

ENV FLASK_APP=main.py

CMD ["flask", "run", "--host=0.0.0.0"]
=======
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY rec.h5 .

COPY main.py .

EXPOSE 5000

ENV FLASK_APP=main.py

CMD ["flask", "run", "--host=0.0.0.0"]
>>>>>>> 39e2d129600a8cfb5fbd5102c9430f914b5d66c6
