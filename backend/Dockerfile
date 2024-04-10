FROM python:3.10-slim
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_APP=app.py
COPY . .
EXPOSE 5000
CMD ["flask", "run"]