FROM python:3-alpine
WORKDIR /app
RUN pip3 install flask
RUN pip3 install bson
RUN pip3 install flask_pymongo
RUN pip3 install gunicorn
COPY ["main.py", "/app"]
EXPOSE 5000
# CMD ["python3", "main.py"]
CMD ["gunicorn", "-w 4", "-b", "0.0.0.0:5000", "main:app"]