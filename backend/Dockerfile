FROM python:3.8-slim
ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
WORKDIR /backend

RUN apt-get update

RUN pip install --upgrade pip
RUN apt install sqlite3
# RUN addgroup app && adduser --system --ingroup app app
# USER app

COPY requirements.txt /backend/
RUN pip install -r /backend/requirements.txt

COPY . /backend
WORKDIR /backend/app/
